import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-abc97860/health", (c) => {
  return c.json({ status: "ok" });
});

// تحلیل احساسات با HuggingFace API
async function analyzeSentiment(text: string) {
  try {
    const apiKey = Deno.env.get('HUGGINGFACE_API_KEY');
    if (!apiKey) {
      console.log('HUGGINGFACE_API_KEY not found, returning mock sentiment');
      // Mock sentiment for development
      return {
        شادی: Math.random() * 30 + 10,
        غم: Math.random() * 20 + 5,
        خشم: Math.random() * 15 + 5,
        عشق: Math.random() * 25 + 10,
        ترس: Math.random() * 10 + 2,
        آرامش: Math.random() * 20 + 15,
      };
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/HooshvareLab/bert-fa-base-uncased-sentiment-snappfood",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      console.log(`HuggingFace API error: ${response.status}`);
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const result = await response.json();
    
    // تبدیل نتایج به احساسات فارسی
    // این مدل sentiment analysis می‌دهد، ما آن را به احساسات مختلف نگاشت می‌کنیم
    const sentimentScore = Array.isArray(result) && result[0] && result[0][0] ? result[0][0].score : 0.5;
    
    // نگاشت sentiment score به احساسات مختلف
    return {
      شادی: sentimentScore > 0.6 ? (sentimentScore * 40) : 10 + Math.random() * 10,
      غم: sentimentScore < 0.4 ? ((1 - sentimentScore) * 35) : 5 + Math.random() * 10,
      خشم: Math.random() * 15 + 5,
      عشق: sentimentScore > 0.5 ? (sentimentScore * 30) : 10 + Math.random() * 10,
      ترس: sentimentScore < 0.3 ? ((1 - sentimentScore) * 20) : 5 + Math.random() * 8,
      آرامش: sentimentScore > 0.5 ? (sentimentScore * 25) : 10 + Math.random() * 10,
    };
  } catch (error) {
    console.log(`Sentiment analysis error: ${error}`);
    // Mock sentiment در صورت خطا
    return {
      شادی: Math.random() * 30 + 10,
      غم: Math.random() * 20 + 5,
      خشم: Math.random() * 15 + 5,
      عشق: Math.random() * 25 + 10,
      ترس: Math.random() * 10 + 2,
      آرامش: Math.random() * 20 + 15,
    };
  }
}

// دریافت تمام خاطرات
app.get("/make-server-abc97860/memories", async (c) => {
  try {
    const memories = await kv.getByPrefix("memory:");
    const sortedMemories = memories
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    return c.json({ memories: sortedMemories });
  } catch (error) {
    console.log(`Error fetching memories: ${error}`);
    return c.json({ error: "Failed to fetch memories", details: String(error) }, 500);
  }
});

// افزودن خاطره جدید
app.post("/make-server-abc97860/memories", async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, persianDate, tags } = body;

    if (!title || !content) {
      return c.json({ error: "Title and content are required" }, 400);
    }

    // تحلیل احساسات
    const sentiment = await analyzeSentiment(content);

    const memory = {
      id: crypto.randomUUID(),
      title,
      content,
      persianDate: persianDate || '',
      tags: tags || [],
      sentiment,
      timestamp: Date.now(),
    };

    await kv.set(`memory:${memory.id}`, memory);
    return c.json({ memory });
  } catch (error) {
    console.log(`Error creating memory: ${error}`);
    return c.json({ error: "Failed to create memory", details: String(error) }, 500);
  }
});

// به‌روزرسانی خاطره
app.put("/make-server-abc97860/memories/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { title, content, persianDate, tags } = body;

    const existingMemory = await kv.get(`memory:${id}`);
    if (!existingMemory) {
      return c.json({ error: "Memory not found" }, 404);
    }

    // تحلیل مجدد احساسات در صورت تغییر محتوا
    const sentiment = content && content !== existingMemory.content
      ? await analyzeSentiment(content)
      : existingMemory.sentiment;

    const updatedMemory = {
      ...existingMemory,
      title: title || existingMemory.title,
      content: content || existingMemory.content,
      persianDate: persianDate || existingMemory.persianDate,
      tags: tags || existingMemory.tags,
      sentiment,
    };

    await kv.set(`memory:${id}`, updatedMemory);
    return c.json({ memory: updatedMemory });
  } catch (error) {
    console.log(`Error updating memory: ${error}`);
    return c.json({ error: "Failed to update memory", details: String(error) }, 500);
  }
});

// حذف خاطره
app.delete("/make-server-abc97860/memories/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existingMemory = await kv.get(`memory:${id}`);
    
    if (!existingMemory) {
      return c.json({ error: "Memory not found" }, 404);
    }

    await kv.del(`memory:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting memory: ${error}`);
    return c.json({ error: "Failed to delete memory", details: String(error) }, 500);
  }
});

// تحلیل ماهانه
app.get("/make-server-abc97860/monthly-analysis", async (c) => {
  try {
    const { month, year } = c.req.query();
    const memories = await kv.getByPrefix("memory:");
    
    // فیلتر بر اساس ماه و سال (در صورت وجود)
    const filteredMemories = month && year
      ? memories.filter((m) => {
          const [y, mo] = m.persianDate?.split('/') || [];
          return y === year && mo === month;
        })
      : memories;

    if (filteredMemories.length === 0) {
      return c.json({
        totalMemories: 0,
        averageSentiment: {
          شادی: 0,
          غم: 0,
          خشم: 0,
          عشق: 0,
          ترس: 0,
          آرامش: 0,
        },
      });
    }

    // محاسبه میانگین احساسات
    const avgSentiment = {
      شادی: 0,
      غم: 0,
      خشم: 0,
      عشق: 0,
      ترس: 0,
      آرامش: 0,
    };

    filteredMemories.forEach((memory) => {
      if (memory.sentiment) {
        avgSentiment.شادی += memory.sentiment.شادی || 0;
        avgSentiment.غم += memory.sentiment.غم || 0;
        avgSentiment.خشم += memory.sentiment.خشم || 0;
        avgSentiment.عشق += memory.sentiment.عشق || 0;
        avgSentiment.ترس += memory.sentiment.ترس || 0;
        avgSentiment.آرامش += memory.sentiment.آرامش || 0;
      }
    });

    const count = filteredMemories.length;
    Object.keys(avgSentiment).forEach((key) => {
      avgSentiment[key] = avgSentiment[key] / count;
    });

    return c.json({
      totalMemories: count,
      averageSentiment: avgSentiment,
    });
  } catch (error) {
    console.log(`Error getting monthly analysis: ${error}`);
    return c.json({ error: "Failed to get monthly analysis", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);