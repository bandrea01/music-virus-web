import {type Venue} from "@pages";
import {type ReactElement} from "react";
import {useDomainGetVenues, useGetEventVenueCounter} from "@api";
import {MapContainer, TileLayer} from "react-leaflet";
import L, {type LatLng} from "leaflet";
import {MarkerWithCounterComponent} from "@components";

export default function EventMapSection(): ReactElement {

    const {data: venues} = useDomainGetVenues();
    const {data: eventVenueCounters} = useGetEventVenueCounter();

    return (
        <MapContainer
            center={[40.352, 18.175]}
            zoom={15}
            style={{height: '59vh', width: '100%', borderRadius: '8px'}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {eventVenueCounters?.map((counter) => {
                const venue: Venue | undefined = venues?.find(v => v.userId === counter.venueId);
                if (!venue || !venue.venueAddress) return null;
                const position: LatLng = new L.LatLng(
                    venue.venueAddress.latitude,
                    venue.venueAddress.longitude
                );
                return (
                    <MarkerWithCounterComponent
                        key={venue.userId}
                        title={venue.venueName}
                        position={position}
                        count={counter.eventCounter ?? 0}
                    />
                )
            })}
        </MapContainer>
    );
}