// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
//
// const DealershipMap = ({ dealer }) => {
//     const mapRef = useRef(null);
//     const mapInstanceRef = useRef(null);
//
//     useEffect(() => {
//         if (!dealer || !mapRef.current) return;
//
//         // Dynamically import leaflet to avoid SSR issues
//         import('leaflet').then((L) => {
//             const leaflet = L.default;
//
//             // Fix marker icons
//             delete leaflet.Icon.Default.prototype._getIconUrl;
//             leaflet.Icon.Default.mergeOptions({
//                 iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//                 iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//                 shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//             });
//
//             const lat = parseFloat(dealer.latitude);
//             const lng = parseFloat(dealer.longitude);
//
//             // Remove existing map instance before creating new one
//             if (mapInstanceRef.current) {
//                 mapInstanceRef.current.remove();
//                 mapInstanceRef.current = null;
//             }
//
//             // Create new map instance
//             const map = leaflet.map(mapRef.current).setView([lat, lng], 15);
//
//             leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '&copy; OpenStreetMap contributors',
//             }).addTo(map);
//
//             leaflet.marker([lat, lng])
//                 .addTo(map)
//                 .bindPopup(`<strong>${dealer.name}</strong><br/>${dealer.address}, ${dealer.city}`)
//                 .openPopup();
//
//             mapInstanceRef.current = map;
//         });
//
//         // Cleanup on unmount
//         return () => {
//             if (mapInstanceRef.current) {
//                 mapInstanceRef.current.remove();
//                 mapInstanceRef.current = null;
//             }
//         };
//     }, [dealer]);
//
//     return (
//         <div
//             ref={mapRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 minHeight: '400px',
//                 borderRadius: '12px',
//                 zIndex: 0,
//             }}
//         />
//     );
// };
//
// export default DealershipMap;

const DealershipMap = ({ dealer }) => {
    if (!dealer) return null;

    const lat = parseFloat(dealer.latitude);
    const lng = parseFloat(dealer.longitude);

    // Google Maps embed — works without API key
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

    return (
        <iframe
            title={`${dealer.name} Location`}
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px', borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    );
};

export default DealershipMap;