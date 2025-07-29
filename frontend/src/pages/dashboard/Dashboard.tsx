import { LogOut } from 'lucide-react';

import { Button } from 'src/components/buttons/Button';
import { useAuth } from 'src/hooks/useAuth';
import axiosInstance from 'src/utils/axios';


const Dashboard = () => {
    const { setUser } = useAuth();


    const handleSubmit = () => {
        axiosInstance.post(
            '/api/logout/', {}
        ).then((response) => {  
            setUser(null);
        });
    };


    return <>
        Hello!
        <Button 
            buttonClass='primary'
            buttonText='Logout'
            id='logoutButton'
            Icon={LogOut}
            iconAfterProps={{
                'color': '#f9fafb',
                'size': '16'
            }}
            iconAfter={true}
            onClick={handleSubmit}
            type='submit'
        />
    </>;
};


export default Dashboard;