import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from 'src/pages/authentication/AuthenticationPage';
import PublicRoute from 'src/routes/PublicRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from 'src/pages/dashboard/Dashboard';


const AppRoutes = () => <Routes>
    {/* TODO: Create a proper landing page */}
    <Route path='/' element={<AuthenticationPage />}>
        <Route element={<PublicRoute />}>
             <Route path='/' element={<AuthenticationPage />} />
        </Route>
    </Route>

    <Route element={<AuthenticatedRoute /> }>
        <Route path='/dashboard' element={<Dashboard />} />
    </Route>
</Routes>;


export default AppRoutes;