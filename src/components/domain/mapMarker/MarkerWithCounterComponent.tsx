import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import "./markerWithCounterComponent.scss";
import { buildMarkerSvgMarkup, loadMarkerSvgText } from "./MarkerComponent.tsx";

type Props = {
    title: string;
    position: LatLngExpression;
    count: number;
    color?: string;
};

const SIZE = 38;
const MAX = 9;

export default function MarkerWithCounterComponent({
                                                       title,
                                                       position,
                                                       count,
                                                       color = "#224583",
                                                   }: Props) {
    const [svgText, setSvgText] = useState<string | null>(null);

    // carica UNA volta (cache in MarkerComponent.tsx)
    useEffect(() => {
        let cancelled = false;
        loadMarkerSvgText("/marker.svg").then((t) => {
            if (!cancelled) setSvgText(t);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const icon = useMemo(() => {
        if (!svgText) return null;

        const visible = count > 0;
        const label = count > MAX ? `${MAX}+` : String(count);
        const badgeHtml = visible ? `<div class="mv-badge">${label}</div>` : "";

        const svgMarkup = buildMarkerSvgMarkup(svgText, SIZE);

        const html = `
      <div class="mv-marker-wrap" style="width:${SIZE}px;height:${SIZE}px;color:${color}">
        ${badgeHtml}
        ${svgMarkup}
      </div>
    `;

        return L.divIcon({
            html,
            className: "mv-div-icon",
            iconSize: [SIZE, SIZE],
            iconAnchor: [SIZE / 2, SIZE],
            popupAnchor: [0, -SIZE],
        });
    }, [svgText, count, color]);

    if (!icon) return null;

    return (
        <Marker position={position} icon={icon} draggable={false}>
            <Popup>{title}</Popup>
        </Marker>
    );
}
