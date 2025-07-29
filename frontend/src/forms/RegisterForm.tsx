import { useState } from 'react';
import { FilePen } from 'lucide-react';

import axiosInstance from 'src/utils/axios';
import styles from 'src/forms/forms.module.css';
import { LabelInput } from 'src/components/inputs/Input';
import { Button } from 'src/components/buttons/Button';


type RegisterResponse = {
    email: string;
    username: string;
    password1: string;
    password2: string;
}

const RegisterForm = ({onSuccessRegistration}: {onSuccessRegistration: () => void}) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setsuccessMessage] = useState<string>('');

    const isValid = () => {
        if (password1 !== password2) {
            setError('Passwords must match');
            return false;
        }

        if (!username) {
            setError('Username is required');
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (!isValid) {
            return;
        }

        const formData: RegisterResponse = {
            'username': username,
            'password1': password1,
            'password2': password2,
            'email': email
        }; 

        axiosInstance.post(
            '/api/register/', formData
        ).then(() => {
            setsuccessMessage('Registeration succesful. You\'ll be redirected shortly');
            setTimeout(() => {
                setsuccessMessage('');
                onSuccessRegistration();
            }, 2000);
        }).catch((error) => {
            const errorMsg = error.response?.data?.error;
            setError(errorMsg || 'Unknown error');
        });
    };

    return <div className={styles['login-form']}>
        <h2>Register</h2>
        <LabelInput 
            labelText='Username'
            name='usernameField'
            onChange={setUsername}
            placeholder='Username'
            value={username}
            required={true}
        />
        <LabelInput 
            labelText='Email'
            name='emailField'
            onChange={setEmail}
            placeholder='Email'
            value={email}
            required={false}
        />
        <LabelInput 
            labelText='Password'
            name='passwordField1'
            onChange={setPassword1}
            placeholder='Password'
            type='password'
            value={password1}
            required={true}
        />
        <LabelInput 
            labelText='Password, again'
            name='passwordField2'
            onChange={setPassword2}
            placeholder='Password'
            type='password'
            value={password2}
            required={false}
        />
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.error}>{successMessage}</p>}
        <Button 
            buttonClass='primary'
            buttonText='Register'
            id='registerForm'
            Icon={FilePen}
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


export default RegisterForm;