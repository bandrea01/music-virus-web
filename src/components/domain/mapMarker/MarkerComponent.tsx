import {useEffect, useState} from "react";

let cachedSvgText: string | null = null;
let inFlight: Promise<string> | null = null;

export async function loadMarkerSvgText(src = "/marker.svg"): Promise<string> {
    if (cachedSvgText) return cachedSvgText;
    if (inFlight) return inFlight;

    inFlight = fetch(src)
        .then((r) => r.text())
        .then((t) => {
            cachedSvgText = t;
            inFlight = null;
            return t;
        })
        .catch((e) => {
            inFlight = null;
            throw e;
        });

    return inFlight;
}

export function buildMarkerSvgMarkup(svgText: string, size: number): string {
    let s = svgText;

    s = s.replace(
        /<svg\b([^>]*)>/,
        `<svg $1 width="${size}" height="${size}" style="display:block">`
    );

    s = s.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    s = s.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');

    return s;
}

type MarkerComponentProps = {
    size?: number;
    color?: string;
    src?: string;
}

export default function MarkerComponent({
                                            size = 32,
                                            color = "#ac60ff",
                                            src = "/marker.svg",
                                        }: MarkerComponentProps) {
    const [svg, setSvg] = useState<string>("");

    useEffect(() => {
        let cancelled = false;
        loadMarkerSvgText(src).then((t) => {
            if (!cancelled) setSvg(buildMarkerSvgMarkup(t, size));
        });
        return () => {
            cancelled = true;
        };
    }, [src, size]);

    if (!svg) return null;

    return (
        <span
            style={{
                display: "inline-flex",
                width: size,
                height: size,
                color,
                lineHeight: 0,
            }}
            dangerouslySetInnerHTML={{__html: svg}}
        />
    );
}
