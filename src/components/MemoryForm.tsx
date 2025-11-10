import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PersianDatePicker } from './PersianDatePicker';
import { PenLine, Save, X } from 'lucide-react';

interface MemoryFormProps {
  onSubmit: (memory: {
    title: string;
    content: string;
    persianDate: string;
    tags: string[];
  }) => Promise<void>;
  initialData?: {
    id: string;
    title: string;
    content: string;
    persianDate: string;
    tags: string[];
  };
  onCancel?: () => void;
}

export function MemoryForm({ onSubmit, initialData, onCancel }: MemoryFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [persianDate, setPersianDate] = useState(initialData?.persianDate || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(', ') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await onSubmit({ title, content, persianDate, tags });
      
      if (!initialData) {
        // Reset form for new memory
        setTitle('');
        setContent('');
        setTagsInput('');
        const now = new Date();
        const year = now.getFullYear() - 621;
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        setPersianDate(`${year}/${month}/${day}`);
      }
    } catch (error) {
      console.error('خطا در ذخیره خاطره:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-amber-200 bg-amber-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right" dir="rtl">
          <PenLine className="w-5 h-5 text-amber-700" />
          {initialData ? 'ویرایش خاطره' : 'خاطره جدید'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <div className="space-y-2">
            <Label className="text-right block">عنوان خاطره</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان خاطره خود را وارد کنید..."
              required
              className="text-right"
              dir="rtl"
            />
          </div>

          <PersianDatePicker
            value={persianDate}
            onChange={setPersianDate}
            label="تاریخ"
          />

          <div className="space-y-2">
            <Label className="text-right block">محتوای خاطره</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="خاطره خود را بنویسید..."
              required
              rows={6}
              className="text-right resize-none"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right block">برچسب‌ها (با کاما جدا کنید)</Label>
            <Input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="مثال: سفر، خانواده، دوستان"
              className="text-right"
              dir="rtl"
            />
          </div>

          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                لغو
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting} className="gap-2 bg-amber-700 hover:bg-amber-800">
              <Save className="w-4 h-4" />
              {isSubmitting ? 'در حال ذخیره...' : initialData ? 'به‌روزرسانی' : 'ذخیره خاطره'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
