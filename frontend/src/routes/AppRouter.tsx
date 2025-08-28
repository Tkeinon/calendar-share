import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from 'src/pages/authentication/AuthenticationPage';
import PublicRoute from 'src/routes/PublicRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from 'src/pages/dashboard/Dashboard';
import CalendarPage from 'src/pages/calendar/Calendar';


const AppRoutes = () => <Routes>
    {/* TODO: Create a proper landing page */}
    <Route element={<PublicRoute />}>
            <Route path='/' element={<AuthenticationPage />} />
    </Route>

    <Route element={<AuthenticatedRoute /> }>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/calendar' element={<CalendarPage />} />
    </Route>
</Routes>;


export default AppRoutes;