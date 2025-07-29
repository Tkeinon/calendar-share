import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/context/AuthContext';
import AppRoutes from 'src/routes/AppRouter';


function App() {
    return <>
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    </>;
}


export default App;
