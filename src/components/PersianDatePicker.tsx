import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PersianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export function PersianDatePicker({ value, onChange, label }: PersianDatePickerProps) {
  // تبدیل ساده تاریخ میلادی به شمسی (برای نمونه)
  const getCurrentPersianDate = () => {
    const now = new Date();
    const year = now.getFullYear() - 621;
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  React.useEffect(() => {
    if (!value) {
      onChange(getCurrentPersianDate());
    }
  }, []);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="1403/08/20"
        className="text-right"
        dir="rtl"
      />
      <p className="text-muted-foreground text-sm text-right">فرمت: سال/ماه/روز (مثال: 1403/08/20)</p>
    </div>
  );
}
