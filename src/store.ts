import { create } from 'zustand'

type Store = {
    modal: boolean
    editProject: boolean
    addCollaborator: boolean
    deleteProject: boolean
    manageCollaborators: boolean
    createTask: boolean
    showModal: () => void
    hideModal: () => void
    showEditProject: () => void
    showAddCollaborator: () => void
    showDeleteProject: () => void
    showManageCollaborators: () => void
    showCreateTask: () => void
}

export const useStore = create<Store>((set) => ({
    modal: false,
    editProject: false,
    addCollaborator: false,
    deleteProject: false,
    manageCollaborators: false,
    createTask: false,
    showModal: () => {
        set(() => ({
            modal: true,
        }))
    },
    hideModal: () => {
        set(() => ({
            modal: false,
            editProject: false,
            addCollaborator: false,
            deleteProject: false,
            manageCollaborators: false,
            createTask: false
        }))
    },
    showEditProject: () => {
        set(() => ({
            editProject: true,
            modal: true
        }))
    },
    showAddCollaborator: () => {
        set(() => ({
            addCollaborator: true,
            modal: true
        }))
    },
    showDeleteProject: () => {
        set(() => ({
            deleteProject: true,
            modal: true
        }))
    },
    showManageCollaborators: () => {
        set(() => ({
            manageCollaborators: true,
            modal: true
        }))
    },
    showCreateTask: () => {
        set(() => ({
            createTask: true,
            modal: true
        }))
    }
}))