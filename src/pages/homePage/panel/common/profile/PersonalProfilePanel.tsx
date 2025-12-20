import { Avatar, Box, Chip, Link, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useMemo, useState } from "react";

import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import { MapPicker } from "@components/MapPicker.tsx";
import PersonalProfileEditDialog from "./PersonalProfileEditDialog.tsx";
import { useAuth, AuthRole } from "@components";

type LatLng = { lat: number; lng: number };

function GenresRow({ genres }: { genres: string[] }) {
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
                            ":hover": { backgroundColor: "#a855f7" },
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
                <Avatar sx={{ bgcolor: "#a855f7", width: 56, height: 56 }}>
                    {initials}
                </Avatar>

                <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
                    {fullName}
                </Typography>
            </Box>

            <CreateIcon sx={{ color: "white", cursor: "pointer" }} onClick={onEdit} />
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

const PersonalProfilePanel = () => {
    const { profileUser } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        return { lat: addr.latitude, lng: addr.longitude };
    }, [profileUser?.venueAddress]);

    if (!profileUser) return null;

    const isArtist = profileUser.role === AuthRole.ROLE_ARTIST;
    const isVenue = profileUser.role === AuthRole.ROLE_VENUE;

    return (
        <>
            <PanelPaperComponent title="Il tuo profilo">
                <Box display="flex" flexDirection="column" gap={5}>
                    <ProfileHeader
                        initials={initials}
                        fullName={fullName}
                        onEdit={() => setIsEditModalOpen(true)}
                    />

                    <Box display="flex" flexDirection="column" alignItems="baseline" gap={2}>
                        <ProfileInfoLine label="Email">{profileUser.email}</ProfileInfoLine>

                        {isArtist && (
                            <>
                                <GenresRow genres={profileUser.artistGenres ?? []} />

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

                                <MapPicker value={venueCoords} onChange={() => {}} viewOnly />
                            </>
                        )}
                    </Box>
                </Box>
            </PanelPaperComponent>

            <PersonalProfileEditDialog
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                profile={profileUser}
            />
        </>
    );
};

export default PersonalProfilePanel;
