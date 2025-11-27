import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {useGetAdminStats} from "@pages/homePage/hooks/useGetAdminStats.ts";
import {UserCounterCardComponent} from "@components/UserCounterCardComponent.tsx";
import {Box} from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import type {SvgIconComponent} from "@mui/icons-material";
import {MusicVirusRoutesEnum} from "@/utils";

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

    return (
        <PanelPaperComponent
            title="Statistiche piattaforma"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                }}
            >
                {/*User section*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        width: '50%'
                    }}
                >
                    {/*Counters*/}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                        }}
                    >
                        {data?.counters.map((counter) => {
                                const {icon, redirectRoute} = getUserCounterIconAndLink(counter.type);
                                return (
                                    <UserCounterCardComponent
                                        text={counter.type}
                                        number={counter.count}
                                        icon={icon}
                                        redirectRoute={redirectRoute}
                                    />
                                )
                            }
                        )}
                    </Box>
                    {/*Approve request*/}
                    <Box>
                        approve
                    </Box>
                    {/*Report*/}
                    <Box>
                        report
                    </Box>
                </Box>

                {/*Money section*/}
                <Box
                >
                    ciao
                </Box>
            </Box>
        </PanelPaperComponent>
    );
}

export default AdminGeneralPanel;