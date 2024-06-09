'use client';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { GithubUserInterface } from '@/interfaces/github-user.interface';

export interface GitUserDataContextType {
    userData: GithubUserInterface | null;
    setUserData: (data: GithubUserInterface) => void;
}

const UserDataContext = createContext<GitUserDataContextType | undefined>(undefined);
async function getData() {
    const response = await fetch('/api/github/user');
    const result: GithubUserInterface = await response.json();
    return result;
}
export default function UserDataProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<GithubUserInterface | null>(null);
    useEffect(() => {
        async function fetchData() {
                const initialData = await getData();
            setUserData(initialData);
        }
            fetchData();
    }, []);
    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
}

export const useGithubUser = () => {
    const context = useContext(UserDataContext);

    if(!context){
        throw new Error("useTheme must be used within a UserDataProvider");
    }
    return context;
}

