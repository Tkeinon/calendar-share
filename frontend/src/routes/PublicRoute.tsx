import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';


const PublicRoute = () => {
    const { user } = useAuth();
    
    return !user 
        ? <Outlet /> 
        : <Navigate to='/dashboard' replace />;
};


export default PublicRoute;