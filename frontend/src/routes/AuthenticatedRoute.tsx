import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';


const AuthenticatedRoute = () => {
    const { user } = useAuth();

    return user
        ? <Outlet />
        : <Navigate to='/' replace />;
};


export default AuthenticatedRoute;