import {Navigate} from "react-router-dom";
import {useAuth} from "@/components";
import {MusicVirusRoutesEnum} from "@/utils";

const DefaultDashboardRedirect = () => {
    const { profileUser } = useAuth();

    const target =
        profileUser?.role === "ROLE_ADMIN"
            ? MusicVirusRoutesEnum.ADMIN_GENERAL_DASHBOARD
            : MusicVirusRoutesEnum.EVENT;

    return <Navigate to={target} replace />;
};

export default DefaultDashboardRedirect;
