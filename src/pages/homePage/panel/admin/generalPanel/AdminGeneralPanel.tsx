import PanelPaperComponent from "@components/ui/PanelPaperComponent.tsx";
import {Box, Icon, Typography} from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import type {SvgIconComponent} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setActiveTab} from "@store/sidebar/slice.ts";
import './adminGeneralPanel.scss'
import {AppRoutes, type AppRouteValue, UserTypeEnum, type UserTypeKey} from "@utils";
import {useAdminStats} from "@api";

function getUserCounterIconAndLink(type: UserTypeKey): {
  icon: SvgIconComponent,
  redirectRoute?: AppRouteValue
} {
  switch (type) {
    case UserTypeEnum.FAN:
      return {icon: PeopleOutlineIcon, redirectRoute: AppRoutes.ADMIN.FAN_MANAGEMENT};
    case UserTypeEnum.ARTIST:
      return {icon: HeadphonesOutlinedIcon, redirectRoute: AppRoutes.ADMIN.ARTIST_MANAGEMENT};
    case UserTypeEnum.VENUE:
      return {icon: StoreOutlinedIcon, redirectRoute: AppRoutes.ADMIN.VENUE_MANAGEMENT};
    default:
      return {icon: PeopleOutlineIcon};
  }
}

const AdminGeneralPanel = () => {
  const {data} = useAdminStats();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirectCardClick = (redirectRoute: AppRouteValue | undefined) => {
    if (redirectRoute) {
      navigate(AppRoutes.MUSIC_VIRUS + "/" + redirectRoute);
      dispatch(setActiveTab(redirectRoute as string));
    }
  }

  return (
    <PanelPaperComponent title="Statistiche piattaforma">
      <Box display="flex" gap={3}>
        <Box display="flex" flexDirection="column" gap={3} width="50%">
          <Box className="counterContainer">
            {data?.counters.map((counter) => {
                const {icon, redirectRoute} = getUserCounterIconAndLink(counter.type as UserTypeKey);
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
            onClick={() => handleRedirectCardClick(AppRoutes.ADMIN.ARTIST_MANAGEMENT)}
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
            onClick={() => handleRedirectCardClick(AppRoutes.ADMIN.REPORT_MANAGEMENT)}
          >
            {/*TODO*/}
            <Typography color='white'>Segnalazioni</Typography>
          </Box>
        </Box>

        <Box
          className="approveRequestCard"
          onClick={() => handleRedirectCardClick(AppRoutes.ADMIN.PAYMENTS_MANAGEMENT)}
        >
          {/*TODO*/}
          <Typography color='white'>Pagamenti</Typography>
        </Box>
      </Box>
    </PanelPaperComponent>
  );
}

export default AdminGeneralPanel;