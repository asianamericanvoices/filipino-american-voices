'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('pending'); // pending, loading, success, error
  const [message, setMessage] = useState('');

  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'missing') {
      setStatus('error');
      setMessage('Hindi wasto o expired na ang unsubscribe link');
    } else if (error === 'invalid') {
      setStatus('error');
      setMessage('Hindi wasto ang unsubscribe link');
    }
  }, [error]);

  const handleUnsubscribe = async () => {
    if (!email || !token) {
      setStatus('error');
      setMessage('Hindi wasto ang unsubscribe link');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Matagumpay na nag-unsubscribe sa newsletter');
      } else {
        setStatus('error');
        setMessage(data.error || 'Nabigo ang pag-unsubscribe. Pakisubukan muli mamaya');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Nabigo ang pag-unsubscribe. Pakisubukan muli mamaya');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/Filipino-Icon-v3.png"
            alt="Tinig ng Filipino Amerikano"
            className="w-16 h-16 rounded-xl mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Tinig ng Filipino Amerikano</h1>
          <p className="text-gray-500 text-sm">Filipino American Voices</p>
        </div>

        {/* Content based on status */}
        {status === 'pending' && email && token && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mag-unsubscribe sa newsletter</h2>
            <p className="text-gray-600 mb-2">Unsubscribe from Newsletter</p>
            <p className="text-gray-600 mb-6">
              Sigurado ka bang gusto mong mag-unsubscribe sa newsletter para sa <span className="font-medium">{email}</span>?
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to unsubscribe {email}?
            </p>
            <button
              onClick={handleUnsubscribe}
              className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Kumpirmahin ang pag-unsubscribe Confirm Unsubscribe
            </button>
            <Link
              href="/"
              className="block mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Kanselahin Cancel
            </Link>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Pinoproseso... Processing...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Matagumpay na nag-unsubscribe</h2>
            <p className="text-gray-500 mb-2">Successfully Unsubscribed</p>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-gray-500 text-sm mb-6">
              Hindi ka na makakatanggap ng newsletter email mula sa amin.
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Bumalik sa home page Return Home
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Nabigo ang pag-unsubscribe</h2>
            <p className="text-gray-500 mb-2">Unsubscribe Failed</p>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-gray-500 text-sm mb-6">
              Pakisubukan muli o makipag-ugnayan sa contact@tinigngfilipinoamerikano.us
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Bumalik sa home page Return Home
            </Link>
          </div>
        )}

        {status === 'pending' && (!email || !token) && !error && (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hindi wastong link</h2>
            <p className="text-gray-500 mb-2">Invalid Link</p>
            <p className="text-gray-600 mb-6">
              Ang unsubscribe link na ito ay hindi wasto o expired na. Mangyaring gamitin ang link mula sa iyong email.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              This unsubscribe link is invalid or expired. Please use the link from your email.
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Bumalik sa home page Return Home
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">
            © 2025 Tinig ng Filipino Amerikano Filipino American Voices
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
