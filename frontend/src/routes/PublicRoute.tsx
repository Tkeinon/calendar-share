import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';


const PublicRoute = () => {
    const { isAuthResolved, user } = useAuth();

    if (!isAuthResolved) {
        return;
    }

    return !user 
        ? <Outlet /> 
        : <Navigate to='/dashboard' replace />;
};


export default PublicRoute;