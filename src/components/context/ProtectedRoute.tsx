import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "@/components";
import {MusicVirusRoutesEnum} from "@/utils";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return null; // oppure un <FullScreenSpinner/>
    }

    if (!isAuthenticated) {
        return <Navigate to={MusicVirusRoutesEnum.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;
