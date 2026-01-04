import {Avatar, Box, Button, Chip, Link, Typography} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import {type ReactElement, useMemo, useState} from "react";
import {MapPicker, PanelPaperComponent, useAuth} from "@components";
import type {LatLng} from "leaflet";
import {formatDateWithTime, UserAuthRoleEnum} from "@utils";
import {PersonalProfileEditDialog} from "@pages";
import {useGetBankAccount} from "@api";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DepositDialog from "@pages/homePage/panel/common/profile/DepositDialog.tsx";

//TODO: refactor

function GenresRow({genres}: { genres: string[] }) {
    if (!genres?.length) return null;

    return (
        <Box display="flex" gap={3} alignItems="baseline" flexWrap="wrap">
            <Typography variant="subtitle2" color="white" fontWeight="bold">
                I tuoi generi:
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
                {genres.map((genre) => (
                    <Chip
                        key={genre}
                        label={genre}
                        size="medium"
                        sx={{
                            backgroundColor: "#6b21a8",
                            color: "white",
                            cursor: "pointer",
                            ":hover": {backgroundColor: "#a855f7"},
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}

function ProfileHeader({
                           initials,
                           fullName,
                           onEdit,
                       }: {
    initials: string;
    fullName: string;
    onEdit: () => void;
}) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="baseline" gap={4}>
                <Avatar sx={{bgcolor: "#a855f7", width: 56, height: 56}}>
                    {initials}
                </Avatar>

                <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
                    {fullName}
                </Typography>
            </Box>

            <CreateIcon sx={{color: "white", cursor: "pointer"}} onClick={onEdit}/>
        </Box>
    );
}

function ProfileInfoLine({
                             label,
                             children,
                         }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Typography variant="body2" color="white" gutterBottom>
            <b>{label}</b>: {children}
        </Typography>
    );
}

export default function PersonalProfilePanel(): ReactElement | null {
    const {authUser, profileUser} = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

    const {data: bankAccount, isLoading} = useGetBankAccount();

    console.log(bankAccount);

    const initials = useMemo(() => {
        const n = profileUser?.name?.[0] ?? "";
        const s = profileUser?.surname?.[0] ?? "";
        return `${n}${s}` || "?";
    }, [profileUser?.name, profileUser?.surname]);

    const fullName = useMemo(() => {
        const n = profileUser?.name ?? "";
        const s = profileUser?.surname ?? "";
        return `${n} ${s}`.trim() || "Profilo";
    }, [profileUser?.name, profileUser?.surname]);

    const venueCoords: LatLng | undefined = useMemo(() => {
        const addr = profileUser?.venueAddress;
        if (!addr) return undefined;
        return {lat: addr.latitude, lng: addr.longitude};
    }, [profileUser?.venueAddress]);

    if (!profileUser) return null;

    const isArtist = authUser?.role === UserAuthRoleEnum.ROLE_ARTIST;
    const isVenue = authUser?.role === UserAuthRoleEnum.ROLE_VENUE;

    return (
        <>
            <PanelPaperComponent title="Il tuo profilo">
                <Box display="flex" flexDirection="column" justifyContent="space-between" gap={4} padding={2}>
                    <PanelPaperComponent subtitle="Informazioni personali" sx={{padding: 2, height: "100%"}}>
                        <Box display="flex" flexDirection="column" gap={5} height="80%">
                            <ProfileHeader
                                initials={initials}
                                fullName={fullName}
                                onEdit={() => setIsEditModalOpen(true)}
                            />

                            <Box display="flex" flexDirection="column" alignItems="baseline" gap={2}>
                                <ProfileInfoLine label="Email">{profileUser.email}</ProfileInfoLine>

                                {isArtist && (
                                    <>
                                        <GenresRow genres={profileUser.artistGenres ?? []}/>

                                        <ProfileInfoLine label="Il tuo social">
                                            <Link target="_blank" rel="noreferrer" href={profileUser.artistSocial}>
                                                {profileUser.artistSocial}
                                            </Link>
                                        </ProfileInfoLine>
                                    </>
                                )}

                                {isVenue && (
                                    <>
                                        <ProfileInfoLine label="Il tuo locale">
                                            {profileUser.venueName}
                                        </ProfileInfoLine>

                                        <MapPicker value={venueCoords} onChange={() => {
                                        }} viewOnly/>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </PanelPaperComponent>
                    <PanelPaperComponent subtitle="Conto" sx={{padding: 2}}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={2}>
                                <MonetizationOnIcon sx={{fontSize: "40px", color: "#cf7c25"}}/>
                                <Box display="flex" flexDirection="column">
                                    <Typography color="white" fontWeight="bold" fontSize="20px">
                                        Saldo conto: {bankAccount?.balance} €
                                    </Typography>
                                    <Typography color="white" fontWeight="bold" fontSize="10px">
                                        Ultimo aggiornamento: {bankAccount?.lastUpdate && formatDateWithTime(bankAccount?.lastUpdate ?? "")}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    onClick={() => setIsDepositDialogOpen(true)}
                                >
                                    Ricarica conto
                                </Button>
                            </Box>
                        </Box>
                    </PanelPaperComponent>
                </Box>
            </PanelPaperComponent>

            {isEditModalOpen && (
                <PersonalProfileEditDialog
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    profile={profileUser}
                />
            )}
            {isDepositDialogOpen && (
                <DepositDialog
                    isOpen={isDepositDialogOpen}
                    onClose={() => setIsDepositDialogOpen(false)}
                    account={bankAccount!}
                />
            )}
        </>
    );
};