import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArtistCreateFundraisingDialog from "@pages/homePage/panel/artist/fundraising/ArtistCreateFundraisingDialog.tsx";
import {useEffect, useMemo, useState} from "react";
import {useGetPersonalFundraisingList} from "@pages/homePage/hooks/useFundraising.ts";
import {useAuth} from "@components";
import {type EnrichFundraising, useGetArtists, useGetVenues} from "@pages";
import {FundraisingCardComponent} from "@components/FundraisingCardComponent.tsx";
import {getActionsFromStatus} from "@pages/homePage/panel/artist/fundraising/ArtistFundraisingCardActions.tsx";
import type {FundraisingStatusKey} from "@utils";
import type {ActionProps} from "@utils/types/types.ts";

const ArtistFundraisingPanel = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const {profileUser} = useAuth();
    const {data: venues, refetch: refetchVenues} = useGetVenues();
    const {data: artists, refetch: refetchArtist} = useGetArtists();


    const {data: personalFundraising, refetch: refetchFundraising} = useGetPersonalFundraisingList(profileUser?.userId ?? "");

    // @ts-ignore
    const fundraisings: EnrichFundraising[] = useMemo(() => {
        return personalFundraising?.fundraisings.map((fundraising) => {
            const artist = artists?.artists.find(artist => artist.userId === fundraising.artistId);
            const venue = venues?.venues.find(venue => venue.userId === fundraising.venueId);
            return {
                ...fundraising,
                artistName: artist ? `${artist.name} ${artist.surname}` : "",
                venueName: venue ? venue.venueName : "",
            }
        });
    }, [personalFundraising, artists, venues]);

    const actions: ActionProps[] = [{
        label: 'Nuova Raccolta Fondi',
        onClick: () => setIsDialogOpen(true),
        startIcon: <AddIcon/>
    }];

    useEffect(() => {
        refetchVenues();
        refetchArtist();
        refetchFundraising();
    }, []);

    return (
        <PanelPaperComponent title="Le tue raccolte fondi" actions={actions}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={2}>
                {fundraisings?.map((fundraising) => (
                    <FundraisingCardComponent
                        fundraising={fundraising}
                        buttons={getActionsFromStatus(fundraising.status as FundraisingStatusKey)}
                    />
                ))}
            </Box>
            {
                isDialogOpen && (
                    <ArtistCreateFundraisingDialog
                        isDialogOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        venues={venues?.venues ?? []}
                        userId={profileUser?.userId ?? ""}
                    />
                )
            }
        </PanelPaperComponent>

    );
}

export default ArtistFundraisingPanel;