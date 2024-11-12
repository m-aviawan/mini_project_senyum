import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface IAuthStore {
    role: string,
    username: string,
    token: string,
    isVerified: boolean,
    isGoogleRegistered: boolean,
    res?: any,
}

const authStore = create(persist((set) => ({
    role: '',
    username: '',
    token: '',
    isVerified: false,
    isGoogleRegistered: false,
    res: '',

    setRes: (res: any) => set({res}),
    setAuth: ({role, username, token, isVerified, isGoogleRegistered}: IAuthStore) => {
        set({ role, username, token, isVerified, isGoogleRegistered })
    },
    setLogOut: () => set({ role: '', username: '', token: '', isVerified: false, isGoogleRegistered: false }),
    setKeepAuth: ({role, username, isVerified, isGoogleRegistered}: Pick<IAuthStore, 'username' | 'role' | 'isVerified' | 'isGoogleRegistered'>) => set({ role, username, isVerified, isGoogleRegistered }),
}), {
    name: 'authToken',
    partialize: (state: any) => ({token: state.token})
}))

export default authStore