// app/article/[slug]/layout.js - Server-side metadata generation for articles
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const slug = await Promise.resolve(params.slug);

    // Fetch the article to get its data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://filipino-american-voices.vercel.app';
    const response = await fetch(`${baseUrl}/api/published-articles?language=tagalog&limit=200&_t=${Date.now()}`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    const article = data.articles?.find(a => a.id.toString() === slug.toString());

    if (!article) {
      return {
        title: 'Hindi mahanap ang artikulo | Tinig ng Filipino Amerikano',
        description: 'Paumanhin, hindi mahanap ang artikulong hinahanap mo.',
      };
    }

    const tagalogTitle = article.translatedTitles?.tagalog || article.originalTitle;
    const tagalogSummary = article.translations?.tagalog || article.aiSummary;
    const imageUrl = article.imageUrl || '/og-logo-filipino-3.png'; // Fallback to branded logo

    return {
      title: `${tagalogTitle} | Tinig ng Filipino Amerikano`,
      description: tagalogSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      openGraph: {
        title: tagalogTitle,
        description: tagalogSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        type: 'article',
        publishedTime: article.publishedDate,
        authors: [article.author || 'Tinig ng Filipino Amerikano'],
        section: article.topic,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: tagalogTitle,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: tagalogTitle,
        description: tagalogSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Tinig ng Filipino Amerikano',
      description: 'Independiyenteng balita para sa komunidad ng Filipino American',
    };
  }
}

export default function ArticleLayout({ children }) {
  return children;
}
