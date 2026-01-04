import {Navigate} from "react-router-dom";
import {useAuth} from "@/components";
import {AppRoutes, UserAuthRoleEnum} from "@/utils";

export default function DefaultDashboardRedirect() {
    const { authUser } = useAuth();

    const target =
        authUser?.role === UserAuthRoleEnum.ROLE_ADMIN
            ? AppRoutes.ADMIN.GENERAL_DASHBOARD
            : AppRoutes.SECTION.EVENT;

    return <Navigate to={target} replace />;
};

