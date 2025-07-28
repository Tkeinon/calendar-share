import React, { createContext, useState } from 'react';


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

    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>;
};


export {
    AuthContext,
    AuthProvider,
    User,
};
