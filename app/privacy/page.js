// app/privacy/page.js - Privacy Policy Page
'use client';

import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
              <a
                href="mailto:contact@tinigngfilipinoamerikano.us"
                className="text-gray-700 hover:text-emerald-600 text-sm font-medium"
              >
                Makipag-ugnayan
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-900">Patakaran sa Privacy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bumalik sa home page</span>
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Patakaran sa Privacy
            </h1>
            <p className="text-xl text-gray-600">
              Ang pagprotekta sa iyong privacy ay aming pangunahing responsibilidad
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Huling na-update: Enero 2025
            </p>
          </header>

          {/* Privacy Commitment */}
          <div className="bg-emerald-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Aming pangako sa privacy</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ang Tinig ng Filipino Amerikano (Filipino American Voices) ay nakatuon sa pagprotekta sa privacy ng mga gumagamit. Ipinapaliwanag ng patakaran sa privacy na ito kung paano namin kinokolekta, ginagamit, iniimbak, at pinoprotektahan ang personal na impormasyon. Mahigpit kaming sumusunod sa mga kaugnay na batas sa privacy tulad ng California Consumer Privacy Act (CCPA), Colorado Privacy Act (CPA), at General Data Protection Regulation (GDPR).
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-8 h-8 text-emerald-600 mr-3" />
              Impormasyong kinokolekta namin
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Awtomatikong kinokolektang impormasyon</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Data ng pag-access:</strong> IP address, uri ng browser, operating system, oras ng pag-access</li>
                  <li>• <strong>Paggamit ng website:</strong> Mga pahinang binisita, tagal ng pananatili, pag-click, lalim ng scroll</li>
                  <li>• <strong>Impormasyon ng device:</strong> Uri ng device, resolusyon ng screen, mga setting ng wika</li>
                  <li>• <strong>Mga referral source:</strong> Mga link at social media platform na nagdala sa aming website</li>
                </ul>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Impormasyong ibinibigay mo nang direkta</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Newsletter subscription:</strong> Email address (kapag pumili kang mag-subscribe)</li>
                  <li>• <strong>Contact form:</strong> Pangalan, email, nilalaman ng mensahe</li>
                  <li>• <strong>Mga news tip:</strong> Impormasyon sa balita at contact information na ibinibigay mo</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Interaksyon sa social media</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pag-share:</strong> Anonymous na estadistika tungkol sa pag-share ng artikulo sa mga platform tulad ng Facebook, WhatsApp</li>
                  <li>• <strong>Platform detection:</strong> Pagtukoy sa pinagmulan ng pag-access (social media link, atbp.)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-8 h-8 text-emerald-600 mr-3" />
              Layunin ng paggamit ng impormasyon
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pagpapabuti ng website</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Pag-optimize ng nilalaman at karanasan ng gumagamit sa pamamagitan ng pagsusuri ng pag-uugali</li>
                  <li>• Pagbibigay ng angkop na balita sa pamamagitan ng pag-unawa sa mga interes ng mambabasa</li>
                  <li>• Pag-aayos ng mga teknikal na isyu at pag-optimize ng performance ng website</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalisasyon ng nilalaman</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Pagmumungkahi ng kaugnay na artikulo batay sa kasaysayan ng pagbabasa</li>
                  <li>• Pag-optimize ng karanasan sa mobile at desktop</li>
                  <li>• Suporta sa maraming wika at lokal na nilalaman</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Serbisyo ng newsletter</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Pagpapadala ng buod ng balita at mahahalagang update (para lamang sa mga subscriber)</li>
                  <li>• Pagsagot sa mga tanong at news tip ng gumagamit</li>
                  <li>• Mahahalagang anunsyo at mga update sa patakaran ng website</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Proteksyon ng seguridad</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Pagpigil sa mga malisyosong atake at spam</li>
                  <li>• Pagsunod sa mga legal na kinakailangan at regulasyon</li>
                  <li>• Pagprotekta sa seguridad ng website at mga gumagamit</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-8 h-8 text-green-600 mr-3" />
              Seguridad ng data
            </h2>

            <div className="bg-green-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Encrypted transmission:</strong> Gumagamit kami ng SSL/TLS encryption technology para protektahan ang seguridad ng data transmission.
                </p>

                <p>
                  <strong>Secure na pag-iimbak:</strong> Ang data ay iniimbak sa mga secure na server na sumusunod sa industry standards na may firewall at intrusion detection system.
                </p>

                <p>
                  <strong>Access control:</strong> Ang mga awtorisadong empleyado lamang ang may access sa data ng gumagamit at lahat ng pag-access ay naka-log nang detalyado.
                </p>

                <p>
                  <strong>Regular na pagsusuri:</strong> Nagsasagawa kami ng regular na security audit at vulnerability assessment para matiyak na epektibo ang mga hakbang sa proteksyon ng data.
                </p>

                <p>
                  <strong>Data minimization:</strong> Kinokolekta lamang namin ang kinakailangang impormasyon at regular na dinedelet ang hindi kinakailangang data.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mga serbisyo ng third-party</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Analytics</h3>
                <p className="text-gray-700 mb-3">
                  Gumagamit kami ng Google Analytics para suriin ang website traffic at pag-uugali ng gumagamit. Ang Google ay maaaring kumuha ng anonymous na data ng paggamit.
                </p>
                <p className="text-sm text-gray-600">
                  Maaari kang mag-install ng <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-600 hover:text-emerald-700" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a> para i-disable ang data collection.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Supabase</h3>
                <p className="text-gray-700">
                  Gumagamit kami ng Supabase bilang database service provider para mag-imbak ng nilalaman ng artikulo at analytics data. Ang Supabase ay sumusunod sa SOC 2 Type II standards.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Vercel</h3>
                <p className="text-gray-700">
                  Ang website ay naka-host sa Vercel platform, na maaaring kumuha ng access logs at performance data para sa operasyon ng website.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mga karapatan mo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Karapatan sa pag-access</h3>
                <p className="text-gray-700 text-sm">
                  May karapatan kang malaman kung anong impormasyon ang nakolekta namin tungkol sa iyo.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Karapatan sa pagwawasto</h3>
                <p className="text-gray-700 text-sm">
                  Maaari kang humiling ng pagwawasto ng hindi tamang personal na impormasyon.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Karapatan sa pagbura</h3>
                <p className="text-gray-700 text-sm">
                  Maaari kang humiling ng pagbura ng personal na impormasyon sa loob ng saklaw na pinapahintulutan ng batas.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Karapatan sa pagtanggi</h3>
                <p className="text-gray-700 text-sm">
                  Maaari kang tumanggi sa ilang uri ng pagproseso ng data tulad ng marketing information.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Patakaran sa Cookie</h2>

            <div className="bg-emerald-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Gumagamit kami ng cookies at katulad na teknolohiya para pagbutihin ang iyong karanasan sa pag-browse. Ginagamit ang cookies para sa mga sumusunod na layunin:
              </p>

              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Pagbibigay ng pangunahing functionality ng website</li>
                <li>• Pag-alala ng mga setting ng gumagamit</li>
                <li>• Pagkolekta ng anonymous na estadistika ng paggamit</li>
                <li>• Pagpapabuti ng performance ng website</li>
              </ul>

              <p className="text-sm text-gray-600">
                Maaari mong kontrolin ang paggamit ng cookies sa pamamagitan ng mga setting ng iyong browser. Ang pag-disable ng cookies ay maaaring makaapekto sa ilang functionality ng website.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mga update sa patakaran</h2>
            <p className="text-gray-700 mb-4">
              Maaari naming i-update ang Patakaran sa Privacy na ito paminsan-minsan. Ang mga mahahalagang pagbabago ay ipapaalam sa isang madaling makitang lugar sa website at sa pamamagitan ng email para sa mga subscriber.
            </p>
            <p className="text-gray-700">
              Ang patuloy na paggamit ng website ay itinuturing na pagsang-ayon sa na-update na Patakaran sa Privacy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Makipag-ugnayan sa amin</h2>
            <p className="text-lg text-gray-700 mb-6">
              Kung mayroon kang mga tanong tungkol sa Patakaran sa Privacy na ito o nais mong gamitin ang iyong mga karapatan, mangyaring makipag-ugnayan:
            </p>

            <div className="space-y-2 text-gray-600">
              <p>Mga tanong sa privacy: <a href="mailto:privacy@tinigngfilipinoamerikano.us" className="text-emerald-600 hover:text-emerald-700">privacy@tinigngfilipinoamerikano.us</a></p>
              <p>Pangkalahatang pakikipag-ugnayan: <a href="mailto:contact@tinigngfilipinoamerikano.us" className="text-emerald-600 hover:text-emerald-700">contact@tinigngfilipinoamerikano.us</a></p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-xs leading-none tracking-wide">Tinig</span>
                  <span className="text-white font-bold text-xs leading-none tracking-wide">FAV</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Tinig ng Filipino Amerikano
                  </h3>
                  <p className="text-sm text-gray-400">Filipino American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Naghahatid ng mahahalagang balita para sa komunidad ng Filipino American. Independiyenteng balita na nakatuon sa mga isyung may epekto sa ating komunidad.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tungkol sa Amin</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Aming misyon</Link></li>
                <li><a href="mailto:contact@tinigngfilipinoamerikano.us" className="text-gray-400 hover:text-white">Makipag-ugnayan</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Patakaran sa privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Mga tuntunin ng paggamit</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Tinig ng Filipino Amerikano. Lahat ng karapatan ay nakalaan.
              <span className="text-xs opacity-70 ml-2">Sa ilalim ng Asian American Voices Media, Inc.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
