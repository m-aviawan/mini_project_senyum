import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface IAuthStore {
    role: string,
    username: string,
    token: string,
    isVerified: boolean,
    isGoogleRegistered: boolean,
    profilePictureUrl: string,
    res?: any,
}

const authStore = create(persist((set) => ({
    role: '',
    username: '',
    token: '',
    isVerified: false,
    isGoogleRegistered: false,
    profilePictureUrl: '',
    res: '',

    setRes: (res: any) => set({res}),
    setAuth: ({role, username, token, isVerified, isGoogleRegistered, profilePictureUrl}: IAuthStore) => {
        if(profilePictureUrl) {
            set({ role, username, token, isVerified, isGoogleRegistered, profilePictureUrl })
        } else {
            set({ role, username, token, isVerified, isGoogleRegistered, profilePictureUrl: '' })
        }
    },
    setLogOut: () => set({ role: '', username: '', token: '', isVerified: false, isGoogleRegistered: false, profilePictureUrl: '' }),
    setKeepAuth: ({role, username, isVerified, isGoogleRegistered, profilePictureUrl}: Pick<IAuthStore, 'username' | 'role' | 'isVerified' | 'isGoogleRegistered' | 'profilePictureUrl'>) => {
        if(profilePictureUrl) {
            set({ role, username, isVerified, isGoogleRegistered, profilePictureUrl })
        } else {
            set({ role, username, isVerified, isGoogleRegistered, profilePictureUrl: '' })
        }
    },
}), {
    name: 'authToken',
    partialize: (state: any) => ({token: state.token})
}))

export default authStore