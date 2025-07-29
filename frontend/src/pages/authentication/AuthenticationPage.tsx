import { useState } from 'react';
import LoginForm from 'src/forms/LoginForm';
import RegisterForm from 'src/forms/RegisterForm';
import styles from 'src/pages/authentication/authentication.module.css';

const AuthenticationPage = () => {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

    return <div className={styles.container}>
        <div className={styles['left-panel']}>
            <h1 className={styles.title}>Share Calendar</h1>
            <p className={styles.subtitle}>Plan. Schedule. Enjoy.</p>
        </div>
        <div className={styles['right-panel']}>
            {showLoginForm 
                ? <LoginForm /> 
                : <RegisterForm onSuccessRegistration={() => setShowLoginForm(true)} />}
        <div className={styles.footer}>
                <span onClick={() => setShowLoginForm(!showLoginForm)}>
                    A new user? Register!
                </span>
            </div>
        </div>
    </div>;
};


export default AuthenticationPage;