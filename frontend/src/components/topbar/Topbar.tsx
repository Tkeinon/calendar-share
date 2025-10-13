import { LogOut } from 'lucide-react';

import { Button } from 'src/components/buttons/Button';
import { useAuth } from 'src/hooks/useAuth';
import axiosInstance from 'src/utils/axios';
import styles from 'src/components/topbar/topbar.module.css';
import Logo from 'src/assets/logo.svg?react';
import { NavLink } from 'react-router-dom';


const Topbar = () => {
    const { setUser } = useAuth();


    const handleSubmit = () => {
        axiosInstance.post(
            '/api/logout/', {}
        ).then(() => {  
            setUser(null);
        });
    };


    return <div className={styles.navbar}>
        <div className={styles['inner-navbar']}>
            <div className={styles['brand']}>
                <Logo className={styles['brand-logo']} />
                <span>ShaCal</span>
            </div>
            <div className={styles['links']}>
                <NavLink to='/dashboard'>Dashboard</NavLink>
                <NavLink to='/calendar'>Calendar</NavLink>
            </div>
            <div className={styles['right-navbar']}>
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
            </div>
        </div>
    </div>;
};


export default Topbar;