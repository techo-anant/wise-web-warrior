// import React from 'react';
// import './DealerLocator.css';
//
// import DealershipMap from '../../components/map/DealershipMap';
//
// const DealerLocator = () => {
//   const businessAddress = "Aliens Native Site - Cabo de Hornos, Magallanes and Chilean Antarctica, Chile";
//   const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(businessAddress)}`;
//
//   const freeMapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1190.0030923663626!2d-69.26636051348868!3d-55.54418756217845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sca!4v1774482788384!5m2!1sen!2sca";
//
//   return (
//     <div className="locator-page">
//       <div className="locator-container">
//         <div className="map-section">
//           < DealershipMap freeMapUrl={freeMapUrl} />
//         </div>
//         <div className="info-section">
//           <div className="info-content">
//             <h1>Warriors <span>Showroom</span></h1>
//             <p className="subtitle">Visit our flagship location for a test drive.</p>
//
//             <div className="info-group">
//               <h4>Location</h4>
//               <p>{businessAddress}</p>
//               <a
//                 href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="directions-link"
//               >
//                 Get Directions
//               </a>
//             </div>
//
//             <div className="info-group">
//               <h4>Operating Hours</h4>
//               <div className="hours-row">
//                 <span>Monday - Friday</span>
//                 <span>9:00 AM - 8:00 PM</span>
//               </div>
//               <div className="hours-row">
//                 <span>Saturday - Sunday</span>
//                 <span>10:00 AM - 6:00 PM</span>
//               </div>
//             </div>
//
//             <div className="info-group">
//               <h4>Contact Us</h4>
//               <p>☎️ +1(771)721-0576</p>
//               <p>🖥️ sales@cardeals.com</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default DealerLocator;


