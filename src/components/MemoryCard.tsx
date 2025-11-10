import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Trash2, Calendar } from 'lucide-react';

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

interface MemoryCardProps {
  memory: Memory;
  onEdit: (memory: Memory) => void;
  onDelete: (id: string) => void;
  onViewSentiment: (memory: Memory) => void;
}

export function MemoryCard({ memory, onEdit, onDelete, onViewSentiment }: MemoryCardProps) {
  // پیدا کردن غالب‌ترین احساس
  const dominantEmotion = Object.entries(memory.sentiment || {}).reduce(
    (max, [emotion, value]) => (value > max.value ? { emotion, value } : max),
    { emotion: 'آرامش', value: 0 }
  );

  const emotionColors: Record<string, string> = {
    شادی: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    غم: 'bg-blue-100 text-blue-800 border-blue-300',
    خشم: 'bg-red-100 text-red-800 border-red-300',
    عشق: 'bg-pink-100 text-pink-800 border-pink-300',
    ترس: 'bg-purple-100 text-purple-800 border-purple-300',
    آرامش: 'bg-green-100 text-green-800 border-green-300',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-amber-100">
      <CardHeader>
        <div className="flex items-start justify-between gap-4" dir="rtl">
          <div className="flex-1">
            <CardTitle className="text-right mb-2">{memory.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{memory.persianDate}</span>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${emotionColors[dominantEmotion.emotion]} border-2`}
          >
            {dominantEmotion.emotion}
          </Badge>
        </div>
      </CardHeader>
      <CardContent dir="rtl">
        <p className="text-right mb-4 line-clamp-3">{memory.content}</p>
        
        {memory.tags && memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-end">
            {memory.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewSentiment(memory)}
            className="gap-2"
          >
            نمودار احساسات
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(memory)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            ویرایش
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(memory.id)}
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            حذف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
