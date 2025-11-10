import React, { useState, useEffect } from 'react';
import { MemoryForm } from './MemoryForm';
import { MemoryCard } from './MemoryCard';
import { SentimentChart } from './SentimentChart';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  content: string;
  persianDate: string;
  tags: string[];
  sentiment: {
    شادی: number;
    غم: number;
    خشم: number;
    عشق: number;
    ترس: number;
    آرامش: number;
  };
  timestamp: number;
}

interface MemoriesPageProps {
  memories: Memory[];
  onAddMemory: (data: any) => Promise<void>;
  onEditMemory: (id: string, data: any) => Promise<void>;
  onDeleteMemory: (id: string) => Promise<void>;
  isLoading: boolean;
}

export function MemoriesPage({
  memories,
  onAddMemory,
  onEditMemory,
  onDeleteMemory,
  isLoading,
}: MemoriesPageProps) {
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [emotionFilter, setEmotionFilter] = useState<string>('all');
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [viewingSentiment, setViewingSentiment] = useState<Memory | null>(null);

  // فیلتر کردن خاطرات
  useEffect(() => {
    let filtered = [...memories];

    // فیلتر بر اساس جستجو
    if (searchQuery) {
      filtered = filtered.filter(
        (memory) =>
          memory.title.includes(searchQuery) ||
          memory.content.includes(searchQuery) ||
          memory.tags.some((tag) => tag.includes(searchQuery))
      );
    }

    // فیلتر بر اساس احساس
    if (emotionFilter !== 'all') {
      filtered = filtered.filter((memory) => {
        const dominantEmotion = Object.entries(memory.sentiment || {}).reduce(
          (max, [emotion, value]) => (value > max.value ? { emotion, value } : max),
          { emotion: 'آرامش', value: 0 }
        );
        return dominantEmotion.emotion === emotionFilter;
      });
    }

    setFilteredMemories(filtered);
  }, [searchQuery, emotionFilter, memories]);

  const handleEdit = (memory: Memory) => {
    setEditingMemory(memory);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingMemory(null);
  };

  const handleSubmitEdit = async (data: any) => {
    if (!editingMemory) return;
    await onEditMemory(editingMemory.id, data);
    setEditingMemory(null);
  };

  return (
    <div className="space-y-6">
      {/* فرم افزودن/ویرایش خاطره */}
      {editingMemory ? (
        <MemoryForm
          onSubmit={handleSubmitEdit}
          initialData={editingMemory}
          onCancel={handleCancelEdit}
        />
      ) : (
        <MemoryForm onSubmit={onAddMemory} />
      )}

      {/* جستجو و فیلتر */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="جستجو در خاطرات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-right"
            dir="rtl"
          />
        </div>
        <div className="sm:w-48">
          <Select value={emotionFilter} onValueChange={setEmotionFilter}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="فیلتر احساس" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه احساسات</SelectItem>
              <SelectItem value="شادی">شادی</SelectItem>
              <SelectItem value="غم">غم</SelectItem>
              <SelectItem value="خشم">خشم</SelectItem>
              <SelectItem value="عشق">عشق</SelectItem>
              <SelectItem value="ترس">ترس</SelectItem>
              <SelectItem value="آرامش">آرامش</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* لیست خاطرات */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      ) : filteredMemories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-amber-200">
          <p className="text-muted-foreground">
            {searchQuery || emotionFilter !== 'all'
              ? 'خاطره‌ای یافت نشد'
              : 'هنوز خاطره‌ای ثبت نکرده‌اید. اولین خاطره خود را بنویسید! ✨'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onEdit={handleEdit}
              onDelete={onDeleteMemory}
              onViewSentiment={setViewingSentiment}
            />
          ))}
        </div>
      )}

      {/* دیالوگ نمایش نمودار احساسات */}
      <Dialog open={!!viewingSentiment} onOpenChange={() => setViewingSentiment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-right" dir="rtl">
              {viewingSentiment?.title}
            </DialogTitle>
          </DialogHeader>
          {viewingSentiment && (
            <SentimentChart sentiment={viewingSentiment.sentiment} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
