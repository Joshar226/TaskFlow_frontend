import { create } from "zustand";

type Store = {
    manager: boolean
    setManager: (manager : boolean) => void
}

export const useStore = create<Store>((set) => ({
    manager: false,
    setManager: (manager) => {
        set(() => ({
            manager
        }))
    }
}))