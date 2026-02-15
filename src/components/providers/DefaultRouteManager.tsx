import {Navigate} from "react-router-dom";
import {useAuth} from "@/components";
import {AppRoutes, UserAuthRoleEnum, type UserAuthRoleKey} from "@/utils";

export function getDefaultDashboardRoute(role: UserAuthRoleKey | undefined): string {
  switch (role) {
    case UserAuthRoleEnum.ROLE_ARTIST:
      return AppRoutes.SECTION.EVENT;
    case UserAuthRoleEnum.ROLE_VENUE:
      return AppRoutes.SECTION.EVENT;
    case UserAuthRoleEnum.ROLE_FAN:
      return AppRoutes.SECTION.EVENT;
    case UserAuthRoleEnum.ROLE_ADMIN:
        return AppRoutes.SECTION.EVENT;
    default:
      return AppRoutes.LOGIN;
  }
}

export default function DefaultDashboardRedirect() {
  const {authUser} = useAuth();
  const target = getDefaultDashboardRoute(authUser?.role);
  return <Navigate to={target} replace/>;
};

