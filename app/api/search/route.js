// app/api/search/route.js - Local search API for Filipino American Voices
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ success: true, results: [] });
    }

    // Escape % and _ to prevent SQL LIKE wildcard injection
    const safeQuery = query.replace(/[%_]/g, ch => '\\' + ch);

    const { data: articles, error } = await supabase
      .from('articles')
      .select('*, scraped_date, published_date, image_url, relevance_score')
      .eq('status', 'published')
      // Match either English title or Tagalog title/content search columns
      .or(`original_title.ilike.%${safeQuery}%,tagalog_title_search.ilike.%${safeQuery}%,tagalog_content_search.ilike.%${safeQuery}%`)
      // Require some Tagalog signal (title_search populated OR has audio = was translated)
      .or('tagalog_title_search.not.is.null,tagalog_audio_url.not.is.null')
      .order('scraped_date', { ascending: false })
      .order('relevance_score', { ascending: false, nullsLast: true })
      .limit(limit);

    if (error) {
      console.error('FAV search error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const results = (articles || []).map(article => {
      const translatedTitles = safeJsonParse(article.translated_titles);
      const translations = safeJsonParse(article.translations);

      const displayTitle =
        article.tagalog_title_search
        || translatedTitles.tagalog
        || article.display_title
        || article.original_title;

      const displaySummary =
        article.tagalog_content_search
        || translations.tagalog
        || article.ai_summary
        || '';

      return {
        id: article.id,
        originalTitle: article.original_title,
        displayTitle,
        translatedTitles,
        translations,
        topic: article.topic,
        source: article.source,
        publishedDate: article.scraped_date,
        matchedSummary: displaySummary.substring(0, 200),
        imageUrl: article.image_url,
        relevanceScore: article.relevance_score
      };
    });

    return NextResponse.json({
      success: true,
      results,
      total_results: results.length
    });

  } catch (error) {
    console.error('FAV search route error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Handle the AAVM legacy double-encoded JSON in translations TEXT columns
function safeJsonParse(val) {
  if (!val) return {};
  if (typeof val === 'object') return val;
  try {
    let parsed = JSON.parse(val);
    if (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed); } catch { return {}; }
    }
    return (parsed && typeof parsed === 'object') ? parsed : {};
  } catch {
    return {};
  }
}
