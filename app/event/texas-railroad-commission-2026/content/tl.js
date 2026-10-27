// Texas Railroad Commission voter guide — TAGALOG/FILIPINO edition (FAV default).
// Line-for-line translation of ./en.js (the English master). Candidate positions
// keep the same length, order and footnotes as the master; quoted campaign language
// is translated inside quotation marks. Taglish is used where the English term is
// what readers use (Railroad Commission, early voting, setback, flaring).

const tl = {
  edition: {
    lang: 'tl',
    locale: 'tl-PH',
    ogLocale: 'tl_PH',
    titleLanguage: 'tagalog', // translatedTitles key for story headlines
  },

  meta: {
    title: 'Texas Railroad Commission: ano ang nasa inyong balota',
    description: 'Isang walang-kinikilingang gabay sa botante para sa halalan ng Texas Railroad Commission sa Nobyembre 3, 2026: ano ang ginagawa ng Komisyon, paano bumoto, at ang tatlong kandidato nang magkakatabi.',
  },

  site: {
    contact: 'Makipag-ugnayan',
    hubBarLabel: '🗳️ Mahahalagang Halalan:',
    texasHub: '🗳️ Halalan sa Texas 2026',
    thisPage: 'Texas Railroad Commission 2026',
    specialReport: 'Espesyal na Ulat',
    categories: {
      all: 'Lahat ng Balita', General: 'Pangkalahatan', 'US Politics': 'Pulitika ng US', Healthcare: 'Kalusugan',
      Education: 'Edukasyon', Immigration: 'Imigrasyon', Economy: 'Ekonomiya', Culture: 'Kultura', Sports: 'Palakasan',
    },
    votingButton: '🗳️ Impormasyon sa pagboto ng Texas',
    votingSubline: 'Impormasyon sa pagboto para sa mga residente ng Texas • Pagpapatala • Lokasyon ng presinto • Pangkalahatang Halalan Nob 3',
    newsletterHeading: 'Mag-subscribe sa Newsletter',
    newsletterBody: 'Tumanggap ng mga balitang nakakaapekto sa komunidad ng Filipino Amerikano sa inyong email.',
    newsletterPlaceholder: 'Ilagay ang inyong email',
    newsletterButton: 'Mag-subscribe',
    newsletterLoading: 'Nag-subscribe...',
    newsletterInvalid: 'Mangyaring maglagay ng wastong email address',
    newsletterError: 'Hindi nagtagumpay ang pag-subscribe. Subukan muli mamaya',
    loadMore: 'Magpakita pa ng mga artikulo',
    footerTagline: 'Nagdadala ng mahahalagang kuwento para sa komunidad ng Filipino Amerikano.',
    footerAbout: 'Tungkol sa Amin',
    footerMission: 'Ang aming misyon',
    footerPrivacy: 'Patakaran sa Privacy',
    footerTerms: 'Mga Tuntunin ng Paggamit',
    footerRights: '© 2026 Tinig ng Filipino Amerikano. Lahat ng karapatan ay nakalaan.',
  },

  ui: {
    carouselLabel: 'Ang halalan sa Texas Railroad Commission sa isang sulyap',
    slideOf: (n, total) => `Slide ${n} ng ${total}`,
    prevSlide: 'Nakaraang slide',
    nextSlide: 'Susunod na slide',
    goToSlide: (n) => `Pumunta sa slide ${n}`,
    listen: 'Pakinggan ang paliwanag na ito',
    original: 'Orihinal',
    originalHeadline: 'Orihinal na pamagat',
    candidateColumn: 'Kandidato',
    sourcesHeading: 'Mga Pinagmulan',
    lastUpdatedLabel: 'Huling na-update',
    loading: 'Naglo-load…',
    noStories: 'Wala pang mga balita.',
    readFullAnswer: 'Basahin ang buong sagot',
    readFullProfile: 'Basahin ang buong profile',
    showLess: 'Itago',
    compareByTopic: 'Paghambingin ayon sa paksa',
  },

  header: {
    title: 'Texas Railroad Commission: ano ang nasa inyong balota',
    dateLine: 'Araw ng Halalan: Martes, Nobyembre 3 · Maagang pagboto (early voting): Oktubre 19–30',
  },

  slides: [
    {
      title: 'Sino ang tumatakbo bilang Texas Railroad Commissioner',
      question: 'Nakalista ang mga kandidato ayon sa pagkakasunod-sunod sa balota ng Texas, na itinakda ng batas ng estado, hindi ng Tinig ng Filipino Amerikano.',
      // Paglalarawan sa kandidato mula sa Q&A ng Community Impact [5]
      candidates: [
        'Si Bo ay isang negosyante at ikatlong henerasyong oilman na may tatlong dekadang karanasan sa industriya.',
        'Si Jon Rosenthal ay isang inhinyero at state representative para sa Northwest Houston.',
        'Dating computer programmer, ngayon ay retirado na.',
      ],
      note: 'Mga paglalarawan sa kandidato, hinango mula sa Q&A ng Community Impact, Ago. 25, 2026 [5][12a] · Isinalin ng Tinig ng Filipino Amerikano',
    },
    // Slides 2-5: buong sagot ng bawat kandidato sa iisang tanong ng Community Impact [5],
    // isinalin ng AAVM. Ballot order.
    {
      eyebrow: 'Mga pangunahing posisyon · Sa sarili nilang salita',
      title: 'Mga pangunahing prayoridad',
      question: 'Ano ang magiging pangunahing prayoridad ninyo kung mahalal?',
      quotes: true,
      candidates: [
        'Ang aking mga pangunahing prayoridad ay ayusin ang kawalang-kahusayan sa administrasyon at ang sobrang lawak na regulasyon upang makapag-produce ang mga operator ng enerhiya sa mas abot-kayang halaga para sa mga mamimili, habang pinoprotektahan ang mga may-ari ng lupa at nagseselyo ng mas maraming abandonadong balon.',
        'Dapat unahin ng Railroad Commission ang mga mamamayan ng Texas kaysa sa malalaking interes ng pera, ngunit kulang ito sa sapat na rekurso para gawin ito. Isusulong ko ang dagdag na pondo para ipatupad ang mga umiiral na patakaran at para maging mas tumutugon sa mga komunidad. Dapat nating pabilisin ang mga permit para sa mga sumusunod sa batas at magpataw ng mabibigat na multa sa mga malalang lumalabag.',
        'Gusto kong lubos na igalang ang karapatan sa ari-arian ng mga may-ari ng lupa, at tiyaking laging nauuna ang karapatan sa ari-arian kaysa sa interes ng industriya. Mas mahusay na transparency. Pasimplehin at linisin ang 100 taon ng mga regulasyon.',
      ],
      note: 'Mga sagot ng mga kandidato sa iisang questionnaire ng Community Impact, Ago. 25, 2026 [5] · Isinalin ng Tinig ng Filipino Amerikano',
    },
    {
      eyebrow: 'Mga pangunahing posisyon · Sa sarili nilang salita',
      title: 'Pagreregula ng langis at gas',
      question: 'Ano ang kailangang gawin ng Railroad Commission upang pinakamabisang ma-regulate ang industriya ng langis, gas at mga kaugnay nito sa Texas?',
      quotes: true,
      candidates: [
        "Ang Texas ay isang malaki at magkakaibang estado. Sa pag-aangkop ng mga regulasyon at operasyon ng Komisyon sa partikular na kapaligiran at pangangailangan sa iba't ibang bahagi ng ating estado, sa halip na gumamit ng iisang patakaran para sa mga operator na iba-iba ang laki sa iba't ibang kapaligiran, magagawa nating mas episyente ang produksyon habang responsable pa rin ito.",
        'Dapat nating pasimplehin ang mga proseso at bawasan ang oras at gastos ng pagkuha ng permit para sa mga sumusunod sa batas, upang hikayatin at itaguyod ang mga responsableng operator. At dapat tayong magpataw ng mabibigat na multa at mahigpit na mga kinakailangan sa mga malalang lumalabag. Dapat may kahihinatnan ang paglabag sa batas, at hindi natin dapat gantimpalaan ang mga kumpanyang kumikilos nang labas sa legal na hangganan.',
        'Kailangan natin ng mas mahusay na transparency, at iwasan ang ‘regulatory capture’. Ang trabaho ng RRC ay hindi itaguyod ang industriya ng langis at gas, kundi gumawa ng mga desisyong nagtitiyak sa karapatan sa ari-arian ng lahat ng Texan. Kailangan natin ng mas mabuting balanse sa pagitan ng surface rights at mineral rights.',
      ],
      note: 'Mga sagot ng mga kandidato sa iisang questionnaire ng Community Impact, Ago. 25, 2026 [5] · Isinalin ng Tinig ng Filipino Amerikano',
    },
    {
      eyebrow: 'Mga pangunahing posisyon · Sa sarili nilang salita',
      title: 'Kapaligiran at kaligtasan',
      question: 'Anong mga hakbang ang gagawin ninyo upang harapin ang mga panganib sa kapaligiran at ang kaligtasan ng imprastruktura ng langis, gas at pipeline ng estado?',
      quotes: true,
      candidates: [
        'Bilang isang rancher, naranasan ko na ang mga isyung pangkapaligiran sa sarili kong lupain. Nauunawaan ko ang pananaw ng may-ari ng lupa at makikipagtulungan ako sa industriya at sa mga may-ari ng lupa upang makahanap ng mga solusyong nagpoprotekta sa ating lupa at kapaligiran habang pinahihintulutang makapag-produce ng enerhiya nang episyente.',
        'Isusulong ko ang pondo para lubhang pabilisin ang pagseselyo ng mga balon at ang paglilinis ng kapaligiran. At makikipagtulungan ako sa mga komunidad at stakeholder ng industriya upang wakasan ang nakagawiang flaring, i-weatherize ang mga pasilidad ng natural gas, magpatupad ng mas mahigpit na setback standards, at iba pang makatwirang hakbang upang mabawasan ang mga panganib sa kapaligiran habang tinitiyak ding patuloy na umuunlad ang mahalagang industriyang ito.',
        'Dapat madaling makakuha ng bayad-pinsala (restitution) sa mga kaso ng pinsala sa ari-arian mula sa mga lindol, pagtagas ng maruming tubig, at iba pa. Ang insurance, bonding, at mga pondo para sa paglilinis na sinusuportahan ng industriya ay pawang mga paraan para suportahan iyon.',
      ],
      note: 'Mga sagot ng mga kandidato sa iisang questionnaire ng Community Impact, Ago. 25, 2026 [5] · Isinalin ng Tinig ng Filipino Amerikano',
    },
    {
      eyebrow: 'Mga pangunahing posisyon · Sa sarili nilang salita',
      title: 'Renewable energy',
      question: 'Ano ang inyong pananaw sa hinaharap ng renewable energy sa Texas?',
      quotes: true,
      candidates: [
        'Kung makatutulong ang renewables na matugunan ang ating pangangailangan sa enerhiya, mabuti iyon. Naniniwala akong dapat kumikita ang mga proyektong ito nang mag-isa, nang walang insentibong pinopondohan ng mga nagbabayad ng buwis. Maaaring maging mas matagumpay ang mga proyektong ito sa hinaharap habang umuunlad ang teknolohiya.',
        'Sinusuportahan ko ang all-of-the-above na diskarte sa produksyon ng enerhiya sa Texas. Sa totoo lang – kailangan natin ang lahat ng kuryenteng makukuha natin. Kahit bago pa isaalang-alang ang mga data center, hinihingi ng mabilis na paglago ng lahat ng iba pang industriya at ng populasyon ang ganitong diskarte. Dapat nating itaguyod ang lahat ng produksyon ng enerhiya, kabilang ang natural gas, geothermal, at mga renewable source.',
        'Maaaring maging mahusay ang renewable energy, ngunit kailangan itong makipagkumpitensya sa malayang merkado laban sa fossil fuels. Hindi dapat paboran ng ating gobyerno at mga regulator ang isang uri kaysa sa iba.',
      ],
      note: 'Mga sagot ng mga kandidato sa iisang questionnaire ng Community Impact, Ago. 25, 2026 [5] · Isinalin ng Tinig ng Filipino Amerikano',
    },
    {
      title: 'Paano bumoto',
      bullets: [
        'Maagang pagboto: Oktubre 19–30',
        'Araw ng Halalan: Martes, Nobyembre 3, 7 a.m. hanggang 7 p.m.',
        'Magdala ng photo ID',
        'Hanapin ang inyong lugar ng botohan at sample ballot sa website ng elections office ng inyong county o sa VoteTexas.gov',
      ],
    },
  ],

  latest: {
    heading: 'Pangunahing balita',
    count: 4,
    note: 'Ina-update ang kahong ito habang may lumalabas na balita tungkol sa sinumang kandidato sa halalang ito.',
  },

  explainer: {
    heading: 'Ano ang ginagawa ng Railroad Commission',
    paragraphs: [
      'Sa kabila ng pangalan nito, enerhiya ang trabaho ng Texas Railroad Commission ngayon. Ito ang ahensya ng estado na nagreregula sa industriya ng langis at natural gas ng Texas, sa mga pipeline at sa mga natural gas utility [1], at kasama sa trabaho nito ang pagseselyo ng mga abandonadong balon ng langis at gas [6]. Nakaaapekto ang mga patakaran nito sa mga kumpanya ng gas na nagsisilbi sa mga tahanan, sa mga pasilidad ng gas na inaasahan ng Texas sa matinding panahon [6], at sa mga pamilyang nakatira malapit sa mga drilling site at pipeline.',
      'May tatlong miyembro ang Komisyon [1], na inihahalal sa buong estado para sa anim na taong termino na hindi sabay-sabay nagtatapos (staggered). Isang puwesto ang nasa balota ngayong taon [2].',
      'Sa inyong balota, makikita ang halalang ito kasama ng iba pang posisyong pang-estado, pagkatapos ng gobernador, tenyente gobernador, attorney general, comptroller, land commissioner at agriculture commissioner [4].',
    ],
  },

  howToVote: {
    heading: 'Paano bumoto sa Texas',
    items: [
      { lead: 'Maagang pagboto (early voting):', text: 'Lunes, Oktubre 19 hanggang Biyernes, Oktubre 30, sa alinmang lugar ng maagang pagboto sa inyong county [13].' },
      { lead: 'Araw ng Halalan:', text: 'Martes, Nobyembre 3 [13]. Bukas ang botohan mula 7 a.m. hanggang 7 p.m. lokal na oras [14].' },
      { lead: 'Magdala ng photo ID,', text: 'tulad ng Texas driver license, Texas personal identification card o U.S. passport [12].' },
      { lead: 'Hanapin ang inyong lugar ng botohan at sample ballot', text: 'sa website ng elections office ng inyong county o sa VoteTexas.gov [12].' },
    ],
  },

  candidatesSection: {
    heading: 'Ang mga kandidato nang magkakatabi',
    intro: "Tungkol sa bahaging ito: Inilalarawan ang tatlong kandidato sa parehong format, batay sa mga ulat ng balita, mga website ng kampanya at isang questionnaire ng Community Impact na sinagutan nilang lahat [5], at nakaayos ayon sa pagkakasunod-sunod sa balota ng Texas [3]. May tala na “Sa balita” kapag ang mga pahayag o kilos ng isang kandidato sa kampanya ay iniulat ng hindi bababa sa dalawang kilalang news organization at binatikos ng iba pa bukod sa kanyang mga katunggali sa pulitika; kasama rito ang tugon ng kandidato. Hindi nag-eendorso ng mga kandidato ang Tinig ng Filipino Amerikano.",
    rows: [
      { key: 'work', label: 'Karanasan sa trabaho' },
      { key: 'office', label: 'Pampublikong posisyon o posisyon sa partido' },
      { key: 'endorsements', label: 'Mga kilalang endorsement' },
      { key: 'inTheNews', label: 'Sa balita' },
      { group: 'Ang kanilang posisyon sa…' },
      { key: 'bills', label: 'Ang inyong singil sa enerhiya' },
      { key: 'wells', label: 'Mga lumang balon ng langis at gas' },
      { key: 'drilling', label: 'Pamumuhay malapit sa drilling' },
      { key: 'renewables', label: 'Renewable energy' },
      { key: 'website', label: 'Website ng kampanya' },
    ],
    backgroundLabel: 'Kaligiran.',
    inWordsLabel: 'Sa sarili niyang salita.',
    endorsementsLabel: 'Mga kilalang endorsement.',
    inTheNewsLabel: 'Sa balita.',
  },

  candidateText: {
    french: {
      party: 'Republikano',
      table: {
        work: 'Energy trader simula 1994; rancher at may-ari ng mineral rights; nagmay-ari ng mga negosyong pangseguridad sa Middle East [8]. May negosyo sa langis ang kanyang pamilya sa Midland [6]',
        office: 'Dating chair ng Tarrant County Republican Party [6]',
        endorsements: 'Gob. Greg Abbott; Lt. Gob. Dan Patrick; mga Railroad Commissioner na sina Christi Craddick at Wayne Christian [17][8]; Texas Alliance of Energy Producers [18]; Texas Oil and Gas Association PAC, na kinondena ang post ni French noong Set. 13 ngunit hindi pa binabawi ang endorsement nito hanggang Set. 15 [7c][19]',
        bills: 'Bawasan ang kawalang-kahusayan sa administrasyon at sobrang lawak na regulasyon para bumaba ang gastos sa enerhiya [5]',
        wells: 'Selyuhan ang mas maraming abandonadong balon [5]',
        drilling: 'Makipagtulungan sa industriya at sa mga may-ari ng lupa para protektahan ang lupa at kapaligiran [5]',
        renewables: 'Sumusuporta sa renewables kung kaya nitong tumayo sa ekonomiya nang walang insentibo mula sa buwis [5]',
      },
      background: 'Lumaki si French sa Midland [8], kung saan may negosyo sa langis ang kanyang pamilya [6]. Pumasok siya sa industriya ng enerhiya noong 1994 at nagtrabaho bilang energy trader sa loob ng isang dekada, at sinasabi niyang nagmay-ari at nagpatakbo siya ng mga negosyong pangseguridad sa Middle East [8]. Siya ay dating chair ng Tarrant County Republican Party [6]. Nakuha niya ang nominasyon ng Republican nang talunin niya ang nanunungkulang Commissioner na si Jim Wright sa runoff noong Mayo [6].',
      inTheNews: 'Noong Set. 13, nag-post si French ng larawan ng mga estudyante ng University of Texas sa stands ng isang laro ng football, at isinulat niya kalaunan na inuuna ng unibersidad ang "mga dayuhan kaysa sa mga Texan"; binatikos ng mga lider ng Republican, kabilang sina Sen. John Cornyn at Texas House Speaker Dustin Burrows, ang post bilang rasista [7a][25]. Kalaunan, sinabi ng dalawang estudyante sa larawan sa The Dallas Morning News na sila ay mga mamamayan ng U.S. [26]. Ipinagtanggol ni French ang post, at sinabing, "ang mas malaking usapan ay, magkakaroon ba tayo ng mga patakarang inuuna ang mga Amerikano – o magkakaroon ba tayo ng mga patakarang inuuna ang mga dayuhan?" [7a]',
      inWords: 'Sinasabi ni French na ang kanyang mga prayoridad ay bawasan ang kawalang-kahusayan sa administrasyon at sobrang lawak na regulasyon para bumaba ang gastos sa enerhiya, protektahan ang mga may-ari ng lupa, at selyuhan ang mas maraming abandonadong balon [5]. Sinasabi ng kanyang kampanya na nangako siyang "wakasan ang DEI, ang labis na regulasyon, at ang impluwensya ng radikal na Islam at ng CCP sa langis ng Texas" [8], at ipatupad ang pagbabawal ng Texas Legislature sa pagmamay-ari ng lupa ng mga dayuhang itinuturing na kalaban (hostile foreign) [8]. Sinasabi niyang nagbibigay ang Komisyon ng mahigit $1 milyon kada taon sa mga kontratang batay sa pamantayan ng diversity, equity at inclusion, at nais niyang itigil ito [6]. Tinatawag niya ang paggamit ng tubig na pinakamalaking hamon na haharapin ng Texas sa susunod na limang taon [5].',
    },
    rosenthal: {
      party: 'Demokrata',
      table: {
        work: 'Inhinyero na may humigit-kumulang 25 taon sa loob at paligid ng industriya ng langis at gas [12a]',
        office: 'State representative para sa Northwest Houston sa Texas House [12a]',
        endorsements: 'Mga editorial board ng Houston Chronicle, Dallas Morning News at Austin American-Statesman [20][21][22]; Texas AFL-CIO [23]; Sierra Club [18]',
        bills: 'Panatilihing patas ang singil sa gas at pababain ang mga bayarin [9]; ihanda (weatherize) ang mga pasilidad ng gas sa matinding panahon [6]',
        wells: 'Bagong bayarin sa pagtatapon ng saltwater (maruming tubig mula sa oilfield); mas mataas na bond at cash deposit ng mga operator [6]',
        drilling: 'Mas mahigpit na setback (layo ng drilling sa mga tahanan); mas tumutugon sa mga komunidad [5]',
        renewables: 'Sumusuporta sa mga estratehiyang "All of the Above" sa enerhiya, na hinihikayat ang solar, wind, geothermal at hydrogen [15][16]',
      },
      background: 'Si Rosenthal ay isang inhinyero na gumugol ng humigit-kumulang 25 taon sa pagtatrabaho sa loob at paligid ng industriya ng langis at gas, at kinakatawan niya ang Northwest Houston sa Texas House [12a]. Wala siyang kalaban sa Democratic primary [6].',
      inTheNews: "Walang naiulat na usaping umaabot sa pamantayan ng gabay na ito hanggang Okt. 27.",
      inWords: 'Kabilang sa mga prayoridad na inililista ng kampanya ni Rosenthal ang "Unahin ang mga Texan kaysa sa mga Espesyal na Interes" at "Panatilihing BUKAS ang Init at Ilaw at Pababain ang mga Bayarin" [9]. Sinasabi niyang hihingi siya ng mas maraming pondo para sa pagpapatupad ng Komisyon, mas mabilis na permit para sa mga responsableng operator at mabibigat na multa para sa mga seryosong lumalabag [5]. Iminumungkahi niya ang bagong bayarin sa pagtatapon ng saltwater at mas mataas na bond at cash deposit ng mga operator para pambayad sa pagseselyo ng mga balon [6], ang weatherization ng mga pasilidad ng natural gas para sa matinding panahon [6], ang pagtigil sa nakagawiang flaring, at mas mahigpit na setback [5].',
    },
    dibianca: {
      party: 'Libertarian',
      table: {
        work: 'Retiradong programmer; dating nagtrabaho sa Texas Department of Transportation [11]',
        office: 'Wala; matagal nang aktibista ng Libertarian [10]',
        endorsements: 'Walang naiulat hanggang Okt. 27. Nominado ng Libertarian Party of Texas [24]',
        bills: 'Kumpetisyon sa access sa mga pipeline at merkado sa halip na proteksyon para sa monopolyo [10]',
        wells: 'Pananagutan ng mga operator ang pagseselyo at paglilinis; bonding at insurance sa halip na bailout mula sa buwis [10]',
        drilling: 'Unahin ang karapatan sa ari-arian ng mga may-ari ng lupa kaysa sa interes ng industriya [5]',
        renewables: 'Dapat magkumpitensya ang lahat ng pinagmumulan ng enerhiya nang walang subsidy o atas [11]',
      },
      background: 'Si DiBianca ay orihinal na taga-San Antonio, isang retiradong programmer, at dating nagtrabaho sa Texas Department of Transportation [11]. Nakatira siya sa Austin at maraming taon nang aktibista ng Libertarian [10].',
      inTheNews: "Walang naiulat na usaping umaabot sa pamantayan ng gabay na ito hanggang Okt. 27.",
      inWords: 'Sinasabi ni DiBianca na hindi dapat itaguyod ng Komisyon ang industriyang nireregula nito kundi tiyakin ang karapatan sa ari-arian ng lahat ng Texan, na inuuna ang mga may-ari ng lupa kaysa sa interes ng industriya, at na pasisimplehin niya ang mga patakaran ng Komisyon at pagbubutihin ang transparency [5]. Sinasabi ng kanyang kampanya na "papanagutin ang mga operator sa pagseselyo ng balon at paglilinis" at "hihikayatin ang mga merkado ng bonding at insurance na harapin ang mga panganib sa kapaligiran sa halip na mga bailout mula sa buwis" [10]. Sinusuportahan niya ang "isang all-of-the-above na halo ng enerhiya nang walang subsidy o atas mula sa gobyerno" [11].',
    },
  },

  coverage: {
    heading: 'Mga balita tungkol sa halalang ito',
    intro: 'Mga ulat tungkol sa halalang ito mula sa mga kilalang newsroom sa Texas, isinalin ng Tinig ng Filipino Amerikano at kinikilala ang orihinal na outlet.',
  },

  footer: {
    disclaimer: 'Hindi nag-eendorso ng mga kandidato ang Tinig ng Filipino Amerikano.',
    photoCredit: 'Mga larawan mula sa mga kampanya ng kandidato, gaya ng ibinigay sa Community Impact.',
    corrections: 'Mga pagwawasto: kung may makita kayong mali, mag-email sa',
    correctionsEmail: 'contact@tinigngfilipinoamerikano.us', // site's public contact address; never a personal email
  },
};

export default tl;
