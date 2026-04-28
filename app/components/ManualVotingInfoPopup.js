'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Vote, Calendar, FileText, ExternalLink, Info } from 'lucide-react';

const trackPopupEvent = async (eventType, metadata) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'Popup',
        ...metadata
      });
    }

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        metadata: {
          ...metadata,
          date: new Date().toISOString().split('T')[0],
          timestamp: new Date().toISOString()
        }
      })
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export default function ManualVotingInfoPopup({ state, eventType, isOpen, onClose }) {
  const [votingStatus, setVotingStatus] = useState(null);

  const getPopupContent = () => {
    const content = {
      'GA': {
        title: 'Mga botante ng Georgia',
        subtitle: 'Impormasyon sa Halalan: Kataas-taasang Hukuman ng Georgia (Primarya 2026)',
        resources: [
          {
            icon: Vote,
            title: 'Tingnan ang voter registration',
            description: 'Tingnan ang inyong status ng pagpapatala',
            link: 'https://www.mvp.sos.ga.gov/MVP/mvp.do',
            linkText: 'Pumunta sa My Voter Page'
          },
          {
            icon: FileText,
            title: 'Mag-apply ng absentee ballot',
            description: 'Mag-apply ng pagboto sa pamamagitan ng koreo',
            link: 'https://ballotrequest.sos.ga.gov/',
            linkText: 'Application form ng absentee ballot'
          },
          {
            icon: MapPin,
            title: 'Hanapin ang inyong polling place',
            description: 'Hanapin ang pinakamalapit na presinto',
            link: 'https://www.mvp.sos.ga.gov/MVP/mvp.do',
            linkText: 'Tingnan ang lokasyon ng presinto'
          },
          {
            icon: Calendar,
            title: 'Mahahalagang petsa (Primarya)',
            description: 'Araw ng Primarya: Mayo 19, 2026',
            dates: [
              'Maagang pagboto (kasalukuyan): Abril 27 - Mayo 15, 2026',
              'Huling araw para sa absentee ballot: Mayo 8, 2026',
              'Voter registration deadline: Abril 20, 2026 (lampas na)'
            ]
          }
        ],
        footerMessage: 'Ang halalan para sa Mahistrado ng Kataas-taasang Hukuman ng Georgia ay nonpartisan at nagaganap sa primarya ng Mayo 19, hindi sa Nobyembre. Bumoto sa Mayo!'
      },
      'PA': {
        title: 'Mga botante ng Pennsylvania',
        subtitle: 'Impormasyon sa Halalan: Ika-1 Distrito ng Kongreso (Primarya 2026)',
        resources: [
          {
            icon: Vote,
            title: 'Tingnan ang voter registration',
            description: 'Tingnan ang inyong status ng pagpapatala',
            link: 'https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx',
            linkText: 'Pumunta sa PA Voter Services'
          },
          {
            icon: FileText,
            title: 'Mag-apply ng mail-in ballot',
            description: 'Mag-apply ng pagboto sa pamamagitan ng koreo',
            link: 'https://www.pavoterservices.pa.gov/OnlineAbsenteeApplication/',
            linkText: 'Application form ng mail-in ballot'
          },
          {
            icon: MapPin,
            title: 'Hanapin ang inyong polling place',
            description: 'Hanapin ang pinakamalapit na presinto',
            link: 'https://www.pavoterservices.pa.gov/pages/pollingplaceinfo.aspx',
            linkText: 'Tingnan ang lokasyon ng presinto'
          },
          {
            icon: Calendar,
            title: 'Mahahalagang petsa (Primarya)',
            description: 'Araw ng Primarya: Mayo 19, 2026',
            dates: [
              'Voter registration deadline: Mayo 4, 2026',
              'Huling araw mag-apply ng mail ballot: Mayo 12, 2026',
              'Huling araw ibalik ang mail ballot: Mayo 19, 2026 ng 8:00 ng gabi'
            ]
          }
        ],
        footerMessage: 'Ang Ika-1 Distrito ng Pennsylvania ay isa sa pinakamahalagang swing district sa US. Boto ninyo ang nagdedesisyon!'
      },
      'AK': {
        title: 'Mga botante ng Alaska',
        subtitle: 'Impormasyon sa Halalan: Senado ng Alaska 2026',
        resources: [
          {
            icon: Vote,
            title: 'Tingnan ang voter registration',
            description: 'Tingnan ang inyong status ng pagpapatala',
            link: 'https://myvoterinformation.alaska.gov/',
            linkText: 'Pumunta sa AK Voter Information'
          },
          {
            icon: FileText,
            title: 'Mag-apply ng absentee ballot',
            description: 'Mag-apply ng pagboto sa pamamagitan ng koreo',
            link: 'https://absenteeballotapplication.alaska.gov/',
            linkText: 'Application form ng absentee ballot'
          },
          {
            icon: MapPin,
            title: 'Hanapin ang inyong polling place',
            description: 'Hanapin ang pinakamalapit na presinto',
            link: 'https://myvoterinformation.alaska.gov/',
            linkText: 'Tingnan ang lokasyon ng presinto'
          },
          {
            icon: Info,
            title: 'Tungkol sa Ranked Choice Voting',
            description: 'Alamin ang sistema ng RCV ng Alaska',
            link: 'https://www.elections.alaska.gov/RCV.php',
            linkText: 'Gabay sa RCV'
          },
          {
            icon: Calendar,
            title: 'Mahahalagang petsa',
            description: 'Pangkalahatang Halalan: Nobyembre 3, 2026',
            dates: [
              'Open Primary (top-4): Agosto 18, 2026',
              'Voter registration deadline: Oktubre 4, 2026 (30 araw bago ang halalan)',
              'Maagang pagboto: nagsisimula Oktubre 19, 2026'
            ]
          }
        ],
        footerMessage: 'Gumagamit ang Alaska ng open primary at ranked choice voting. Lahat ng botante ay maaaring lumahok anuman ang partido.'
      },
      'NC': {
        title: 'Mga botante ng North Carolina',
        subtitle: 'Impormasyon sa Halalan: North Carolina 2026 (Senado, Kataas-taasang Hukuman)',
        resources: [
          {
            icon: Vote,
            title: 'Tingnan ang voter registration',
            description: 'Tingnan ang inyong status ng pagpapatala',
            link: 'https://vt.ncsbe.gov/RegLkup/',
            linkText: 'Pumunta sa NC Voter Lookup'
          },
          {
            icon: FileText,
            title: 'Mag-apply ng absentee ballot',
            description: 'Mag-apply ng pagboto sa pamamagitan ng koreo',
            link: 'https://votebymail.ncsbe.gov/',
            linkText: 'Application form ng absentee ballot'
          },
          {
            icon: MapPin,
            title: 'Hanapin ang inyong polling place',
            description: 'Hanapin ang pinakamalapit na presinto',
            link: 'https://vt.ncsbe.gov/PPLkup/',
            linkText: 'Tingnan ang lokasyon ng presinto'
          },
          {
            icon: Calendar,
            title: 'Mahahalagang petsa',
            description: 'Araw ng Halalan: Nobyembre 3, 2026',
            dates: [
              'Voter registration deadline: Oktubre 9, 2026',
              'Maagang pagboto: Oktubre 15 - 31, 2026',
              'Huling araw mag-apply ng absentee ballot: Oktubre 27, 2026'
            ]
          }
        ],
        footerMessage: 'Ang halalan sa North Carolina (Senado, Kataas-taasang Hukuman, Lupon ng Halalan) ay nakakaapekto sa patakaran ng estado at hustisya. Mahalaga ang inyong boto!'
      }
    };

    return content[state] || null;
  };

  useEffect(() => {
    if (isOpen) {
      trackPopupEvent('manual_popup_opened', {
        user_state: state,
        event_type: eventType,
        language: 'tl'
      });
    }
  }, [isOpen, state, eventType]);

  const handleClose = (closeType = 'unknown') => {
    trackPopupEvent('manual_popup_closed', {
      user_state: state,
      event_type: eventType,
      close_type: closeType,
      language: 'tl'
    });
    onClose();
  };

  const handleLinkClick = (linkType, linkUrl, linkText) => {
    const tagalogToEnglish = {
      'Tingnan ang voter registration': 'Voter Registration Check',
      'Mag-apply ng absentee ballot': 'Absentee Ballot Application',
      'Mag-apply ng mail-in ballot': 'Mail Ballot Application',
      'Hanapin ang inyong polling place': 'Polling Place Finder',
      'Tungkol sa Ranked Choice Voting': 'Ranked Choice Voting Info',
      'Mahahalagang petsa': 'Important Dates',
      'Mahahalagang petsa (Primarya)': 'Important Dates (Primary)'
    };

    const englishType = tagalogToEnglish[linkType] || linkType;
    const stateSpecificType = `${state}_${englishType}`;

    trackPopupEvent('manual_popup_link_click', {
      user_state: state,
      event_type: eventType,
      link_type: stateSpecificType,
      link_type_tagalog: linkType,
      link_url: linkUrl,
      link_text: linkText,
      link_text_english: `${state} - ${englishType}`,
      language: 'tl'
    });
  };

  const handleVotingStatus = async (status) => {
    setVotingStatus(status);

    await trackPopupEvent('manual_voting_status_response', {
      user_state: state,
      event_type: eventType,
      voting_status: status,
      language: 'tl'
    });

    try {
      await fetch('/api/analytics/voter-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_slug: eventType,
          state: state,
          response: status,
          language: 'tl'
        })
      });
    } catch (error) {
      console.error('Failed to save voter survey:', error);
    }
  };

  if (!isOpen) return null;

  const content = getPopupContent();
  if (!content) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={() => handleClose('backdrop')}
      />

      {/* Popup */}
      <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] md:inset-x-auto md:left-[50%] md:translate-x-[-50%] max-w-3xl z-[100]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp max-h-[70vh] md:max-h-[75vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-yellow-500 text-white p-5 relative">
            <button
              onClick={() => handleClose('x_button')}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label="Isara"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="pr-10">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{content.title}</h2>
              </div>
              <p className="text-white text-opacity-90">{content.subtitle}</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {content.resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2">
                    <div className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{resource.description}</p>

                        {resource.link && (
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-emerald-600 hover:text-emerald-800 font-medium text-sm transition-colors"
                            onClick={() => handleLinkClick(resource.title, resource.link, resource.linkText)}
                          >
                            <span>{resource.linkText}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {resource.dates && (
                          <ul className="mt-2 space-y-1">
                            {resource.dates.map((date, i) => (
                              <li key={i} className="text-sm text-gray-600">• {date}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voter Survey Section */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Bumoto na ba kayo?</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleVotingStatus('already_voted')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'already_voted'
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Bumoto na ✓
                </button>
                <button
                  onClick={() => handleVotingStatus('will_vote')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'will_vote'
                      ? 'bg-blue-100 border-blue-400 text-blue-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Boboto ako
                </button>
                <button
                  onClick={() => handleVotingStatus('need_info')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'need_info'
                      ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Kailangan ng info
                </button>
                <button
                  onClick={() => handleVotingStatus('skip')}
                  className={`px-3 py-2 text-sm rounded-md border transition-all ${
                    votingStatus === 'skip'
                      ? 'bg-gray-100 border-gray-400 text-gray-600'
                      : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  Laktawan
                </button>
              </div>
              {votingStatus && (
                <p className="mt-3 text-xs text-gray-600 text-center">
                  Salamat sa inyong sagot! Tumutulong ito sa amin na maglingkod sa komunidad.
                </p>
              )}
            </div>

            {/* Footer Message */}
            {content.footerMessage && (
              <div className="mt-6 p-3 bg-gray-100 rounded text-sm text-gray-700">
                <p>{content.footerMessage}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-white px-6 pb-6 flex justify-end space-x-3">
            <button
              onClick={() => handleClose('close_button')}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors shadow-lg"
            >
              Isara
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
