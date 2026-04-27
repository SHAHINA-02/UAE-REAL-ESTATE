"use client";

import { useEffect, useRef } from "react";
import { Property } from "@/lib/propertyData";

interface PropertyMapProps {
  properties?: Property[];
  highlightNeighborhood?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const GOLD_PIN_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
  <defs>
    <radialGradient id="g" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#f2d9a8"/>
      <stop offset="100%" stop-color="#875212"/>
    </radialGradient>
  </defs>
  <path d="M16 2C9.4 2 4 7.4 4 14c0 9.5 12 26 12 26S28 23.5 28 14C28 7.4 22.6 2 16 2z"
    fill="url(#g)" stroke="#c8861e" stroke-width="1.5"/>
  <circle cx="16" cy="14" r="5" fill="#080d14" opacity="0.6"/>
</svg>`);

export default function PropertyMap({
  properties = [],
  center = { lat: 25.1, lng: 55.2 },
  zoom = 10,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const L = (await import("leaflet")) as any;

      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current!, {
        center: [center.lat, center.lng],
        zoom,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      const goldIcon = L.divIcon({
        html: `<img src="data:image/svg+xml,${GOLD_PIN_SVG}" style="width:28px;height:37px;filter:drop-shadow(0 2px 6px rgba(200,134,30,0.5))"/>`,
        className: "",
        iconSize: [28, 37],
        iconAnchor: [14, 37],
        popupAnchor: [0, -38],
      });

      properties.forEach((p) => {
        const popup = L.popup({ className: "leaflet-gold-popup", maxWidth: 240 })
          .setContent(`
            <div style="background:#131f2e;color:#f0e8d8;padding:12px 14px;border-radius:10px;
              font-family:system-ui,sans-serif;border:1px solid rgba(200,134,30,0.35);min-width:200px;">
              <div style="font-weight:700;font-size:13px;margin-bottom:5px">${p.title}</div>
              <div style="color:#e8c06e;font-size:16px;font-weight:800;margin-bottom:7px">
                AED ${(p.price / 1_000_000).toFixed(2)}M
              </div>
              <div style="display:flex;gap:10px;font-size:11px;color:#a09070;margin-bottom:5px">
                <span>${p.bedrooms > 0 ? p.bedrooms + " BR" : "Studio"}</span>
                <span>${p.sqft.toLocaleString()} sqft</span>
                <span style="color:#4ade80">${p.roi}% ROI</span>
              </div>
              <div style="font-size:11px;color:#5a5040">${p.neighborhood}, ${p.city}</div>
              <div style="font-size:10px;color:#5a5040;margin-top:3px">${p.developer} · ${p.yearBuilt}</div>
            </div>
          `);

        L.marker([p.lat, p.lng], { icon: goldIcon }).addTo(map).bindPopup(popup);
      });

      if (!document.getElementById("leaflet-gold-style")) {
        const style = document.createElement("style");
        style.id = "leaflet-gold-style";
        style.textContent = `
          .leaflet-gold-popup .leaflet-popup-content-wrapper {
            background:transparent!important;border:none!important;
            box-shadow:0 8px 32px rgba(0,0,0,0.6)!important;
            padding:0!important;border-radius:10px!important;
          }
          .leaflet-gold-popup .leaflet-popup-content { margin:0!important; }
          .leaflet-gold-popup .leaflet-popup-tip { background:#131f2e!important; }
          .leaflet-container { background:#080d14!important; }
          .leaflet-control-attribution {
            background:rgba(8,13,20,0.8)!important;color:#5a5040!important;font-size:9px!important;
          }
          .leaflet-control-attribution a { color:#a09070!important; }
          .leaflet-control-zoom a {
            background:#131f2e!important;color:#c8861e!important;
            border-color:rgba(200,134,30,0.3)!important;
          }
          .leaflet-control-zoom a:hover { background:#1a2a3e!important; }
        `;
        document.head.appendChild(style);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom, properties]);

  return (
    <div className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(200,134,30,0.2)", height: "280px", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div style={{
        position: "absolute", top: 10, left: 10, zIndex: 1000,
        background: "rgba(8,13,20,0.85)", border: "1px solid rgba(200,134,30,0.3)",
        borderRadius: 6, padding: "3px 8px", fontSize: 10, color: "var(--gold-light)",
        backdropFilter: "blur(8px)", pointerEvents: "none",
      }}>
        {properties.length} properties · UAE
      </div>
    </div>
  );
}