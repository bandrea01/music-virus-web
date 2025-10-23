import React, {useMemo, useState} from 'react';
import L, {type LatLngLiteral} from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import {Box, Button} from '@mui/material';
import markerUrl from '/marker.png?url';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png?url';

type MapPickerProps = {
    value?: LatLngLiteral | null;
    onChange: (pos: LatLngLiteral) => void;
    height?: number | string;
    defaultCenter?: LatLngLiteral;
    zoom?: number;
    viewOnly?: boolean;
};

function ClickHandler({onPick}: { onPick: (p: LatLngLiteral) => void }) {
    useMapEvents({
        click(e) {
            onPick({lat: e.latlng.lat, lng: e.latlng.lng});
        },
    });
    return null;
}

const defaultSettings = {
    height: 320,
    center: {lat: 40.3539, lng: 18.17542} as LatLngLiteral,
    zoom: 13,
};

export const MapPicker: React.FC<MapPickerProps> = ({
                                                        value,
                                                        onChange,
                                                        height = defaultSettings.height,
                                                        defaultCenter = defaultSettings.center,
                                                        zoom = defaultSettings.zoom,
                                                        viewOnly = false,
                                                    }) => {
    const [currentPosition, setCurrentPosition] =
        useState<LatLngLiteral | null>(value ?? defaultCenter);

    const center = useMemo<LatLngLiteral>(() => currentPosition ?? defaultCenter, [
        currentPosition,
        defaultCenter,
    ]);

    const myMarkerIcon = useMemo(
        () =>
            L.icon({
                iconUrl: markerUrl,
                shadowUrl,
                iconSize: [25, 35],
                iconAnchor: [20, 40],
                popupAnchor: [0, -34],
            }),
        []
    );

    const handlePick = (pickedPosition: LatLngLiteral) => {
        setCurrentPosition(pickedPosition);
        onChange(pickedPosition);
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (r) => {
                const position: LatLngLiteral = {
                    lat: r.coords.latitude,
                    lng: r.coords.longitude,
                };
                handlePick(position);
            },
            () => {
            },
            {enableHighAccuracy: true, timeout: 8000}
        );
    };

    return (
        <Box sx={{width: '100%'}}>
            {!viewOnly && (
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 1}}>
                    <Button className='btn btn--ghost' onClick={handleUseMyLocation}>
                        Usa la mia posizione
                    </Button>
                </Box>
            )}

            <Box
                sx={{
                    width: '100%',
                    height,
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,.12)',
                }}
            >
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={zoom}
                    style={{width: '100%', height: '100%'}}
                    scrollWheelZoom
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    <ClickHandler onPick={handlePick}/>

                    {currentPosition && (
                        <Marker
                            position={[currentPosition.lat, currentPosition.lng]}
                            icon={myMarkerIcon}
                            draggable={!viewOnly}
                        >
                            <Popup>
                                {currentPosition?.lat?.toFixed(5)}, {currentPosition?.lng?.toFixed(5)}
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </Box>
        </Box>
    );
};
