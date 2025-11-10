import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';

interface MonthlyAnalysisProps {
  data: {
    totalMemories: number;
    averageSentiment: {
      شادی: number;
      غم: number;
      خشم: number;
      عشق: number;
      ترس: number;
      آرامش: number;
    };
  };
}

export function MonthlyAnalysis({ data }: MonthlyAnalysisProps) {
  const chartData = [
    { name: 'شادی', value: Math.round(data.averageSentiment.شادی) },
    { name: 'غم', value: Math.round(data.averageSentiment.غم) },
    { name: 'خشم', value: Math.round(data.averageSentiment.خشم) },
    { name: 'عشق', value: Math.round(data.averageSentiment.عشق) },
    { name: 'ترس', value: Math.round(data.averageSentiment.ترس) },
    { name: 'آرامش', value: Math.round(data.averageSentiment.آرامش) },
  ];

  const barColors: Record<string, string> = {
    شادی: '#facc15',
    غم: '#60a5fa',
    خشم: '#f87171',
    عشق: '#f472b6',
    ترس: '#c084fc',
    آرامش: '#4ade80',
  };

  return (
    <Card className="border-2 border-purple-200 bg-purple-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right" dir="rtl">
          <TrendingUp className="w-5 h-5 text-purple-700" />
          تحلیل کلی احساسات ({data.totalMemories} خاطره)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 14 }} />
            <Tooltip
              formatter={(value: number) => `${value}%`}
              labelStyle={{ textAlign: 'right' }}
            />
            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]}>
              {chartData.map((entry, index) => (
                <Bar key={index} fill={barColors[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 p-4 bg-white rounded-lg" dir="rtl">
          <p className="text-sm text-muted-foreground text-right">
            این نمودار میانگین احساسات شما در تمام خاطرات ثبت‌شده را نشان می‌دهد.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
