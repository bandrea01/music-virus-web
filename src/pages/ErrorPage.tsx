import {Box, Typography} from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function ErrorPage() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <WarningAmberIcon
                color="primary"
                sx={{fontSize: 80, mr: 2}}
            />
            <Typography variant="h5">
                Errore: qualcosa è andato storto
            </Typography>
        </Box>
    );
}
