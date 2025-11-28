import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {useGetAdminStats} from "@pages/homePage/hooks/useGetAdminStats.ts";
import {Box, Icon, Typography} from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import type {SvgIconComponent} from "@mui/icons-material";
import {MusicVirusRoutesEnum} from "@/utils";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setActiveTab} from "@store/sidebar/slice.ts";
import './adminGeneralPanel.scss'

function getUserCounterIconAndLink(type: string): {
    icon: SvgIconComponent,
    redirectRoute?: string
} {
    switch (type) {
        case 'Fans':
            return {icon: PeopleOutlineIcon, redirectRoute: MusicVirusRoutesEnum.ADMIN_FAN_MANAGEMENT};
        case 'Artists':
            return {icon: HeadphonesOutlinedIcon, redirectRoute: MusicVirusRoutesEnum.ADMIN_ARTIST_MANAGEMENT};
        case 'Venues':
            return {icon: StoreOutlinedIcon, redirectRoute: MusicVirusRoutesEnum.ADMIN_VENUE_MANAGEMENT};
        default:
            return {icon: PeopleOutlineIcon};
    }

}

const AdminGeneralPanel = () => {
    const {data} = useGetAdminStats();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectCardClick = (redirectRoute: string | undefined) => {
        if (redirectRoute) {
            navigate(`${MusicVirusRoutesEnum.MUSIC_VIRUS}/${redirectRoute}`);
            dispatch(setActiveTab(redirectRoute));
        }
    }

    return (
        <PanelPaperComponent title="Statistiche piattaforma">
            <Box display="flex" gap={3}>
                <Box display="flex" flexDirection="column" gap={3} width="50%">
                    <Box className="counterContainer">
                        {data?.counters.map((counter) => {
                                const {icon, redirectRoute} = getUserCounterIconAndLink(counter.type);
                                return (
                                    <Box
                                        className="counterCard"
                                        onClick={() => handleRedirectCardClick(redirectRoute)}
                                    >
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Icon component={icon} sx={{fontSize: 50, color: "#fafafa"}}/>
                                            <Typography color="white" fontWeight="bold">
                                                {counter.type}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={"#de80ff"} fontWeight="bold" fontSize="30px">
                                                {counter.count}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            }
                        )}
                    </Box>
                    <Box
                        className="approveRequestCard"
                        onClick={() => handleRedirectCardClick(MusicVirusRoutesEnum.ADMIN_ARTIST_MANAGEMENT)}
                    >
                        <Typography fontWeight="normal" color="#fafafa">
                            {data?.artistApprovingRequestsCounter === 0 ?
                                (<>Nessuna richiesta di approvazione da parte di artisti</>) :
                                (<>
                                    Hai <span style={{color: "#fbaa2f"}}> {data?.artistApprovingRequestsCounter} </span>
                                    richieste di approvazione da parte di artisti
                                </>)
                            }
                        </Typography>
                    </Box>
                    <Box
                        className="approveRequestCard"
                        onClick={() => handleRedirectCardClick(MusicVirusRoutesEnum.ADMIN_REPORT_MANAGEMENT)}
                    >
                        {/*TODO*/}
                        <Typography color='white'>Segnalazioni</Typography>
                    </Box>
                </Box>

                <Box
                    className="approveRequestCard"
                    onClick={() => handleRedirectCardClick(MusicVirusRoutesEnum.ADMIN_PAYMENTS_MANAGEMENT)}
                >
                    {/*TODO*/}
                    <Typography color='white'>Pagamenti</Typography>
                </Box>
            </Box>
        </PanelPaperComponent>
    );
}

export default AdminGeneralPanel;