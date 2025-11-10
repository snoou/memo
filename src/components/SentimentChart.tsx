import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Heart } from 'lucide-react';

interface SentimentChartProps {
  sentiment: {
    شادی: number;
    غم: number;
    خشم: number;
    عشق: number;
    ترس: number;
    آرامش: number;
  };
}

export function SentimentChart({ sentiment }: SentimentChartProps) {
  const data = [
    { emotion: 'شادی', value: Math.round(sentiment.شادی) },
    { emotion: 'غم', value: Math.round(sentiment.غم) },
    { emotion: 'خشم', value: Math.round(sentiment.خشم) },
    { emotion: 'عشق', value: Math.round(sentiment.عشق) },
    { emotion: 'ترس', value: Math.round(sentiment.ترس) },
    { emotion: 'آرامش', value: Math.round(sentiment.آرامش) },
  ];

  return (
    <Card className="border-2 border-pink-200 bg-pink-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right" dir="rtl">
          <Heart className="w-5 h-5 text-pink-600" />
          تحلیل احساسات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid stroke="#f472b6" />
            <PolarAngleAxis dataKey="emotion" tick={{ fill: '#831843', fontSize: 14 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="احساسات"
              dataKey="value"
              stroke="#ec4899"
              fill="#ec4899"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4" dir="rtl">
          {data.map((item) => (
            <div key={item.emotion} className="flex items-center justify-between p-2 bg-white rounded-lg">
              <span className="text-sm">{item.emotion}</span>
              <span className="text-sm text-pink-700">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
