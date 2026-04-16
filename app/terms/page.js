// app/terms/page.js - Terms of Use Page
'use client';

import React from 'react';
import { ArrowLeft, FileText, AlertCircle, Scale, Users } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <span className="text-gray-900">Mga Tuntunin ng Paggamit</span>
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
              Mga Tuntunin ng Paggamit
            </h1>
            <p className="text-xl text-gray-600">
              Mga tuntunin at kondisyon ng paggamit ng website ng Tinig ng Filipino Amerikano
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Huling na-update: Enero 2025
            </p>
          </header>

          {/* Introduction */}
          <div className="bg-emerald-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Pagtanggap sa mga tuntunin</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Salamat sa paggamit ng website ng Tinig ng Filipino Amerikano (Filipino American Voices). Sa pamamagitan ng pag-access at paggamit ng website na ito, sumasang-ayon ka na sumunod sa mga sumusunod na tuntunin ng paggamit. Kung hindi ka sumasang-ayon sa mga tuntuning ito, mangyaring huwag gamitin ang website. May karapatan kaming baguhin ang mga tuntuning ito anumang oras.
            </p>
          </div>

          {/* Acceptable Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-8 h-8 text-emerald-600 mr-3" />
              Pinapahintulutang paggamit
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mga pinapahintulutang aksyon</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pagbabasa at pagbabahagi ng nilalaman para sa personal, hindi komersyal na layunin</li>
                  <li>• Pagbabahagi ng mga link ng artikulo sa social media (kailangang banggitin ang pinagmulan)</li>
                  <li>• Pagsipi ng nilalaman ng artikulo para sa akademikong pananaliksik (kailangang banggitin ang pinagmulan)</li>
                  <li>• Pag-subscribe sa newsletter</li>
                  <li>• Pakikipag-ugnayan sa pamamagitan ng contact form</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mga ipinagbabawal na aksyon</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Hindi awtorisadong pagkopya, pamamahagi, o pag-edit ng nilalaman</li>
                  <li>• Paggamit ng nilalaman para sa komersyal na layunin (kailangan ng nakasulat na pahintulot)</li>
                  <li>• Mass scraping ng website content gamit ang mga automated tool</li>
                  <li>• Pag-upload ng maling impormasyon, mapanirang-puri, hate speech, o ilegal na nilalaman</li>
                  <li>• Pagtatangka na sirain ang seguridad ng website o makagambala sa normal na operasyon</li>
                  <li>• Pagpanggap bilang Tinig ng Filipino Amerikano o empleyado nito</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="w-8 h-8 text-purple-600 mr-3" />
              Mga karapatan sa intellectual property
            </h2>

            <div className="bg-purple-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Proteksyon ng copyright:</strong> Lahat ng nilalaman sa website na ito (mga artikulo, larawan, logo, disenyo, atbp.) ay protektado ng batas sa copyright. Hindi maaaring kopyahin o ipamahagi nang walang nakasulat na pahintulot, maliban sa fair use ayon sa batas.
                </p>

                <p>
                  <strong>Mga trademark:</strong> Ang "Tinig ng Filipino Amerikano", "Filipino American Voices" at mga kaugnay na logo ay mga rehistradong trademark namin. Bawal ang hindi awtorisadong paggamit.
                </p>

                <p>
                  <strong>Nilalaman ng third-party:</strong> Iginagalang namin ang mga karapatan sa intellectual property ng iba. Kung naniniwala kang may nilalaman kaming lumalabag sa iyong mga karapatan, mangyaring makipag-ugnayan kaagad.
                </p>

                <p>
                  <strong>Nilalaman ng gumagamit:</strong> Ang nilalaman na ibinibigay mo sa amin (mga komento, news tip, atbp.) ay nananatiling pag-aari mo, ngunit binibigyan mo kami ng karapatang gamitin, i-edit, at i-publish ito.
                </p>
              </div>
            </div>
          </div>

          {/* Content and Accuracy */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Katumpakan ng nilalaman</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Aming pagsisikap</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Nagsisikap na matiyak na tumpak at napapanahon ang impormasyon</li>
                  <li>• Lahat ng artikulo ay dumadaan sa proseso ng editorial review</li>
                  <li>• Mabilis na pagwawasto ng mga natuklasang error</li>
                  <li>• Pagsunod sa mga propesyonal at etikal na pamantayan ng pamamahayag</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Disclaimer</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Ang impormasyon ay maaaring maglaman ng mga error o luma nang nilalaman</li>
                  <li>• Hindi bumubuo ng propesyonal na payo (legal, medikal, pinansyal, atbp.)</li>
                  <li>• Ang mga external na link ay hindi kumakatawan sa aming pananaw</li>
                  <li>• Dapat i-verify ng mga gumagamit ang mahahalagang impormasyon</li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Alituntunin ng pag-uugali ng gumagamit</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Paggalang sa iba</h3>
                <p className="text-gray-700">
                  Mangyaring maging magalang at may paggalang kapag nakikipag-ugnayan sa amin. Hindi namin tinatanggap ang anumang anyo ng panliligalig, diskriminasyon, o hate speech.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tamang impormasyon</h3>
                <p className="text-gray-700">
                  Mangyaring i-verify ang katumpakan kapag nagbibigay ng balita o contact information. Ang sadyang pagbibigay ng maling impormasyon ay maaaring magdulot ng legal na kahihinatnan.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pagsunod sa batas</h3>
                <p className="text-gray-700">
                  Sa paggamit ng aming mga serbisyo, kailangan mong sumunod sa lahat ng naaangkop na lokal, state, federal, at internasyonal na batas at regulasyon.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy and Data */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy at data</h2>

            <div className="bg-emerald-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Nakatuon kami sa pagprotekta ng iyong privacy. Ang aming mga kasanayan sa pagkolekta at paggamit ng data ay detalyadong inilarawan sa aming <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">Patakaran sa Privacy</Link>.
              </p>

              <p className="text-gray-700">
                Sa paggamit ng website na ito, sumasang-ayon ka sa pagkolekta at paggamit ng impormasyon ayon sa Patakaran sa Privacy.
              </p>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="w-8 h-8 text-emerald-600 mr-3" />
              Disclaimer ng pananagutan
            </h2>

            <div className="bg-red-50 rounded-lg p-8">
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Ibinibigay "as is":</strong> Ang website at lahat ng nilalaman ay ibinibigay "as is", walang anumang warranty, maging express o implied.
                </p>

                <p>
                  <strong>Walang garantiya:</strong> Hindi namin ginagarantiya na ang website ay gagana nang walang pagkakaputol o walang mga error o virus.
                </p>

                <p>
                  <strong>Mga link ng third-party:</strong> Ang aming website ay maaaring maglaman ng mga link sa mga third-party na website. Hindi kami responsable sa nilalaman o mga kasanayan sa privacy ng mga website na iyon.
                </p>

                <p>
                  <strong>Mga teknikal na isyu:</strong> Ang website ay maaaring pansamantalang hindi ma-access dahil sa mga teknikal na problema o maintenance. Magsisikap kaming mabawasan ang mga pagkagambalang ito.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitasyon ng pananagutan</h2>

            <div className="bg-gray-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Sa pinakamalawak na saklaw na pinapahintulutan ng batas, ang Tinig ng Filipino Amerikano at mga empleyado, kasosyo ay hindi mananagot para sa:
              </p>

              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Direkta, hindi direkta, espesyal, o consequential na pinsala dahil sa paggamit o kawalan ng kakayahang gamitin ang website</li>
                <li>• Pagkawala dahil sa mga error o kakulangan sa impormasyon</li>
                <li>• Mga problema dahil sa nilalaman o serbisyo ng third-party</li>
                <li>• Pagkawala ng data o mga system error</li>
                <li>• Pagkawala dahil sa cyber attack o mga teknikal na problema</li>
              </ul>

              <p className="text-sm text-gray-600">
                Ang ilang hurisdiksyon ay hindi pinapahintulutan ang limitasyon ng pananagutan, kaya ang mga limitasyong ito ay maaaring hindi naaangkop sa iyo.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pagwawakas ng serbisyo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Aming karapatan</h3>
                <p className="text-gray-700 text-sm">
                  May karapatan kaming wakasan o suspindihin ang iyong access sa website anumang oras nang walang paunang abiso, lalo na sa kaso ng paglabag sa mga tuntuning ito.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Iyong karapatan</h3>
                <p className="text-gray-700 text-sm">
                  Maaari kang tumigil sa paggamit ng aming website anumang oras. Kung nag-subscribe ka sa isang serbisyo, maaari kang mag-unsubscribe anumang oras.
                </p>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Namamahalang batas</h2>

            <div className="bg-emerald-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Ang mga Tuntunin ng Paggamit na ito ay pinamamahalaan ng mga batas ng Estado ng Colorado, nang hindi nag-aaplay ng mga prinsipyo ng conflict of laws. Lahat ng mga hindi pagkakasundo ay lulutasin sa mga korte sa Colorado.
              </p>

              <p className="text-gray-700">
                Kung ang anumang bahagi ng mga tuntuning ito ay itinuring na hindi wasto o hindi maipatupad, ang natitirang mga bahagi ay mananatiling may ganap na bisa.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mga pagbabago sa mga tuntunin</h2>

            <div className="bg-green-50 rounded-lg p-8">
              <p className="text-gray-700 mb-4">
                Maaari naming i-update ang mga Tuntunin ng Paggamit na ito paminsan-minsan. Ang mga mahahalagang pagbabago ay ipapaalam sa isang madaling makitang lugar sa website at sa pamamagitan ng email para sa mga subscriber.
              </p>

              <p className="text-gray-700 mb-4">
                Ang mga pagbabago ay magkakabisa kaagad pagkatapos ma-post. Ang patuloy na paggamit ng website ay itinuturing na pagsang-ayon sa mga binagong tuntunin.
              </p>

              <p className="text-sm text-gray-600">
                Mangyaring suriin ang pahinang ito paminsan-minsan para malaman ang mga pagbabago.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Makipag-ugnayan sa amin</h2>
            <p className="text-lg text-gray-700 mb-6">
              Kung mayroon kang mga tanong tungkol sa mga Tuntunin ng Paggamit na ito, mangyaring makipag-ugnayan:
            </p>

            <div className="space-y-2 text-gray-600">
              <p>Legal: <a href="mailto:legal@tinigngfilipinoamerikano.us" className="text-emerald-600 hover:text-emerald-700">legal@tinigngfilipinoamerikano.us</a></p>
              <p>Pangkalahatang pakikipag-ugnayan: <a href="mailto:contact@tinigngfilipinoamerikano.us" className="text-emerald-600 hover:text-emerald-700">contact@tinigngfilipinoamerikano.us</a></p>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Salamat sa pagpili ng Tinig ng Filipino Amerikano. Nakatuon kami sa paghahatid ng de-kalidad na serbisyo ng balita para sa komunidad ng Filipino American.
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
