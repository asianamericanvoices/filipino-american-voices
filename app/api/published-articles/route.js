// app/api/published-articles/route.js - Filipino American Voices
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Optional Supabase integration - connects to your existing dashboard database
let supabase = null;
try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected to Filipino American Voices');
  } else {
    console.log('📁 No Supabase credentials - using mock data');
  }
} catch (error) {
  console.log('📁 Supabase not available, using mock data');
  supabase = null;
}

export async function GET(request) {
  const url = new URL(request.url);
  const language = url.searchParams.get('language') || 'tagalog';
  const category = url.searchParams.get('category') || 'all';
  const limit = parseInt(url.searchParams.get('limit')) || 25;
  const offset = parseInt(url.searchParams.get('offset')) || 0;
  const targetedEvent = url.searchParams.get('targeted_event') || null;

  try {
    let articles = [];

    if (supabase) {
      // Fetch from your actual dashboard database
      console.log('📊 Fetching published articles from Supabase...');

      let query = supabase
        .from('articles')
        .select(`
          id,
          original_title,
          ai_title,
          display_title,
          ai_summary,
          translations,
          translated_titles,
          social_caption,
          source,
          author,
          scraped_date,
          published_date,
          topic,
          priority,
          relevance_score,
          image_url,
          image_source,
          image_attribution,
          original_url,
          status,
          is_tagalog_hero,
          tagalog_hero_lock_until,
          targeted_event,
          event_subtags,
          is_event_hero,
          event_hero_for,
          additional_sources,
          tagalog_audio_url,
          tagalog_audio_duration,
          tagalog_audio_generated_at,
          social_captions
        `)
        .eq('status', 'published');

      // Apply category filter BEFORE pagination
      if (category !== 'all') {
        query = query.eq('topic', category);
      }

      // Filter by targeted event if specified
      if (targetedEvent) {
        query = query.eq('targeted_event', targetedEvent);
      } else {
        // FAV SPECIFIC: Filter out International News, Philippines-US Relations, and Event Explainers categories
        // These categories are hidden from the FAV site per content strategy
        // Event Explainers are only shown when pinned as event heroes
        // Only apply this filter when NOT filtering by event (event pages show all event content)
        query = query.not('topic', 'in', '("International News","China-US Relations","Philippines-US Relations","Event Explainers")');
      }

      // Apply ordering after filtering - prioritize Filipino/Tagalog hero, then chronological
      query = query
        .order('is_tagalog_hero', { ascending: false })
        .order('scraped_date', { ascending: false });

      // Apply pagination limits LAST
      if (offset > 0) {
        query = query.range(offset, offset + limit - 1);
      } else {
        query = query.range(0, limit - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      // Transform to frontend format
      articles = data.map(article => {
        // Get translations from JSONB fields (Tagalog uses JSONB, no dedicated columns)
        const translations = parseJsonField(article.translations) || { chinese: null, korean: null, tagalog: null };
        const translatedTitles = parseJsonField(article.translated_titles) || { chinese: null, korean: null, tagalog: null };
        const socialCaptions = parseJsonField(article.social_captions) || { chinese: null, korean: null, tagalog: null };

        return {
          id: article.id,
          originalTitle: article.original_title,
          aiTitle: article.ai_title,
          displayTitle: article.display_title,
          aiSummary: article.ai_summary,
          translations,
          translatedTitles,
          socialCaptions,
          source: article.source,
          author: article.author,
          publishedDate: article.scraped_date, // Use scraped_date for authentic news chronology
          internalPublishedDate: article.published_date, // Keep internal date for reference
          topic: article.topic,
          priority: article.priority,
          relevanceScore: article.relevance_score,
          imageUrl: article.image_url,
          imageSource: article.image_source,
          imageAttribution: article.image_attribution,
          originalUrl: article.original_url,
          isHero: article.is_tagalog_hero || false,
          // Manual hero override expiry; the homepage skips its stale-hero swap while this is in the future.
          heroLockUntil: article.tagalog_hero_lock_until || null,
          additionalSources: parseJsonField(article.additional_sources) || [],
          isEventHero: article.is_event_hero || false,
          eventHeroFor: article.event_hero_for,
          targetedEvent: article.targeted_event,
          eventSubtags: parseJsonField(article.event_subtags) || [],
          audioUrl: article.tagalog_audio_url,
          audioDuration: article.tagalog_audio_duration,
          audioGeneratedAt: article.tagalog_audio_generated_at,
          slug: generateSlug(article.original_title, article.id)
        };
      });

      console.log(`✅ Fetched ${articles.length} published articles from Supabase`);

      // Debug: Log ALL article dates to check for 2-day cutoff issue
      if (articles.length > 0) {
        console.log('🔍 DEBUG - All article dates:');
        articles.forEach((article, index) => {
          const daysDiff = Math.floor((new Date() - new Date(article.publishedDate || article.scrapedDate)) / (1000 * 60 * 60 * 24));
          console.log(`  ${index + 1}. ${article.originalTitle?.substring(0, 30)}... - ${article.publishedDate || article.scrapedDate} (${daysDiff} days ago) - Topic: ${article.topic}`);
        });
        console.log('Current server time:', new Date().toISOString());
      }
    } else {
      // Mock data for demo/development
      console.log('⚠️ Supabase not configured — returning no articles rather than placeholder content');
      articles = [];
    }

    // Filter articles that have at least some translation content in the requested language
    const filteredArticles = articles.filter(article => {
      if (language === 'chinese') {
        // Require at least Chinese title OR summary translation (not both)
        const hasTranslations = article.translations?.chinese || article.translatedTitles?.chinese;
        return hasTranslations;
      } else if (language === 'korean') {
        // Require at least Korean title OR summary translation (not both)
        const hasTranslations = article.translations?.korean || article.translatedTitles?.korean;
        return hasTranslations;
      } else if (language === 'tagalog') {
        // Require at least Filipino/Tagalog title OR summary translation (not both)
        const hasTranslations = article.translations?.tagalog || article.translatedTitles?.tagalog;
        return hasTranslations;
      }
      return true; // For English or no language preference
    });

    // Debug: Log what articles we're returning and their dates
    console.log(`🔍 DEBUG - Returning ${filteredArticles.length} articles for ${language}:`);
    filteredArticles.slice(0, 10).forEach(article => {
      console.log(`  - ${article.originalTitle?.substring(0, 40)}... (${article.publishedDate || article.scrapedDate})`);
    });

    const response = NextResponse.json({
      articles: filteredArticles,
      total: filteredArticles.length,
      language,
      category,
      timestamp: new Date().toISOString()
    });

    // Prevent caching to ensure fresh data from Supabase
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    console.error('❌ Error fetching published articles:', error);

    // Fallback to mock data on error
    // Never serve placeholder articles. These used to be fabricated stories attributed
    // to NPR / NBC News / AP News with real-looking URLs and a fixed 2025-08-07 date,
    // which would render as genuine reporting whenever a query failed. An empty list
    // and the site's own empty state is the only honest answer here.
    const mockArticles = [];

    return NextResponse.json({
      articles: mockArticles,
      total: mockArticles.length,
      language,
      category,
      error: 'Using fallback data',
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to parse JSON fields from database
function parseJsonField(field) {
  if (!field) return null;
  if (typeof field === 'object') return field;
  try {
    let parsed = JSON.parse(field);
    // Handle double-encoded JSON (a string that itself contains JSON).
    // This is common in older AAVM articles where translations were
    // JSON.stringify()'d twice during the save path.
    if (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed); } catch { /* keep as string */ }
    }
    return parsed;
  } catch (e) {
    console.warn('Failed to parse JSON field:', String(field).substring(0, 100));
    return null;
  }
}

// Helper function to generate URL slugs
function generateSlug(title, id) {
  if (!title) return `article-${id}`;

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .substring(0, 50)         // Limit length
    .replace(/-+$/, '');      // Remove trailing hyphens
}

