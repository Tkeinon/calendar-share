import { Navigate, Outlet } from 'react-router-dom';
import Topbar from 'src/components/topbar/Topbar';
import { useAuth } from 'src/hooks/useAuth';


const AuthenticatedRoute = () => {
    const { user } = useAuth();

    return user
        ? <>
            <Topbar />
            <Outlet />
        </>
        : <Navigate to='/' replace />;
};


export default AuthenticatedRoute;