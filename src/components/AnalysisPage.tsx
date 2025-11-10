import React from 'react';
import { MonthlyAnalysis } from './MonthlyAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Calendar, Heart, Smile } from 'lucide-react';

interface AnalysisPageProps {
  monthlyData: {
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

export function AnalysisPage({ monthlyData }: AnalysisPageProps) {
  // پیدا کردن غالب‌ترین احساس
  const dominantEmotion = Object.entries(monthlyData.averageSentiment).reduce(
    (max, [emotion, value]) => (value > max.value ? { emotion, value } : max),
    { emotion: 'آرامش', value: 0 }
  );

  const emotionColors: Record<string, { bg: string; text: string; border: string }> = {
    شادی: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300' },
    غم: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
    خشم: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300' },
    عشق: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-300' },
    ترس: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
    آرامش: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' },
  };

  const emotionMessages: Record<string, string> = {
    شادی: 'به نظر می‌رسد روزهای شادی زیادی داشته‌اید! ✨',
    غم: 'شاید کمی غمگین بوده‌اید. یادتان باشد که روزهای بهتری در راه است 🌸',
    خشم: 'احساسات قوی داشته‌اید. تلاش کنید آرامش را پیدا کنید 🍃',
    عشق: 'قلب شما پر از عشق است! ❤️',
    ترس: 'نگران نباشید، همه چیز خوب خواهد شد 🌟',
    آرامش: 'در آرامش کامل هستید. عالی است! ☮️',
  };

  const emotionPoems: Record<string, string> = {
    شادی: 'خوش آن دم که به کام دل گذرد / که عمر عزیز به شادی سپری شود',
    غم: 'این نیز بگذرد / هیچ غمی دائمی نیست',
    خشم: 'به خشم اندر مکن هیچ کار / که سوزد دل و جان را چو نار',
    عشق: 'عشق است و دل برد از من و می‌برد / دیوانه کند هر که به او بگرود',
    ترس: 'از سایه خویش مترس ای دل / روشنی خورشید با توست',
    آرامش: 'در کنار آرامش دل / زندگی زیباتر است',
  };

  const currentColor = emotionColors[dominantEmotion.emotion];

  return (
    <div className="space-y-6">
      {/* آمار کلی */}
      {monthlyData.totalMemories > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-2 border-amber-200 bg-amber-50/50">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-amber-700" />
              <div className="text-3xl mb-1">{monthlyData.totalMemories}</div>
              <div className="text-sm text-muted-foreground">خاطره ثبت شده</div>
            </CardContent>
          </Card>

          <Card className={`border-2 ${currentColor.border} ${currentColor.bg}`}>
            <CardContent className="p-6 text-center">
              <Heart className={`w-8 h-8 mx-auto mb-2 ${currentColor.text}`} />
              <div className="text-3xl mb-1">{dominantEmotion.emotion}</div>
              <div className="text-sm text-muted-foreground">احساس غالب</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-pink-50/50">
            <CardContent className="p-6 text-center">
              <Smile className="w-8 h-8 mx-auto mb-2 text-pink-700" />
              <div className="text-3xl mb-1">{Math.round(dominantEmotion.value)}%</div>
              <div className="text-sm text-muted-foreground">شدت احساس</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* پیام احساسی */}
      {monthlyData.totalMemories > 0 && (
        <Card className={`border-2 ${currentColor.border} ${currentColor.bg}`}>
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2" dir="rtl">
              <TrendingUp className={`w-5 h-5 ${currentColor.text}`} />
              تحلیل احساسی شما
            </CardTitle>
          </CardHeader>
          <CardContent dir="rtl">
            <p className="text-right mb-4">{emotionMessages[dominantEmotion.emotion]}</p>
            <div className="bg-white/60 rounded-lg p-4 border-2 border-white">
              <p className="text-center italic">{emotionPoems[dominantEmotion.emotion]}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* نمودار تحلیل ماهانه */}
      <MonthlyAnalysis data={monthlyData} />

      {/* پیام در صورت نبود خاطره */}
      {monthlyData.totalMemories === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-purple-200">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <h3 className="text-xl mb-2 text-purple-800">هنوز تحلیلی وجود ندارد</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            برای مشاهده تحلیل احساسات، ابتدا خاطرات خود را در بخش "خاطرات من" ثبت کنید.
            پس از ثبت چند خاطره، نمودارها و تحلیل‌های جذاب را در اینجا مشاهده خواهید کرد.
          </p>
        </div>
      )}

      {/* راهنمای احساسات */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-right" dir="rtl">
            راهنمای احساسات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3" dir="rtl">
            {Object.entries({
              شادی: { icon: '😊', desc: 'لحظات شاد و خوشحال' },
              عشق: { icon: '❤️', desc: 'احساسات عاشقانه' },
              آرامش: { icon: '☮️', desc: 'آرامش و صلح درونی' },
              غم: { icon: '😢', desc: 'اندوه و ناراحتی' },
              خشم: { icon: '😠', desc: 'عصبانیت و ناامیدی' },
              ترس: { icon: '😨', desc: 'نگرانی و اضطراب' },
            }).map(([emotion, data]) => (
              <div
                key={emotion}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-200"
              >
                <span className="text-3xl">{data.icon}</span>
                <div>
                  <div>{emotion}</div>
                  <div className="text-xs text-muted-foreground">{data.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
