import {Avatar, Box, Card, CardContent, Chip, Link, Typography} from "@mui/material";
import {AuthRole, useAuth} from "@components";
import CreateIcon from '@mui/icons-material/Create';
import {MapPicker} from "@components/MapPicker";
import {useState} from "react";
import PersonalProfileEditDialog from "./PersonalProfileEditDialog.tsx";

function renderGenresCards(genres: string[]) {
    return (
        <Box display="flex" gap={3} alignItems="baseline">
            <Typography variant="h7" color="white" fontWeight="bold">
                I tuo generi:
            </Typography>
            <Box display="flex" gap={2}>
                {genres.map((genre) => (
                    <Chip
                        key={genre}
                        label={genre}
                        size="medium"
                        sx={{
                            backgroundColor: '#6b21a8',
                            color: 'white',
                            cursor: 'pointer',
                            ":hover": {backgroundColor: '#a855f7'}
                        }}

                    />
                ))}
            </Box>
        </Box>
    )
}

const PersonalProfilePanel = () => {
    const {profileUser} = useAuth();

    const [isEditModalOpen, setIsModalOpen] = useState<boolean>(false);

    localStorage.setItem('TEST_KEY', 'ok');

    return (
        <>
            <Typography variant="h4" color="white" fontWeight="bold">
                Il tuo profilo
            </Typography>
            <Card variant="outlined">
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={5}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex" alignItems="baseline" gap={4}>
                                <Avatar
                                    sx={{bgcolor: "#a855f7", width: 56, height: 56}}
                                >
                                    {profileUser?.name[0]}{profileUser?.surname[0]}
                                </Avatar>
                                <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
                                    {profileUser?.name} {profileUser?.surname}
                                </Typography>
                            </Box>
                            <Box>
                                <CreateIcon
                                    sx={{color: 'white', cursor: 'pointer'}}
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="baseline" gap={2}>
                            <Typography variant="h7" color="white" gutterBottom>
                                <b>Email</b>: {profileUser?.email}
                            </Typography>
                            {profileUser?.role === "ARTIST" as AuthRole && (
                                <>
                                    <Typography variant="h7" color="white" gutterBottom>
                                        {renderGenresCards(profileUser?.artistGenres || [])}
                                    </Typography>
                                    <Typography variant="h7" color="white" gutterBottom>
                                        <b>Il tuo social</b>:
                                        <Link
                                            target="_blank"
                                            href={profileUser.artistSocial}>{profileUser?.artistSocial}
                                        </Link>
                                    </Typography>
                                </>
                            )}
                            {profileUser?.role === "VENUE" as AuthRole && (
                                <>
                                    <Typography variant="h7" color="white" gutterBottom>
                                        <b>Il tuo locale</b>: {profileUser?.venueName}
                                    </Typography>
                                    <MapPicker
                                        value={
                                            profileUser?.venueAddress
                                                ? {
                                                    lat: profileUser.venueAddress.latitude,
                                                    lng: profileUser.venueAddress.longitude
                                                }
                                                : undefined
                                        }
                                        onChange={() => {
                                        }}
                                        viewOnly={true}
                                    />
                                </>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <PersonalProfileEditDialog
                isOpen={isEditModalOpen}
                onClose={() => setIsModalOpen(false)}
                profile={profileUser!}
            />
        </>
    );
}

export default PersonalProfilePanel;
