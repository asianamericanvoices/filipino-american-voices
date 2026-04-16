// Newsletter Popup for Filipino American Voices
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    homeDelay: 5000,      // 5 seconds on homepage
    articleDelay: 10000,  // 10 seconds on article pages
    eventDelay: 15000,    // 15 seconds on event pages
    cookieDays: 30,       // Remember dismissal for 30 days
    debugMode: false      // Set to true for testing
  };

  // Check if user has already subscribed or dismissed
  function shouldShowPopup() {
    if (CONFIG.debugMode) {
      console.log('[FAV Newsletter] Debug mode enabled');
      return true;
    }

    // Check if already subscribed
    if (localStorage.getItem('fav_newsletter_subscribed') === 'true') {
      console.log('[FAV Newsletter] User already subscribed');
      return false;
    }

    // Check if recently dismissed
    const dismissedTime = localStorage.getItem('fav_newsletter_dismissed');
    if (dismissedTime) {
      const daysSinceDismissal = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissal < CONFIG.cookieDays) {
        console.log('[FAV Newsletter] Recently dismissed', daysSinceDismissal.toFixed(1), 'days ago');
        return false;
      }
    }

    return true;
  }

  // Get delay based on page type
  function getDelay() {
    const path = window.location.pathname;

    if (path === '/' || path === '') {
      return CONFIG.homeDelay;
    } else if (path.includes('/article/')) {
      return CONFIG.articleDelay;
    } else if (path.includes('/event')) {
      return CONFIG.eventDelay;
    } else {
      return CONFIG.homeDelay; // Default delay
    }
  }

  // Create the popup HTML
  function createPopup() {
    const popupHTML = `
      <div id="fav-newsletter-popup" class="newsletter-popup" style="display: none;">
        <div class="newsletter-popup-content">
          <button class="newsletter-popup-close" aria-label="Isara">&times;</button>

          <div class="newsletter-popup-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>

          <h3 class="newsletter-popup-title">Sundan ang pinakabagong balita</h3>
          <p class="newsletter-popup-description">
            Libreng daily newsletter mula sa Filipino American Voices
          </p>

          <form id="fav-newsletter-form" class="newsletter-popup-form">
            <input
              type="email"
              id="fav-newsletter-email"
              placeholder="Email address"
              required
              class="newsletter-popup-input"
            />
            <button type="submit" class="newsletter-popup-button">
              Mag-subscribe nang libre
            </button>
          </form>

          <p class="newsletter-popup-privacy">
            <small>Maaari kang mag-unsubscribe anumang oras</small>
          </p>

          <div id="fav-newsletter-success" class="newsletter-popup-success" style="display: none;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div>
              <strong>Matagumpay na nag-subscribe!</strong>
              <p>Matatanggap mo ang iyong unang newsletter sa lalong madaling panahon.</p>
            </div>
          </div>

          <div id="fav-newsletter-error" class="newsletter-popup-error" style="display: none;">
            <p>May naganap na error. Pakisubukan muli mamaya.</p>
          </div>
        </div>
      </div>
    `;

    // Add popup to page
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }

  // Show the popup with animation
  function showPopup() {
    const popup = document.getElementById('fav-newsletter-popup');
    if (!popup) {
      createPopup();
    }

    const popupElement = document.getElementById('fav-newsletter-popup');

    // Show with animation
    setTimeout(() => {
      popupElement.style.display = 'flex';
      setTimeout(() => {
        popupElement.classList.add('show');
      }, 10);
    }, 100);

    // Setup event handlers
    setupEventHandlers();
  }

  // Setup event handlers for the popup
  function setupEventHandlers() {
    const popup = document.getElementById('fav-newsletter-popup');
    const closeBtn = popup.querySelector('.newsletter-popup-close');
    const form = document.getElementById('fav-newsletter-form');

    // Close button
    closeBtn.addEventListener('click', function() {
      closePopup();
      localStorage.setItem('fav_newsletter_dismissed', Date.now().toString());
    });

    // Click outside to close
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        closePopup();
        localStorage.setItem('fav_newsletter_dismissed', Date.now().toString());
      }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const email = document.getElementById('fav-newsletter-email').value;
      const submitBtn = form.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('fav-newsletter-success');
      const errorMsg = document.getElementById('fav-newsletter-error');

      // Disable form
      submitBtn.disabled = true;
      submitBtn.textContent = 'Pinoproseso...';

      try {
        // Submit to newsletter API
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            source: 'popup',
            language: 'tagalog'
          })
        });

        if (response.ok) {
          // Show success
          form.style.display = 'none';
          successMsg.style.display = 'flex';

          // Mark as subscribed
          localStorage.setItem('fav_newsletter_subscribed', 'true');

          // Auto-close after 3 seconds
          setTimeout(() => {
            closePopup();
          }, 3000);
        } else {
          throw new Error('Subscription failed');
        }
      } catch (error) {
        console.error('[FAV Newsletter] Submission error:', error);
        errorMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Mag-subscribe';

        // Hide error after 3 seconds
        setTimeout(() => {
          errorMsg.style.display = 'none';
        }, 3000);
      }
    });
  }

  // Close the popup with animation
  function closePopup() {
    const popup = document.getElementById('fav-newsletter-popup');
    if (popup) {
      popup.classList.remove('show');
      setTimeout(() => {
        popup.style.display = 'none';
      }, 300);
    }
  }

  // Initialize when page loads
  function init() {
    // Only show popup if conditions are met
    if (!shouldShowPopup()) {
      console.log('[FAV Newsletter] Popup conditions not met');
      return;
    }

    // Get delay for this page type
    const delay = getDelay();
    console.log('[FAV Newsletter] Will show popup after', delay, 'ms');

    // Show popup after delay
    setTimeout(() => {
      showPopup();
    }, delay);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for testing
  window.favNewsletterPopup = {
    show: showPopup,
    reset: function() {
      localStorage.removeItem('fav_newsletter_subscribed');
      localStorage.removeItem('fav_newsletter_dismissed');
    },
    setDebug: function(enabled) {
      CONFIG.debugMode = enabled;
      console.log('[FAV Newsletter] Debug mode:', enabled);
    }
  };
})();
