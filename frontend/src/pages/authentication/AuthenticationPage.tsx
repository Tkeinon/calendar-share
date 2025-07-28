import LoginForm from '../../forms/LoginForm';
import styles from './authentication.module.css';

const AuthenticationPage = () => {
    return <div className={styles.container}>
        <div className={styles['left-panel']}>
            <h1 className={styles.title}>Share Calendar</h1>
            <p className={styles.subtitle}>Plan. Schedule. Enjoy.</p>
        </div>
        <div className={styles['right-panel']}>
            <LoginForm />
        </div>
    </div>;
};


export default AuthenticationPage;