import { Navigate, Outlet } from 'react-router-dom';
import Topbar from 'src/components/topbar/Topbar';
import { useAuth } from 'src/hooks/useAuth';


const AuthenticatedRoute = () => {
    const { isAuthResolved, user } = useAuth();

    if (!isAuthResolved) {
        return;
    }

    return user
        ? <>
            <Topbar />
            <Outlet />
        </>
        : <Navigate to='/' replace />;
};


export default AuthenticatedRoute;