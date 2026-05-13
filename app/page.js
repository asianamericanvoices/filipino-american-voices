// app/page.js - Filipino American Voices Homepage
'use client';
// Trigger rebuild for separate hero functionality

import Script from 'next/script';
import React, { useState, useEffect, useRef } from 'react';
import { Clock, ExternalLink, ChevronRight, Globe, TrendingUp, Users, Building2, Flag, MapPin, Heart, GraduationCap, Plane, Palette, Newspaper, Trophy, Stethoscope, FileText, ShieldCheck, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import ArticleRequestForm from './components/ArticleRequestForm';

export default function FilipinoAmericanVoices() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(''); // '', 'loading', 'success', 'error'
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);

  // Category mapping for FAV - China-US Relations articles appear as International News
  const mapCategoryForFAV = (originalCategory) => {
    const mapping = {
      'China-US Relations': 'International News',  // Hide China-US, show as International
      // All other categories stay the same
    };
    return mapping[originalCategory] || originalCategory;
  };

  // Categories in Tagalog
  const categories = [
    { id: 'all', name: 'Lahat ng Balita', icon: Globe },
    { id: 'General', name: 'Pangkalahatan', icon: Newspaper },
    { id: 'Philippines-US Relations', name: 'Relasyon Pilipinas-US', icon: Flag },
    { id: 'International News', name: 'Pandaigdigang Balita', icon: MapPin },
    { id: 'US Politics', name: 'Pulitika ng US', icon: Building2 },
    { id: 'Healthcare', name: 'Kalusugan', icon: Stethoscope },
    { id: 'Education', name: 'Edukasyon', icon: GraduationCap },
    { id: 'Immigration', name: 'Imigrasyon', icon: Plane },
    { id: 'Economy', name: 'Ekonomiya', icon: TrendingUp },
    { id: 'Culture', name: 'Kultura', icon: Palette },
    { id: 'Sports', name: 'Palakasan', icon: Trophy },
    { id: 'Fact Checks', name: 'Pagsusuri ng Katotohanan', icon: ShieldCheck },
    { id: 'Analysis', name: 'Pagsusuri', icon: Lightbulb }
  ];

  // Filter out certain categories from visible category bar for FAV site
  const visibleCategories = categories.filter(cat =>
    !['China-US Relations', 'International News', 'Analysis'].includes(cat.id)
  );

  // Fetch articles based on selected category
  const fetchArticles = async (category = 'all', reset = true) => {
    try {
      if (reset) {
        setLoading(true);
        setArticles([]);
        setCurrentPage(1);
      }

      console.log(`Naglo-load ng mga artikulo - Kategorya: ${category}`);

      const categoryParam = category === 'all' ? '' : `&category=${category}`;
      const response = await fetch(`/api/published-articles?language=tagalog&limit=26${categoryParam}&t=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.articles && data.articles.length > 0) {
        console.log(`Na-load ang ${data.articles.length} artikulo (Kategorya: ${category})`);

        const hasMoreArticles = data.articles.length > 25;
        const articlesToShow = data.articles.slice(0, 25);

        if (reset) {
          setArticles(articlesToShow);
        } else {
          setArticles(prev => [...prev, ...articlesToShow]);
        }
        setHasMore(hasMoreArticles);

        console.log('PAGINATION DEBUG:', {
          category,
          totalFetched: data.articles.length,
          showing: articlesToShow.length,
          hasMore: hasMoreArticles
        });
      } else {
        console.log('Walang nakitang artikulo, gumagamit ng sample data');
        const mockData = getMockArticles();
        setArticles(mockData);
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error sa pag-load ng mga artikulo:', error);
      console.log('Gumagamit ng sample data');

      const mockData = getMockArticles();
      setArticles(mockData);
      setHasMore(false);
      setLoading(false);
    }
  };

  // Fetch trending articles from all categories for sidebar
  const fetchTrendingArticles = async () => {
    try {
      console.log('Naglo-load ng mga trending na balita');
      const response = await fetch(`/api/published-articles?language=tagalog&limit=10&t=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        // Get high priority or high relevance articles
        let trending = data.articles
          .filter(article => article.priority === 'high' || article.relevanceScore >= 7)
          .slice(0, 3);

        // If not enough high priority articles, use the most recent articles as fallback
        if (trending.length < 3) {
          console.log(`${trending.length} lang ang high priority, gumagamit ng pinakabago`);
          trending = data.articles.slice(0, 3);
        }

        setTrendingArticles(trending);
        console.log(`Na-load ang ${trending.length} trending na balita`);
      }
    } catch (error) {
      console.error('Error sa pag-load ng trending na balita:', error);
    }
  };

  useEffect(() => {
    // Track homepage page view with retry logic
    const trackPageView = () => {
      if (typeof window !== 'undefined' && typeof window.trackEvent === 'function') {
        console.log('Tracking homepage view for category:', selectedCategory);
        window.trackEvent('page_view', {
          page_type: 'homepage',
          category: selectedCategory,
          language: 'tagalog'
        });
      } else {
        console.log('Tracking not ready, retrying...');
        setTimeout(trackPageView, 500);
      }
    };

    setTimeout(trackPageView, 100);

    fetchArticles(selectedCategory);
    // Fetch trending articles when component mounts or category changes
    if (selectedCategory !== 'all') {
      fetchTrendingArticles();
    }
  }, [selectedCategory]);

  // Load more articles function
  const loadMoreArticles = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const categoryParam = selectedCategory === 'all' ? '' : `&category=${selectedCategory}`;
      const response = await fetch(`/api/published-articles?language=tagalog&limit=26&offset=${currentPage * 25}${categoryParam}&t=${Date.now()}`);

      if (response.ok) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          // If we got 26 articles, there are more available - show only first 25
          const hasMoreArticles = data.articles.length > 25;
          const articlesToAdd = data.articles.slice(0, 25);

          // Deduplicate articles by ID to prevent repeats
          setArticles(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const newArticles = articlesToAdd.filter(a => !existingIds.has(a.id));
            console.log(`Deduplication: ${articlesToAdd.length} fetched, ${newArticles.length} new (${articlesToAdd.length - newArticles.length} duplicates removed)`);
            return [...prev, ...newArticles];
          });
          setCurrentPage(nextPage);
          setHasMore(hasMoreArticles);

          console.log('LOAD MORE DEBUG:', {
            totalFetched: data.articles.length,
            showing: articlesToAdd.length,
            hasMore: hasMoreArticles,
            currentPage: nextPage
          });
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Mock data function for fallback
  const getMockArticles = () => {
    return [
      {
        id: 1,
        originalTitle: "Trump calls for U.S. census to exclude for the first time people with no legal status",
        displayTitle: "Nananawagan si Trump na ibukod sa census ng US ang mga taong walang legal na status",
        aiSummary: "Inihayag ni Pangulong Trump ang planong 'bagong' census na magbubukod sa mga taong walang legal na status, na muling sinisimulan ang kontrobersyal na pagsisikap mula sa kanyang unang termino. Inaatas ng Ika-14 na Amendmento na bilangin ang 'lahat ng tao' sa bawat estado para matukoy ang representasyon sa Kongreso.",
        source: "NPR",
        publishedDate: "2025-08-07",
        topic: "Immigration",
        priority: "high",
        relevanceScore: 8.5,
        imageUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=400&fit=crop",
        originalUrl: "https://www.npr.org/2025/08/07/nx-s1-5265650/new-census-trump-immigrants-counted",
        slug: "trump-census-immigration-policy"
      },
      {
        id: 2,
        originalTitle: "Immigrants who are crime victims and waiting for visas now face deportation",
        displayTitle: "Mga imigranteng biktima ng krimen na naghihintay ng visa ay nahaharap na sa deportasyon",
        aiSummary: "Ang ilang imigranteng biktima ng krimen na nag-a-apply para sa U visa ay dinedetina, bilang bahagi ng malawakang kampanya ng deportasyon ng administrasyong Trump. Ang programang U visa ay dinisenyo upang tulungan ang mga biktima ng krimen na nakikipagtulungan sa mga awtoridad, ngunit hindi na pinoprotektahan ng bagong patakaran ang mga aplikante mula sa proseso ng deportasyon.",
        source: "NBC News",
        publishedDate: "2025-08-07",
        topic: "Immigration",
        priority: "high",
        relevanceScore: 9.0,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        originalUrl: "https://www.nbcnews.com/news/latino/immigrants-u-visas-deportation-new-trump-rules-ice-rcna223480",
        slug: "u-visa-deportation-changes"
      },
      {
        id: 3,
        originalTitle: "Trump administration freezes $108M at Duke amid inquiry into alleged racial preferences",
        displayTitle: "Ipinag-freeze ng administrasyong Trump ang $108M sa Duke dahil sa imbestigasyon sa racial preferences",
        aiSummary: "Ipinag-freeze ng administrasyong Trump ang $108 milyong pondo ng pananaliksik ng Duke University, na inakusahang nagdi-diskrimina sa lahi sa pamamagitan ng mga patakaran ng preference. Ito ang pinakabagong aksyon pagkatapos ng katulad na mga hakbang laban sa Harvard, Columbia at Cornell, bilang bahagi ng mas malawak na kampanya laban sa mga programa ng diversity, equity at inclusion.",
        source: "AP News",
        publishedDate: "2025-08-07",
        topic: "Education",
        priority: "medium",
        relevanceScore: 7.5,
        imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=400&fit=crop",
        originalUrl: "https://apnews.com/article/duke-university-funding-freeze-trump-dei-23a70359ee44a21fdc55bef6dfe52413",
        slug: "duke-university-funding-freeze"
      }
    ];
  };

  // Generate dynamic breaking news ticker from latest articles
  const getBreakingNews = () => {
    if (articles.length === 0) return [{ title: "Pinakabagong balita \u2022 Mahahalagang isyu ng komunidad ng Filipino Amerikano \u2022 Balita ng komunidad", url: null }];

    // Use the first 5 articles to populate breaking news - they already have Tagalog translations
    const latestNews = articles
      .slice(0, 5)
      .map(article => {
        // Prioritize Tagalog translated title, fall back to displayTitle if not available
        const title = article.translatedTitles?.tagalog || article.displayTitle;
        // Tagalog titles - use 100 char limit
        const shortTitle = title && title.length > 100 ? title.substring(0, 97) + '...' : title;
        return { title: shortTitle, url: getArticleUrl(article), id: article.id };
      })
      .filter(item => item.title); // Remove null/undefined titles

    return latestNews.length > 0 ? latestNews : [{ title: "Pinakabagong balita \u2022 Mahahalagang isyu ng komunidad ng Filipino Amerikano", url: null }];
  };

  // Hide Analysis from main feed (Fact Checks now visible)
  const filteredArticles = articles.filter(article => {
    if (selectedCategory === 'Analysis') {
      return article.topic === 'Analysis';
    }
    return article.topic !== 'Analysis';
  });

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  const formatDate = (dateString) => {
    // Fix timezone issue: treat date as local date, not UTC
    const [year, month, day] = dateString.split('-');
    const localDate = new Date(year, month - 1, day); // month is 0-indexed

    try {
      return localDate.toLocaleDateString('tl-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      // Fallback to en-PH if tl-PH is not supported
      return localDate.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const getCategoryColor = (topic) => {
    // First map the category, then get color
    const mappedTopic = mapCategoryForFAV(topic);
    switch(mappedTopic) {
      case 'Philippines-US Relations': return 'text-green-600 bg-green-50';
      case 'Healthcare': return 'text-blue-600 bg-blue-50';
      case 'Education': return 'text-purple-600 bg-purple-50';
      case 'Immigration': return 'text-orange-600 bg-orange-50';
      case 'US Politics': return 'text-red-600 bg-red-50';
      case 'Economy': return 'text-yellow-700 bg-yellow-50';
      case 'Culture': return 'text-pink-600 bg-pink-50';
      case 'Sports': return 'text-indigo-600 bg-indigo-50';
      case 'Fact Checks': return 'text-teal-600 bg-teal-50';
      case 'Analysis': return 'text-amber-600 bg-amber-50';
      case 'Technology': return 'text-cyan-600 bg-cyan-50';
      case 'International News': return 'text-slate-600 bg-slate-50';
      case 'Event Explainers': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Helper function to get display content in Tagalog - REQUIRE TAGALOG TRANSLATIONS
  const getDisplayTitle = (article) => {
    // ONLY use Tagalog translation - no fallbacks since API filters for complete translations
    return article.translatedTitles?.tagalog || 'Isinasalin ang pamagat...';
  };

  const getDisplaySummary = (article) => {
    // ONLY use Tagalog translation - no fallbacks since API filters for complete translations
    const summary = article.translations?.tagalog || 'Isinasalin ang nilalaman...';
    // Clean up any HTML br tags that might be stored in the database
    return summary.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
  };

  // Generate article URL slug - simplified approach
  const getArticleUrl = (article) => {
    // Use just the article ID for now to ensure it works
    return `/article/${article.id}`;
  };

  // Newsletter signup handler
  // Initialize reCAPTCHA
  const handleRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {
        if (recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
          try {
            window.grecaptcha.render(recaptchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              callback: (token) => {
                setCaptchaToken(token);
              },
              'expired-callback': () => {
                setCaptchaToken(null);
              }
            });
          } catch (e) {
            console.error('Error rendering reCAPTCHA:', e);
          }
        }
      });
    }
  };

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Mangyaring maglagay ng wastong email address');
      return;
    }

    if (!captchaToken) {
      setNewsletterStatus('error');
      setNewsletterMessage('Mangyaring kumpletuhin ang verification');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail, captchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage(data.message);
        setNewsletterEmail('');
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
        setCaptchaToken(null); // Clear the input
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Nabigong mag-subscribe. Pakisubukan muli mamaya');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setNewsletterStatus('error');
      setNewsletterMessage('Nabigong mag-subscribe. Pakisubukan muli mamaya');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Naglo-load...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-[7px] leading-none">Tinig ng</span>
                <span className="text-white font-bold text-[7px] leading-none">Filipino</span>
                <span className="text-white font-bold text-[7px] leading-none">Amerikano</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Tinig ng Filipino Amerikano
                </h1>
                <p className="text-xs text-gray-500">Filipino American Voices</p>
              </div>
            </Link>


            <div className="flex items-center space-x-4">
              <SearchBar site="tagalog" />
              <a
                href="mailto:contact@tinigngfilipinoamerikano.us"
                className="text-gray-700 hover:text-emerald-600 text-sm font-medium"
              >
                Makipag-ugnayan
              </a>
            </div>
          </div>
        </div>

        {/* Prominent Event Hub Bar - Part of Sticky Header */}
        <div className="border-t border-gray-200 py-3 bg-gradient-to-r from-emerald-50 via-yellow-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-gray-700">🗳️ Mahahalagang Halalan:</span>
              <Link
                href="/event/georgia-supreme-court-2026"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 bg-green-600 text-white hover:bg-green-700 shadow-lg"
              >
                <span>⚖️ Kataas-taasang Hukuman ng GA 2026</span>
              </Link>
              <Link
                href="/event/pennsylvania-1st-district-2026"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 bg-teal-600 text-white hover:bg-teal-700 shadow-lg"
              >
                <span>🏛️ Ika-1 Distrito ng PA Primarya 2026</span>
              </Link>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center space-y-2">
              <span className="text-sm font-bold text-gray-700 mb-1">🗳️ Mahahalagang Halalan</span>
              <div className="flex flex-col items-center space-y-2 w-full">
                <Link
                  href="/event/georgia-supreme-court-2026"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium transition-all transform hover:scale-105 bg-green-600 text-white hover:bg-green-700 shadow-lg w-full max-w-xs"
                >
                  <span>⚖️ Kataas-taasang Hukuman ng GA 2026</span>
                </Link>
                <Link
                  href="/event/pennsylvania-1st-district-2026"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium transition-all transform hover:scale-105 bg-teal-600 text-white hover:bg-teal-700 shadow-lg w-full max-w-xs"
                >
                  <span>🏛️ Ika-1 Distrito ng PA Primarya 2026</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breaking News Ticker - Now Dynamic */}
      <div className="bg-emerald-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-emerald-600 px-2 py-1 text-xs font-bold rounded mr-4">
              Balitang Init
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-scroll whitespace-nowrap text-sm">
                {getBreakingNews().map((item, index) => (
                  <span key={item.id || index}>
                    {item.url ? (
                      <Link href={item.url} className="hover:text-emerald-200 transition-colors">
                        {item.title}
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                    {index < getBreakingNews().length - 1 && " \u2022 "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation with Event Hubs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop: Single row with categories and events */}
          <div className="hidden md:flex items-center py-4 gap-3">
            {/* Scrollable Categories Section */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-emerald-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: Two separate rows */}
          <div className="md:hidden">
            {/* Categories Row */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-emerald-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {featuredArticle && (
              <article className="group cursor-pointer">
                <a href={getArticleUrl(featuredArticle)} className="block">
                  <div className="relative">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={getDisplayTitle(featuredArticle)}
                      className="w-full h-64 lg:h-80 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredArticle.topic)}`}>
                        {categories.find(cat => cat.id === mapCategoryForFAV(featuredArticle.topic))?.name || mapCategoryForFAV(featuredArticle.topic)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors font-filipino">
                      {getDisplayTitle(featuredArticle)}
                    </h1>

                    <div className="mt-4 flex items-center text-sm text-gray-600 space-x-4">
                      <span>{featuredArticle.source}</span>
                      <span>&bull;</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(featuredArticle.publishedDate)}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p className="text-lg text-gray-700 leading-relaxed font-filipino">
                        {getDisplaySummary(featuredArticle)}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium">
                        <span>Basahin ang buong artikulo</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>

                      <a
                        href={featuredArticle.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Orihinal na artikulo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </a>
              </article>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup - Moved above trending for marketing optimization */}
            <div className="bg-emerald-50 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2 font-filipino">
                Mag-subscribe sa balita
              </h2>
              <p className="text-sm text-gray-600 mb-4 font-filipino">
                Tumanggap ng pinakabagong balita na nakakaapekto sa komunidad ng Filipino Amerikano sa pamamagitan ng email.
              </p>
              <form onSubmit={handleNewsletterSignup} className="space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Ilagay ang iyong email address"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                />
                {/* reCAPTCHA */}
                <div ref={recaptchaRef} className="mb-3"></div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Pinoproseso...' : 'Mag-subscribe'}
                </button>
                {newsletterMessage && (
                  <div className={`text-sm font-filipino ${
                    newsletterStatus === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {newsletterMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Trending Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center font-filipino">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                  {selectedCategory === 'all' ? 'Mga Tampok na Balita' : 'Iba pang Balita'}
                </h2>
                <span className="text-xs text-gray-500 font-filipino">
                  {selectedCategory === 'all' ? 'Top 3' : 'Iba\'t ibang kategorya'}
                </span>
              </div>

              <div className="space-y-4">
                {selectedCategory === 'all' ? (
                  // Homepage: show trending articles
                  otherArticles.slice(0, 3).map((article, index) => (
                  <article key={article.id} className="group cursor-pointer">
                    <a href={getArticleUrl(article)} className="block">
                      <div className="flex space-x-3">
                        <span className="text-2xl font-bold text-emerald-600 mt-1">
                          {index + 2}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight font-filipino">
                            {getDisplayTitle(article)}
                          </h3>
                          <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                            <span>{article.source}</span>
                            <span>&bull;</span>
                            <span>{formatDate(article.publishedDate)}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </article>
                  ))
                ) : (
                  // Category pages: show cross-category trending articles
                  trendingArticles.length > 0 ? (
                    trendingArticles.map((article, index) => (
                      <article key={article.id} className="group cursor-pointer">
                        <a href={getArticleUrl(article)} className="block">
                          <div className="flex space-x-3">
                            <span className="text-2xl font-bold text-emerald-600 mt-1">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight font-filipino">
                                {getDisplayTitle(article)}
                              </h3>
                              <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                                <span>{article.source}</span>
                                <span>&bull;</span>
                                <span>{formatDate(article.publishedDate)}</span>
                              </div>
                              <div className="mt-1">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(article.topic)}`}>
                                  {categories.find(cat => cat.id === mapCategoryForFAV(article.topic))?.name || mapCategoryForFAV(article.topic)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </article>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 font-filipino">
                        Naglo-load ng iba pang trending na balita...
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Article Request Form - New Feature */}
            <div className="mt-6">
              <ArticleRequestForm />
            </div>
          </div>
        </div>

        {/* News Archive Section */}
        {otherArticles.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-filipino">Arkibo ng Balita</h2>
              </div>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium font-filipino"
                >
                  Tingnan lahat ng balita
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Show different articles based on whether we're filtering by category */}
              {(selectedCategory === 'all' ? otherArticles.slice(3) : otherArticles.slice(0)).map((article) => (
                <article key={article.id} className="group cursor-pointer">
                  <a href={getArticleUrl(article)} className="block">
                    <div className="relative">
                      <img
                        src={article.imageUrl}
                        alt={getDisplayTitle(article)}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.topic)}`}>
                          {categories.find(cat => cat.id === mapCategoryForFAV(article.topic))?.name || mapCategoryForFAV(article.topic)}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-filipino">
                          {formatDate(article.publishedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight font-filipino">
                        {getDisplayTitle(article)}
                      </h3>

                      <div className="mt-2 flex items-center text-sm text-gray-600 space-x-3">
                        <span>{article.source}</span>
                        <span>&bull;</span>
                        <span className="font-filipino">{formatDate(article.publishedDate)}</span>
                      </div>

                      <p className="mt-3 text-gray-700 text-sm leading-relaxed line-clamp-3 font-filipino">
                        {getDisplaySummary(article).substring(0, 150)}...
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                          <span>Magbasa pa</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <a
                          href={article.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Orihinal na artikulo
                        </a>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMoreArticles}
                  disabled={loadingMore}
                  className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-filipino"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Naglo-load...
                    </>
                  ) : (
                    'Tingnan ang higit pang mga artikulo'
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-[7px] leading-none">Tinig ng</span>
                  <span className="text-white font-bold text-[7px] leading-none">Filipino</span>
                  <span className="text-white font-bold text-[7px] leading-none">Amerikano</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-filipino">
                    Tinig ng Filipino Amerikano
                  </h3>
                  <p className="text-sm text-gray-400">Filipino American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-filipino">
                Nagdadala ng mahahalagang kuwento para sa komunidad ng Filipino Amerikano. Kami ay isang independiyenteng organisasyon ng media na nakatuon sa mga isyung nakakaapekto sa komunidad.
              </p>
            </div>


            <div>
              <h4 className="font-semibold mb-4 font-filipino">Tungkol sa Amin</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white font-filipino">Ang aming misyon</Link></li>
                <li><a href="mailto:contact@tinigngfilipinoamerikano.us" className="text-gray-400 hover:text-white font-filipino">Makipag-ugnayan</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white font-filipino">Patakaran sa Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white font-filipino">Mga Tuntunin ng Paggamit</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="font-filipino">&copy; 2025 Tinig ng Filipino Amerikano. Lahat ng karapatan ay nakalaan.</p>
            <p className="font-filipino text-xs opacity-70 mt-2">Inilathala sa Estados Unidos ng Asian American Voices Media (AAVM), isang nonprofit at non-partisan na organisasyon ng Estados Unidos.</p>
          </div>
        </div>
      </footer>

      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={handleRecaptchaLoad}
      />

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        /* Faster scrolling on mobile devices */
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        .font-filipino {
          font-family: 'Noto Sans', 'Arial', sans-serif;
        }
      `}</style>

      {/* reCAPTCHA Script */}
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={handleRecaptchaLoad}
      />
    </div>
  );
}
