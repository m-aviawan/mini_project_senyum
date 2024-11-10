import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface IAuthStore {
    role: string,
    name: string,
    token: string
}

const authStore = create(persist((set) => ({
    role: '',
    name: '',
    token: '',

    setAuth: ({role, name, token}: IAuthStore) => set({ role, name, token }),
    setAutoLogOut: () => set({ role: '', name: '', token: '' }),
    setKeepAuth: ({role, name}: Pick<IAuthStore, 'name' | 'role'>) => set({ role, name }),
}), {
    name: 'authToken',
    partialize: (state: any) => ({token: state.token})
}))

export default authStore