// import React, { useState, useEffect } from 'react';
// import { getAllDealers } from '../../services/dealerService';
// import DealershipMap from '../../components/map/DealershipMap';
// import './DealerLocator.css';
//
// // Skeleton block component to maintain UI shape while loading
// const Skeleton = ({ width = '100%', height = '20px', style = {} }) => (
//     <div style={{
//         width,
//         height,
//         background: 'rgba(128,128,128,0.15)',
//         borderRadius: '6px',
//         marginBottom: '8px',
//         animation: 'pulse 1.5s ease-in-out infinite',
//         ...style,
//     }} />
// );
//
// const DealerLocator = () => {
//     const [dealers, setDealers] = useState([]);
//     const [selectedDealer, setSelectedDealer] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//
//     // Fetch all dealers from backend on mount
//     useEffect(() => {
//         const fetchDealers = async () => {
//             try {
//                 const data = await getAllDealers();
//                 setDealers(data);
//                 // Auto-select first dealer
//                 if (data.length > 0) setSelectedDealer(data[0]);
//             } catch (err) {
//                 setError('Failed to load dealer locations.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDealers();
//     }, []);
//
//     // Build Google Maps embed URL from dealer lat/lng
//     const getMapUrl = (dealer) => {
//         if (!dealer) return '';
//         return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${dealer.latitude},${dealer.longitude}`;
//     };
//
//     // Fallback free embed URL using coordinates
//     const getFreeMapUrl = (dealer) => {
//         if (!dealer) return '';
//         const lat = dealer.latitude;
//         const lng = dealer.longitude;
//         return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;
//     };
//
//     return (
//         <div className="locator-page">
//
//             {/* Pulse animation keyframe */}
//             <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.4; }
//         }
//       `}</style>
//
//             <div className="locator-container">
//
//                 {/* ── MAP SECTION ── always visible, shows skeleton while loading */}
//                 <div className="map-section">
//                     {loading ? (
//                         <Skeleton height="100%" style={{ minHeight: '400px', borderRadius: '12px' }} />
//                     ) : selectedDealer ? (
//                         <DealershipMap freeMapUrl={getFreeMapUrl(selectedDealer)} />
//                     ) : (
//                         <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
//                             <p>No map available</p>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* ── INFO SECTION ── */}
//                 <div className="info-section">
//                     <div className="info-content">
//
//                         {/* ── DEALER SELECTOR ── */}
//                         {loading ? (
//                             <>
//                                 <Skeleton height="36px" width="70%" />
//                                 <Skeleton height="18px" width="50%" />
//                             </>
//                         ) : dealers.length > 1 && (
//                             <div style={{ marginBottom: '20px' }}>
//                                 <label style={{ fontSize: '0.85rem', opacity: 0.7, display: 'block', marginBottom: '6px' }}>
//                                     Select Location
//                                 </label>
//                                 <select
//                                     value={selectedDealer?.id || ''}
//                                     onChange={(e) => {
//                                         const dealer = dealers.find(d => d.id === parseInt(e.target.value));
//                                         setSelectedDealer(dealer);
//                                     }}
//                                     style={{
//                                         width: '100%',
//                                         padding: '10px',
//                                         borderRadius: '8px',
//                                         border: '1px solid var(--accent-color)',
//                                         background: 'var(--bg-color)',
//                                         color: 'var(--text-color)',
//                                         fontSize: '0.95rem',
//                                     }}
//                                 >
//                                     {dealers.map(d => (
//                                         <option key={d.id} value={d.id}>
//                                             {d.name} — {d.city}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         )}
//
//                         {/* ── DEALER NAME & SUBTITLE ── */}
//                         {loading ? (
//                             <>
//                                 <Skeleton height="40px" width="80%" />
//                                 <Skeleton height="18px" width="60%" />
//                             </>
//                         ) : (
//                             <>
//                                 <h1>{selectedDealer?.name || 'Warriors'} <span>Showroom</span></h1>
//                                 <p className="subtitle">Visit our location for a test drive.</p>
//                             </>
//                         )}
//
//                         {/* ── LOCATION ── */}
//                         <div className="info-group">
//                             <h4>Location</h4>
//                             {loading ? (
//                                 <>
//                                     <Skeleton height="16px" width="90%" />
//                                     <Skeleton height="16px" width="60%" />
//                                     <Skeleton height="32px" width="40%" style={{ borderRadius: '8px' }} />
//                                 </>
//                             ) : (
//                                 <>
//                                 <p>{selectedDealer?.address}, {selectedDealer?.city}, {selectedDealer?.province} {selectedDealer?.postal_code}</p>
//
//                                 <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDealer?.latitude},${selectedDealer?.longitude}`}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="directions-link"
//                                 >
//                                 Get Directions
//                                 </a>
//                                 </>
//                                 )}
//                         </div>
//
//                         {/* ── OPERATING HOURS ── */}
//                         <div className="info-group">
//                             <h4>Operating Hours</h4>
//                             {loading ? (
//                                 <>
//                                     <Skeleton height="16px" />
//                                     <Skeleton height="16px" width="80%" />
//                                 </>
//                             ) : (
//                                 <div className="hours-row">
//                                     <span>{selectedDealer?.hours || 'Mon-Sat 9am-7pm'}</span>
//                                 </div>
//                             )}
//                         </div>
//
//                         {/* ── CONTACT ── */}
//                         <div className="info-group">
//                             <h4>Contact Us</h4>
//                             {loading ? (
//                                 <>
//                                     <Skeleton height="16px" width="60%" />
//                                     <Skeleton height="16px" width="70%" />
//                                 </>
//                             ) : (
//                                 <>
//                                     <p>☎️ {selectedDealer?.phone || 'N/A'}</p>
//                                     <p>🖥️ {selectedDealer?.email || 'N/A'}</p>
//                                 </>
//                             )}
//                         </div>
//
//                         {/* ── ALL LOCATIONS LIST ── */}
//                         {!loading && dealers.length > 1 && (
//                             <div className="info-group">
//                                 <h4>All Locations</h4>
//                                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                                     {dealers.map(dealer => (
//                                         <button
//                                             key={dealer.id}
//                                             onClick={() => setSelectedDealer(dealer)}
//                                             style={{
//                                                 background: selectedDealer?.id === dealer.id
//                                                     ? 'var(--accent-color)'
//                                                     : 'transparent',
//                                                 color: selectedDealer?.id === dealer.id
//                                                     ? 'white'
//                                                     : 'var(--text-color)',
//                                                 border: '1px solid var(--accent-color)',
//                                                 padding: '8px 14px',
//                                                 borderRadius: '8px',
//                                                 cursor: 'pointer',
//                                                 textAlign: 'left',
//                                                 fontSize: '0.9rem',
//                                             }}
//                                         >
//                                             📍 {dealer.name} — {dealer.city}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//
//                         {/* Error message */}
//                         {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default DealerLocator;

