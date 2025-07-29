import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';


type User = {
    id: string;
    username: string;
    email?: string;
};


type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: {children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            axiosInstance.get(
                '/api/user-info/'
            ).then((response) => {
                if (Object.keys(response?.data?.user).length) {
                    setUser(response?.data?.user);
                    navigate('/dashboard');
                }
            });
        };

        checkAuth();
    }, [navigate]);

    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>;
};


export {
    AuthContext,
    AuthProvider,
    User,
};
