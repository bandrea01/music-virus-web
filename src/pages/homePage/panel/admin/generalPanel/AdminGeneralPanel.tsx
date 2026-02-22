import PanelPaperComponent from "@components/ui/PanelPaperComponent.tsx";
import {Box, Icon, Typography} from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import FestivalIcon from '@mui/icons-material/Festival';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import type {SvgIconComponent} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import './adminGeneralPanel.scss'
import {AppRoutes, type AppRouteValue, handleRedirectCardClick, UserTypeEnum, type UserTypeKey} from "@utils";
import {useAdminEventsStats, useAdminUsersStats, useGetLast10IncomingPersonalTransactions} from "@api";
import {useAppDispatch} from "@store/hook.ts";
import {TransactionCardComponent, useAuth} from "@components";

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

function getEventCounterIconAndLink(type: string): {
  icon: SvgIconComponent,
  redirectRoute?: AppRouteValue
} {
  switch (type) {
    case "EVENTS":
      return {icon: FestivalIcon, redirectRoute: AppRoutes.SECTION.EVENT};
    case "FUNDRAISING":
      return {icon: MonetizationOnIcon, redirectRoute: AppRoutes.SECTION.FUNDRAISING};
    default:
      return {icon: PeopleOutlineIcon};
  }
}

function translateLabel(label: string): string {
  switch (label) {
    case "FAN":
      return "Fan";
    case "ARTIST":
      return "Artisti";
    case "VENUE":
      return "Location";
    case "EVENTS":
      return "Eventi";
    case "FUNDRAISING":
      return "Campagne";
    default:
      return label;
  }
}

const AdminGeneralPanel = () => {
  const {authUser} = useAuth();

  const {data: userStats} = useAdminUsersStats();
  const {data: eventsStats} = useAdminEventsStats();
  const {data: adminTransactions} = useGetLast10IncomingPersonalTransactions(authUser!.userId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <PanelPaperComponent title="Statistiche piattaforma">
      <Box display="flex" gap={3}>
        <Box display="flex" flexDirection="column" gap={1} width="50%">
          <PanelPaperComponent subtitle="Utenti in piattaforma">
            <Box className="counterContainer">
              {userStats?.counters.map((counter, idx) => {
                  const {icon, redirectRoute} = getUserCounterIconAndLink(counter.type as UserTypeKey);
                  return (
                    <Box
                      key={idx}
                      className="counterCard"
                      onClick={() => handleRedirectCardClick(redirectRoute, navigate, dispatch) }
                    >
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Icon component={icon} sx={{fontSize: 50, color: "#fafafa"}}/>
                        <Typography color="white" fontWeight="bold">
                          {translateLabel(counter.type)}
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
          </PanelPaperComponent>
          <PanelPaperComponent subtitle="Eventi e campagne">
            <Box
              className="counterContainer"
            >
              {eventsStats?.counters.map(((counter, idx) => {
                const {icon, redirectRoute} = getEventCounterIconAndLink(counter.type);
                return (
                  <Box
                    key={idx}
                    className="counterCard"
                    onClick={() => handleRedirectCardClick(redirectRoute, navigate, dispatch)}
                  >
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Icon component={icon} sx={{fontSize: 50, color: "#fafafa"}}/>
                      <Typography color="white" fontWeight="bold">
                        {translateLabel(counter.type)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography color={"#de80ff"} fontWeight="bold" fontSize="30px">
                        {counter.count}
                      </Typography>
                    </Box>
                  </Box>
                )
              }))}
            </Box>
          </PanelPaperComponent>
          <Box
            className="approveRequestCard"
            onClick={() => handleRedirectCardClick(AppRoutes.ADMIN.ARTIST_MANAGEMENT, navigate, dispatch)}
          >
            <Typography fontWeight="normal" color="#fafafa">
              {userStats?.artistApprovingRequestsCounter === 0 ?
                (<>Nessuna richiesta di approvazione da parte di artisti</>) :
                (<>
                  Hai <span style={{color: "#fbaa2f"}}> {userStats?.artistApprovingRequestsCounter} </span>
                  richieste di approvazione da parte di artisti
                </>)
              }
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={1} width="50%">
          <PanelPaperComponent subtitle="Movimenti in entrata">
            {adminTransactions?.length === 0 ?
              (
                <Box
                  className="approveRequestCard"
                  onClick={() => handleRedirectCardClick(AppRoutes.ADMIN.ARTIST_MANAGEMENT, navigate, dispatch)}
                >
                  <Typography fontWeight="normal" color="#fafafa">
                    Nessun movimento registrato
                  </Typography>
                </Box>
              ) :
              (
                adminTransactions?.map((transaction) => (
                  <TransactionCardComponent
                    key={transaction.transactionId}
                    transaction={transaction}
                    isAdminDashboard={true}
                  />
                ))
              )
            }
          </PanelPaperComponent>
        </Box>
      </Box>
    </PanelPaperComponent>
  );
}

export default AdminGeneralPanel;