import React, { useState, useEffect } from 'react';
import { getAllDealers } from '../../services/dealerService';
import DealershipMap from '../../components/map/DealershipMap';
import './DealerLocator.css';

// Skeleton block to maintain UI shape while loading
const Skeleton = ({ width = '100%', height = '20px', style = {} }) => (
    <div style={{
        width, height,
        background: 'rgba(128,128,128,0.15)',
        borderRadius: '6px',
        marginBottom: '8px',
        animation: 'pulse 1.5s ease-in-out infinite',
        ...style,
    }} />
);

const DealerLocator = () => {
    const [dealers, setDealers]             = useState([]);
    const [selectedDealer, setSelectedDealer] = useState(null);
    const [loading, setLoading]             = useState(true);
    const [error, setError]                 = useState('');

    useEffect(() => {
        const fetchDealers = async () => {
            try {
                const data = await getAllDealers();
                setDealers(data);
                if (data.length > 0) setSelectedDealer(data[0]);
            } catch (err) {
                setError('Failed to load dealer locations.');
            } finally {
                setLoading(false);
            }
        };
        fetchDealers();
    }, []);

    return (
        <div className="locator-page">
            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

            <div className="locator-container">

                {/* ── MAP SECTION ── */}
                <div className="map-section">
                    {loading ? (
                        <Skeleton height="100%" style={{ minHeight: '400px', borderRadius: '12px' }} />
                    ) : (
                        <DealershipMap dealer={selectedDealer} />
                    )}
                </div>

                {/* ── INFO SECTION ── */}
                <div className="info-section">
                    <div className="info-content">

                        {/* Dealer selector dropdown — only if multiple locations */}
                        {!loading && dealers.length > 1 && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ fontSize: '0.85rem', opacity: 0.7, display: 'block', marginBottom: '6px' }}>
                                    Select Location
                                </label>
                                <select
                                    value={selectedDealer?.id || ''}
                                    onChange={(e) => {
                                        const dealer = dealers.find(d => d.id === parseInt(e.target.value));
                                        setSelectedDealer(dealer);
                                    }}
                                    style={{
                                        width: '100%', padding: '10px', borderRadius: '8px',
                                        border: '1px solid var(--accent-color)',
                                        background: 'var(--bg-color)', color: 'var(--text-color)',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {dealers.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {d.name} — {d.city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Dealer name */}
                        {loading ? (
                            <>
                                <Skeleton height="40px" width="80%" />
                                <Skeleton height="18px" width="60%" />
                            </>
                        ) : (
                            <>
                                <h1>{selectedDealer?.name || 'Warriors'} <span>Showroom</span></h1>
                                <p className="subtitle">Visit our location for a test drive.</p>
                            </>
                        )}

                        {/* Location */}
                        <div className="info-group">
                            <h4>Location</h4>
                            {loading ? (
                                <>
                                    <Skeleton height="16px" width="90%" />
                                    <Skeleton height="16px" width="60%" />
                                    <Skeleton height="32px" width="40%" style={{ borderRadius: '8px' }} />
                                </>
                            ) : (
                                <>
                                <p>
                                    {selectedDealer?.address}, {selectedDealer?.city},{' '}
                                    {selectedDealer?.province} {selectedDealer?.postal_code}
                                </p>

                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedDealer?.latitude},${selectedDealer?.longitude}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="directions-link"
                                    >
                                    Get Directions
                                </a>
                                </>
                                )}
                        </div>

                        {/* Operating Hours */}
                        <div className="info-group">
                            <h4>Operating Hours</h4>
                            {loading ? (
                                <>
                                    <Skeleton height="16px" />
                                    <Skeleton height="16px" width="80%" />
                                </>
                            ) : (
                                <div className="hours-row">
                                    <span>{selectedDealer?.hours || 'Mon-Sat 9am-7pm'}</span>
                                </div>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="info-group">
                            <h4>Contact Us</h4>
                            {loading ? (
                                <>
                                    <Skeleton height="16px" width="60%" />
                                    <Skeleton height="16px" width="70%" />
                                </>
                            ) : (
                                <>
                                    <p>☎️ {selectedDealer?.phone || 'N/A'}</p>
                                    <p>🖥️ {selectedDealer?.email || 'N/A'}</p>
                                </>
                            )}
                        </div>

                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerLocator;