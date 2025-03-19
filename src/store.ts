import { create } from 'zustand'

type Store = {
    modal: boolean
    showModal: () => void
    hideModal: () => void
}

export const useStore = create<Store>((set) => ({
    modal: false,
    showModal: () => {
        set(() => ({
            modal: true
        }))
    },
    hideModal: () => {
        set(() => ({
            modal: false
        }))
    },
}))