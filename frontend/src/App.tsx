import { AuthProvider } from './context/AuthContext';
import AuthenticationPage from 'src/pages/authentication/AuthenticationPage';


function App() {
    return <>
        <AuthProvider>
            <AuthenticationPage />
        </AuthProvider>
    </>;
}


export default App;
