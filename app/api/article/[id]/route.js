// app/api/article/[id]/route.js - Single Article API Endpoint for Filipino American Voices
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Optional Supabase integration - connects to your existing dashboard database
let supabase = null;
try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected for single article fetch');
  } else {
    console.log('📁 No Supabase credentials - using mock data');
  }
} catch (error) {
  console.log('📁 Supabase not available, using mock data');
  supabase = null;
}

export async function GET(request, { params }) {
  try {
    // Get the article ID from the URL params
    const { id } = params;
    const url = new URL(request.url);
    const language = url.searchParams.get('language') || 'tagalog';

    console.log(`📰 Fetching article ID: ${id} for language: ${language}`);

    if (!id) {
      console.error('❌ No article ID provided');
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 });
    }

    let article = null;

    if (supabase) {
      console.log(`📊 Fetching single article from Supabase: ID ${id}`);

      // Handle numeric IDs, UUIDs, and text slugs
      let queryId = id;
      let isUUID = false;
      let articleIdInt = parseInt(id);

      // Check if it's a UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(id)) {
        console.log(`🔍 Detected UUID format: ${id}`);
        queryId = id; // Use UUID directly
        isUUID = true;
      } else if (!isNaN(articleIdInt)) {
        console.log(`🔍 Detected numeric ID: ${articleIdInt}`);
        queryId = articleIdInt; // Use numeric ID
      } else if (id.includes('-')) {
        // Try to get ID from end of slug (e.g., "article-title-123" -> 123)
        const parts = id.split('-');
        const lastPart = parts[parts.length - 1];
        articleIdInt = parseInt(lastPart);
        if (!isNaN(articleIdInt)) {
          console.log(`🔍 Extracted ID ${articleIdInt} from slug: ${id}`);
          queryId = articleIdInt;
        } else {
          console.error('❌ Could not extract valid article ID from slug:', id);
          return NextResponse.json({ error: 'Invalid article ID format' }, { status: 400 });
        }
      } else {
        console.error('❌ Invalid article ID format:', id);
        return NextResponse.json({ error: 'Invalid article ID format' }, { status: 400 });
      }

      console.log(`🔍 About to query Supabase for article with queryId: ${queryId} (type: ${isUUID ? 'UUID' : 'numeric'})`);

      const { data, error } = await supabase
        .from('articles')
        .select(`
          id,
          original_title,
          ai_title,
          display_title,
          ai_summary,
          translations,
          translated_titles,
          social_captions,
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
          additional_sources,
          audio_url,
          audio_duration,
          audio_language,
          audio_generated_at,
          korean_audio_url,
          korean_audio_duration,
          korean_audio_generated_at,
          chinese_audio_url,
          chinese_audio_duration,
          chinese_audio_generated_at,
          english_audio_url,
          english_audio_duration,
          english_audio_generated_at,
          tagalog_audio_url,
          tagalog_audio_duration,
          tagalog_audio_generated_at
        `)
        .eq('id', queryId)
        .eq('status', 'published')
        .single();

      console.log(`🔍 Supabase query completed. Error:`, error, `Data:`, data ? 'Found data' : 'No data');

      if (error) {
        console.error('❌ Supabase error:', error);
        if (error.code === 'PGRST116') {
          // No rows returned
          return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }
        throw error;
      }

      if (!data) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }

      // Get translations from JSONB fields (Tagalog uses JSONB, no dedicated columns)
      const translations = parseJsonField(data.translations) || { chinese: null, korean: null, tagalog: null };
      const translatedTitles = parseJsonField(data.translated_titles) || { chinese: null, korean: null, tagalog: null };
      const socialCaptions = parseJsonField(data.social_captions) || { chinese: null, korean: null, tagalog: null };

      // Transform to frontend format
      article = {
        id: data.id,
        originalTitle: data.original_title,
        aiTitle: data.ai_title,
        displayTitle: data.display_title,
        aiSummary: data.ai_summary,
        translations,
        translatedTitles,
        socialCaptions,
        source: data.source,
        author: data.author,
        publishedDate: data.scraped_date, // Use scraped_date for authentic news chronology
        internalPublishedDate: data.published_date, // Keep internal date for reference
        topic: data.topic,
        priority: data.priority,
        relevanceScore: data.relevance_score,
        imageUrl: data.image_url,
        imageSource: data.image_source,
        imageAttribution: data.image_attribution,
        originalUrl: data.original_url,
        isHero: data.is_tagalog_hero || false,
        additionalSources: parseJsonField(data.additional_sources) || [],
        slug: generateSlug(data.original_title, data.id),
        // Include language-specific audio fields
        koreanAudioUrl: data.korean_audio_url,
        koreanAudioDuration: data.korean_audio_duration,
        koreanAudioGeneratedAt: data.korean_audio_generated_at,
        chineseAudioUrl: data.chinese_audio_url,
        chineseAudioDuration: data.chinese_audio_duration,
        chineseAudioGeneratedAt: data.chinese_audio_generated_at,
        englishAudioUrl: data.english_audio_url,
        englishAudioDuration: data.english_audio_duration,
        englishAudioGeneratedAt: data.english_audio_generated_at,
        tagalogAudioUrl: data.tagalog_audio_url,
        tagalogAudioDuration: data.tagalog_audio_duration,
        tagalogAudioGeneratedAt: data.tagalog_audio_generated_at,
        // Keep legacy fields for backward compatibility (if they exist)
        audioUrl: data.audio_url,
        audioDuration: data.audio_duration,
        audioLanguage: data.audio_language,
        audioGeneratedAt: data.audio_generated_at
      };

      console.log(`✅ Found article: ${article.originalTitle}`);
    } else {
      // Mock data fallback
      return NextResponse.json({ error: 'No database connection' }, { status: 500 });
    }

    // Check if article has translation for requested language
    if (language === 'chinese') {
      const hasTranslations = article.translations?.chinese || article.translatedTitles?.chinese;
      if (!hasTranslations) {
        return NextResponse.json({ error: 'Article not available in Chinese' }, { status: 404 });
      }
    } else if (language === 'korean') {
      const hasTranslations = article.translations?.korean || article.translatedTitles?.korean;
      if (!hasTranslations) {
        return NextResponse.json({ error: 'Article not available in Korean' }, { status: 404 });
      }
    } else if (language === 'tagalog') {
      const hasTranslations = article.translations?.tagalog || article.translatedTitles?.tagalog;
      if (!hasTranslations) {
        return NextResponse.json({ error: 'Article not available in Filipino/Tagalog' }, { status: 404 });
      }
    }

    const response = NextResponse.json({
      article,
      language,
      timestamp: new Date().toISOString()
    });

    // Prevent caching to ensure fresh data from Supabase
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    console.error('❌ Error fetching single article:', error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });

    return NextResponse.json({
      error: 'Failed to fetch article',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Helper function to parse JSON fields from database
function parseJsonField(field) {
  if (!field) return null;
  if (typeof field === 'object') return field;
  try {
    return JSON.parse(field);
  } catch (e) {
    console.warn('Failed to parse JSON field:', field);
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
