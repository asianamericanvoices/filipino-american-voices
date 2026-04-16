// lib/sharing.js - Filipino American Voices sharing utilities

export const generateShareUrl = (platform, articleId, articleTitle) => {
  const baseUrl = `${window.location.origin}/article/${articleId}`;
  const utmParams = new URLSearchParams({
    utm_source: platform,
    utm_medium: 'social',
    utm_campaign: 'article_share',
    utm_content: articleId,
    utm_term: encodeURIComponent(articleTitle.substring(0, 50))
  });

  return `${baseUrl}?${utmParams.toString()}`;
};

// Track share event to both GA4 and Supabase
export const trackShare = async (platform, articleId, articleTitle, success = true) => {
  const shareData = {
    method: platform,
    content_type: 'article',
    item_id: articleId,
    content_title: articleTitle,
    share_url: generateShareUrl(platform, articleId, articleTitle),
    success: success
  };

  // Use our global tracking function
  if (typeof window.trackEvent === 'function') {
    await window.trackEvent('share', shareData);
  }
};

// WhatsApp sharing
export const shareToWhatsApp = async (articleId, title) => {
  const shareUrl = generateShareUrl('whatsapp', articleId, title);
  const message = encodeURIComponent(`${title}\n\n${shareUrl}\n\nMula sa Filipino American Voices`);

  try {
    await trackShare('whatsapp', articleId, title);

    // Check if mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile: use WhatsApp app
      window.open(`whatsapp://send?text=${message}`, '_blank');
    } else {
      // Desktop: use WhatsApp Web
      window.open(`https://web.whatsapp.com/send?text=${message}`, '_blank');
    }

    return true;
  } catch (error) {
    console.error('WhatsApp share error:', error);
    await trackShare('whatsapp', articleId, title, false);
    return false;
  }
};

// Facebook sharing
export const shareToFacebook = async (articleId, title) => {
  const shareUrl = generateShareUrl('facebook', articleId, title);

  try {
    await trackShare('facebook', articleId, title);

    // Use Facebook Share Dialog
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`;

    // Open in popup
    const popup = window.open(
      facebookUrl,
      'facebook-share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );

    // Track if popup was blocked
    if (!popup) {
      await trackShare('facebook', articleId, title, false);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Facebook share error:', error);
    await trackShare('facebook', articleId, title, false);
    return false;
  }
};

// Twitter/X sharing
export const shareToTwitter = async (articleId, title) => {
  const shareUrl = generateShareUrl('twitter', articleId, title);
  const tweetText = encodeURIComponent(`${title.substring(0, 200)}... #FilipAm #AAPI`);

  try {
    await trackShare('twitter', articleId, title);

    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrl)}`;

    const popup = window.open(
      twitterUrl,
      'twitter-share',
      'width=600,height=400,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
      await trackShare('twitter', articleId, title, false);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Twitter share error:', error);
    await trackShare('twitter', articleId, title, false);
    return false;
  }
};

// Email sharing
export const shareToEmail = async (articleId, title, summary = '') => {
  const shareUrl = generateShareUrl('email', articleId, title);

  try {
    await trackShare('email', articleId, title);

    const subject = encodeURIComponent(`Mahalagang Balita: ${title}`);
    const body = encodeURIComponent(`Gusto kong ibahagi sa iyo ang mahalagang artikulong ito:\n\n${title}\n\n${summary.substring(0, 200)}...\n\nBasahin ang buong artikulo: ${shareUrl}\n\nMula sa Filipino American Voices`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;

    return true;
  } catch (error) {
    console.error('Email share error:', error);
    await trackShare('email', articleId, title, false);
    return false;
  }
};

// Copy link sharing
export const copyToClipboard = async (articleId, title) => {
  const shareUrl = generateShareUrl('copy', articleId, title);

  try {
    await navigator.clipboard.writeText(shareUrl);
    await trackShare('copy', articleId, title);

    // Show success message
    alert('Na-kopya na ang link!');

    return true;
  } catch (error) {
    console.error('Copy link error:', error);
    await trackShare('copy', articleId, title, false);

    // Fallback: select and copy
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Na-kopya na ang link!');
    return true;
  }
};

// Native Web Share API (if available)
export const nativeShare = async (articleId, title, summary = '') => {
  if (!navigator.share) {
    return false;
  }

  const shareUrl = generateShareUrl('native', articleId, title);

  try {
    await trackShare('native', articleId, title);

    await navigator.share({
      title: title,
      text: summary.substring(0, 100),
      url: shareUrl
    });

    return true;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Native share error:', error);
      await trackShare('native', articleId, title, false);
    }
    return false;
  }
};
