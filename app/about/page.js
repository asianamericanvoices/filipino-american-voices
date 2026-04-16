// app/about/page.js - Our Mission Page
'use client';

import React from 'react';
import { ArrowLeft, Users, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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
            <span className="text-gray-900">Aming Misyon</span>
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
              Aming Misyon
            </h1>
            <p className="text-xl text-gray-600">
              Naghahatid ng mahahalagang balita para sa komunidad ng Filipino American
            </p>
          </header>

          {/* Mission Statement */}
          <div className="bg-emerald-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pahayag ng Misyon</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ang Tinig ng Filipino Amerikano ay isang independiyenteng media platform na nakabase sa United States, na nagsisilbi sa komunidad ng Filipino American. Mula sa pananaw ng Amerika, nagbibigay kami ng tumpak at napapanahong balita tungkol sa mga pampublikong isyu ng US, kabilang ang pulitika, kalusugan, edukasyon, imigrasyon, at patakarang pang-ekonomiya. Ang aming layunin ay palakasin ang civic awareness at palawakin ang tinig at perspektiba ng mga Filipino American sa pampublikong buhay ng Amerika.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Komunidad Muna</h3>
              <p className="text-gray-700">
                Palagi naming inuuna ang mga pangangailangan at interes ng komunidad ng Filipino American, tinitiyak na ang aming coverage ay may kaugnayan sa komunidad.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Patas at Walang Kinikilingan</h3>
              <p className="text-gray-700">
                Sumusunod kami sa mga propesyonal na pamantayan ng pamamahayag, nagbibigay ng balansyadong, tumpak, at fact-based na balita na walang impluwensya ng politikal o komersyal na interes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pamana ng Kultura</h3>
              <p className="text-gray-700">
                Iginagalang at isinusulong namin ang pagsasama ng kulturang Filipino at mga halaga ng Amerika, nagtatayo ng magkakaibang at mapagbukas na diyalogo sa komunidad.
              </p>
            </div>
          </div>

          {/* What We Cover */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Saklaw ng Aming Coverage</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pulitika at Patakaran</h3>
                <p className="text-gray-700">
                  Nakatuon sa mga pagbabago sa patakaran na nakakaapekto sa mga Filipino American tulad ng batas sa imigrasyon, patakaran sa edukasyon, at reporma sa kalusugan.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pag-unlad ng Komunidad</h3>
                <p className="text-gray-700">
                  Nag-uulat tungkol sa mga tagumpay, hamon, at pagkakataon para sa pag-unlad ng komunidad ng Filipino American, naghihikayat ng komunikasyon at kooperasyon sa loob ng komunidad.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Edukasyon at Karera</h3>
                <p className="text-gray-700">
                  Malalimang pag-uulat tungkol sa mga mapagkukunan sa edukasyon, pag-unlad ng karera, at mga pagkakataong pang-ekonomiya, nagbibigay ng praktikal na impormasyon para sa mga miyembro ng komunidad.
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kultura at Pamumuhay</h3>
                <p className="text-gray-700">
                  Ipinapakilala ang mayaman at magkakaibang kultural na buhay at mga aktibidad ng komunidad ng Filipino American, pinapanatili at pinauunlad ang magagandang tradisyon.
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Aming Pangako</h2>

            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Katumpakan:</strong> Nakatuon kami sa pagbibigay ng tumpak at napapatunayan na impormasyon, bawat ulat ay dumadaan sa mahigpit na fact-checking.
              </p>

              <p>
                <strong>Kalayaan:</strong> Pinapanatili namin ang editorial independence, walang impluwensya ng anumang politikal na organisasyon, komersyal na interes, o panlabas na presyon.
              </p>

              <p>
                <strong>Transparency:</strong> Pinapanatili namin ang bukas at transparent na editorial policy at proseso ng pagwawasto, tinitiyak ang katumpakan at kredibilidad ng balita.
              </p>

              <p>
                <strong>Pakikinig:</strong> Aktibo kaming nakikinig sa tinig ng komunidad, tinatanggap ang feedback mula sa mga mambabasa at nagsisikap na pagbutihin ang balita at serbisyo.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-filipino">Makipag-ugnayan sa Amin</h2>
            <p className="text-lg text-gray-700 mb-6 font-filipino">
              Kung mayroon kang balita, opinyon, mungkahi, o nais makipagtulungan, huwag mag-atubiling makipag-ugnayan sa amin anumang oras.
            </p>

            <div className="space-y-2 text-gray-600">
              <p className="font-filipino">Email: <a href="mailto:contact@tinigngfilipinoamerikano.us" className="text-emerald-600 hover:text-emerald-700">contact@tinigngfilipinoamerikano.us</a></p>
              <p className="font-filipino">Magpadala ng tip: <a href="mailto:tips@tinigngfilipinoamerikano.us" className="text-emerald-600 hover:text-emerald-700">tips@tinigngfilipinoamerikano.us</a></p>
            </div>
          </div>

          {/* About AAVM */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 leading-relaxed font-filipino">
              Ang Asian American Voices Media (AAVM) ay isang non-partisan na media organization na nakabase sa United States, nagpa-publish ng multi-language na mga brand na nagsisilbi sa komunidad ng Asian American. Ang AAVM ay independiyente mula sa mga dayuhang gobyerno at partido, at pinapanatili ang editorial independence sa lahat ng platform.
            </p>
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
                  <span className="text-white font-bold text-[7px] leading-none">Tinig ng</span>
                  <span className="text-white font-bold text-[7px] leading-none">Filipino</span>
                  <span className="text-white font-bold text-[7px] leading-none">Amerikano</span>
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
            <p className="font-filipino">&copy; 2025 Tinig ng Filipino Amerikano. Lahat ng karapatan ay nakalaan.</p>
            <p className="font-filipino text-xs opacity-70 mt-2">Inilathala sa United States ng Asian American Voices Media (AAVM), isang non-profit at non-partisan na organisasyon ng US.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
