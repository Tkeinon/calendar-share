import { useState } from 'react';
import { LogIn } from 'lucide-react';

import axiosInstance from 'src/utils/axios';
import styles from 'src/forms/forms.module.css';
import { LabelInput } from 'src/components/inputs/Input';
import { Button } from 'src/components/buttons/Button';
import { useAuth } from 'src/hooks/useAuth';
import type { User } from 'src/context/AuthContext';

type LoginResponse = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const { setUser } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


    const handleSubmit = () => {
        const formData: LoginResponse = {
            'username': username,
            'password': password
        }; 

        axiosInstance.post(
            '/api/login/', formData
        ).then((response) => {
            const user: User = response?.data?.user;
            setUser(user);
        }).catch((error) => {
            const errorMsg = error.response?.data?.error;
            setError(errorMsg || 'Unknown error');
        });
    };

    return <div className={styles['login-form']}>
        <h2>Login</h2>
        <LabelInput 
            labelText='Username'
            name='usernameField'
            onChange={setUsername}
            placeholder='Username or Email'
            value={username}
            required={true}
        />
        <LabelInput 
            labelText='Password'
            name='passwordField'
            onChange={setPassword}
            placeholder='Password'
            type='password'
            value={password}
            required={true}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button 
            buttonClass='primary'
            buttonText='Login'
            id='loginForm'
            Icon={LogIn}
            iconAfterProps={{
                'color': '#f9fafb',
                'size': '16'
            }}
            iconAfter={true}
            onClick={handleSubmit}
            type='submit'
        />
    </div>;
};


export default LoginForm;