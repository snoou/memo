import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  BookHeart,
  Sparkles,
  Heart,
  TrendingUp,
  Calendar,
  Search,
  Brain,
  Shield,
  Zap,
  ArrowLeft,
} from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const features = [
    {
      icon: <PenLine className="w-8 h-8" />,
      title: 'ثبت خاطرات',
      description: 'خاطرات روزانه خود را با تاریخ شمسی، عنوان و برچسب ثبت کنید',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'تحلیل هوشمند',
      description: 'تحلیل احساسات فارسی با هوش مصنوعی پیشرفته',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'نمودارهای زیبا',
      description: 'مشاهده روند احساسات در نمودارهای گرافیکی',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'جستجو و فیلتر',
      description: 'پیدا کردن آسان خاطرات بر اساس احساس یا تاریخ',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'امنیت کامل',
      description: 'ذخیره‌سازی ایمن خاطرات شخصی شما',
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'سریع و آسان',
      description: 'رابط کاربری ساده و کاربرپسند',
      color: 'bg-orange-100 text-orange-700',
    },
  ];

  const emotions = [
    { name: 'شادی', color: 'bg-yellow-400', icon: '😊' },
    { name: 'عشق', color: 'bg-pink-400', icon: '❤️' },
    { name: 'آرامش', color: 'bg-green-400', icon: '☮️' },
    { name: 'غم', color: 'bg-blue-400', icon: '😢' },
    { name: 'خشم', color: 'bg-red-400', icon: '😠' },
    { name: 'ترس', color: 'bg-purple-400', icon: '😨' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute top-64 -left-32 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <BookHeart className="w-20 h-20 text-amber-700 animate-pulse" />
          </div>
          
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-amber-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            میمو
          </h1>
          
          <p className="text-2xl text-amber-800 mb-4">دفترچه خاطرات دیجیتال هوشمند</p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-pink-600" />
            <p className="text-lg text-muted-foreground italic">
              با هوش مصنوعی، احساساتت رو درک می‌کنیم
            </p>
            <Sparkles className="w-5 h-5 text-pink-600" />
          </div>

          {/* Poetry Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="border-4 border-amber-200 bg-white/80 backdrop-blur">
              <CardContent className="p-8">
                <p className="text-xl text-amber-900 leading-relaxed">
                  دل به دریای خیالات سپردم باز من
                  <br />
                  خاطره‌ها را به یادگار آوردم باز من
                  <br />
                  در صفحات دفتر روزگار خویش
                  <br />
                  هر احساسی که داشتم، نگاشتم باز من
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-xl px-12 py-6 h-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 ml-2" />
            شروع کنید
          </Button>

          {/* Emotion Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {emotions.map((emotion) => (
              <div
                key={emotion.name}
                className={`${emotion.color} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-110 transition-transform cursor-pointer`}
              >
                <span className="text-2xl">{emotion.icon}</span>
                <span>{emotion.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-amber-800">ویژگی‌های میمو</h2>
            <p className="text-lg text-muted-foreground">
              همه چیزی که برای ثبت و تحلیل خاطرات نیاز دارید
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 border-amber-100 hover:border-amber-300 transition-all hover:shadow-xl transform hover:-translate-y-2 duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-amber-800">چطور کار می‌کنه؟</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8" dir="rtl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl shadow-lg">
                  ۱
                </div>
                <h3 className="text-xl mb-2">خاطره بنویسید</h3>
                <p className="text-muted-foreground">
                  خاطرات روزانه خود را با جزئیات بنویسید
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl shadow-lg">
                  ۲
                </div>
                <h3 className="text-xl mb-2">تحلیل احساسات</h3>
                <p className="text-muted-foreground">
                  هوش مصنوعی احساساتتون رو تشخیص می‌ده
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl shadow-lg">
                  ۳
                </div>
                <h3 className="text-xl mb-2">مشاهده نمودارها</h3>
                <p className="text-muted-foreground">
                  روند احساساتتون رو در نمودار ببینید
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl mb-2">۶</div>
              <div className="text-xl">نوع احساس</div>
            </div>
            <div>
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl mb-2">AI</div>
              <div className="text-xl">تحلیل هوشمند</div>
            </div>
            <div>
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl mb-2">۱۰۰٪</div>
              <div className="text-xl">رایگان</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-6 text-amber-800">آماده‌اید شروع کنید؟</h2>
          <p className="text-xl text-muted-foreground mb-8">
            همین الان اولین خاطره خود را ثبت کنید
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-xl px-12 py-6 h-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <BookHeart className="w-6 h-6 ml-2" />
            شروع رایگان
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookHeart className="w-6 h-6" />
            <span className="text-xl">میمو</span>
          </div>
          <p className="text-sm">
            دفترچه خاطرات دیجیتال با هوش مصنوعی
          </p>
          <p className="text-xs mt-2 text-amber-300">
            ساخته شده با ❤️ برای فارسی‌زبانان
          </p>
        </div>
      </footer>
    </div>
  );
}

// Import for PenLine icon
import { PenLine } from 'lucide-react';
