import {type ReactElement} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "@/components";
import {AppRoutes} from "@/utils";
import ScreenSpinner from "@components/ui/ScreenSpinner.tsx";

type ProtectedRouteProps = {
    children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <ScreenSpinner/>
    }

    if (!isAuthenticated) {
        return <Navigate to={AppRoutes.LOGIN} replace />;
    }

    return children;
};

