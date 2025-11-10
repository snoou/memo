import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { MemoriesPage } from './components/MemoriesPage';
import { AnalysisPage } from './components/AnalysisPage';
import { Button } from './components/ui/button';
import { BookHeart, Home, FileText, TrendingUp, Menu, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { projectId, publicAnonKey } from './utils/supabase/info';

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

type Page = 'home' | 'memories' | 'analysis';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState({
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-abc97860`;

  // دریافت خاطرات
  const fetchMemories = async () => {
    try {
      const response = await fetch(`${API_BASE}/memories`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('خطا در دریافت خاطرات');
      }

      const data = await response.json();
      setMemories(data.memories || []);
    } catch (error) {
      console.error('خطا در دریافت خاطرات:', error);
      toast.error('خطا در دریافت خاطرات');
    } finally {
      setIsLoading(false);
    }
  };

  // دریافت تحلیل ماهانه
  const fetchMonthlyAnalysis = async () => {
    try {
      const response = await fetch(`${API_BASE}/monthly-analysis`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('خطا در دریافت تحلیل ماهانه');
      }

      const data = await response.json();
      setMonthlyData(data);
    } catch (error) {
      console.error('خطا در دریافت تحلیل ماهانه:', error);
    }
  };

  useEffect(() => {
    if (currentPage !== 'home') {
      fetchMemories();
      fetchMonthlyAnalysis();
    }
  }, [currentPage]);

  // افزودن خاطره جدید
  const handleAddMemory = async (memoryData: {
    title: string;
    content: string;
    persianDate: string;
    tags: string[];
  }) => {
    try {
      const response = await fetch(`${API_BASE}/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(memoryData),
      });

      if (!response.ok) {
        throw new Error('خطا در ذخیره خاطره');
      }

      const data = await response.json();
      toast.success('خاطره با موفقیت ذخیره شد! ✨');
      await fetchMemories();
      await fetchMonthlyAnalysis();
    } catch (error) {
      console.error('خطا در افزودن خاطره:', error);
      toast.error('خطا در ذخیره خاطره');
    }
  };

  // ویرایش خاطره
  const handleEditMemory = async (
    id: string,
    memoryData: {
      title: string;
      content: string;
      persianDate: string;
      tags: string[];
    }
  ) => {
    try {
      const response = await fetch(`${API_BASE}/memories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(memoryData),
      });

      if (!response.ok) {
        throw new Error('خطا در به‌روزرسانی خاطره');
      }

      toast.success('خاطره با موفقیت به‌روزرسانی شد! ✨');
      await fetchMemories();
      await fetchMonthlyAnalysis();
    } catch (error) {
      console.error('خطا در ویرایش خاطره:', error);
      toast.error('خطا در به‌روزرسانی خاطره');
    }
  };

  // حذف خاطره
  const handleDeleteMemory = async (id: string) => {
    if (!confirm('آیا از حذف این خاطره اطمینان دارید؟')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/memories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('خطا در حذف خاطره');
      }

      toast.success('خاطره با موفقیت حذف شد');
      await fetchMemories();
      await fetchMonthlyAnalysis();
    } catch (error) {
      console.error('خطا در حذف خاطره:', error);
      toast.error('خطا در حذف خاطره');
    }
  };

  const navItems = [
    { id: 'home' as Page, label: 'خانه', icon: <Home className="w-5 h-5" /> },
    { id: 'memories' as Page, label: 'خاطرات من', icon: <FileText className="w-5 h-5" /> },
    { id: 'analysis' as Page, label: 'تحلیل احساسات', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50" dir="rtl">
      <Toaster position="top-center" />

      {/* Navigation Header (only show when not on home page) */}
      {currentPage !== 'home' && (
        <header className="bg-white border-b-2 border-amber-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <BookHeart className="w-8 h-8 text-amber-700" />
                <span className="text-2xl text-amber-800">میمو</span>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => {
                      setCurrentPage(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`gap-2 ${
                      currentPage === item.id
                        ? 'bg-amber-700 hover:bg-amber-800'
                        : 'hover:bg-amber-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-amber-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-amber-800" />
                ) : (
                  <Menu className="w-6 h-6 text-amber-800" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <nav className="md:hidden py-4 border-t border-amber-200">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? 'default' : 'ghost'}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`gap-2 justify-start ${
                        currentPage === item.id
                          ? 'bg-amber-700 hover:bg-amber-800'
                          : 'hover:bg-amber-50'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <HomePage onGetStarted={() => setCurrentPage('memories')} />
        )}

        {currentPage === 'memories' && (
          <div className="container mx-auto px-4 py-8">
            <MemoriesPage
              memories={memories}
              onAddMemory={handleAddMemory}
              onEditMemory={handleEditMemory}
              onDeleteMemory={handleDeleteMemory}
              isLoading={isLoading}
            />
          </div>
        )}

        {currentPage === 'analysis' && (
          <div className="container mx-auto px-4 py-8">
            <AnalysisPage monthlyData={monthlyData} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
