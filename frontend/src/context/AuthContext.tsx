import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';


type User = {
    id: string;
    username: string;
    email?: string;
};


type AuthContextType = {
    isAuthResolved: boolean;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: {children: React.ReactNode }) => {
    const [inited, setInited] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthResolved, setIsAuthResolved] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!inited) {
            const checkAuth = () => {
                axiosInstance.get(
                    '/api/user-info/'
                ).then((response) => {
                    if (Object.keys(response?.data?.user).length) {
                        setUser(response?.data?.user);
                        
                    }
                }).finally(() => setIsAuthResolved(true));
            };
    
            checkAuth();
            setInited(true);
        }
    }, [inited, navigate]);

    return <AuthContext.Provider value={{ isAuthResolved, user, setUser }}>
        {children}
    </AuthContext.Provider>;
};


export {
    AuthContext,
    AuthProvider,
    User,
};
