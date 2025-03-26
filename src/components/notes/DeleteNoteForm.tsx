import { useForm } from "react-hook-form"
import { Note, Task } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../api/NoteAPI"
import { toast } from "react-toastify"

type DeleteNoteForm = {
    task: Task
    note: Note
}

export default function DeleteNoteForm({task, note} : DeleteNoteForm) {


    const queryClient = useQueryClient()

    const {handleSubmit} = useForm()

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['task']})
            toast.success(data)
        }
    })

    const handleDeleteNote = () => {
        const data = {
            projectId: task.project,
            taskId: task._id,
            noteId: note._id
        }
        mutate(data)
    }

  return (
    <form
        onSubmit={handleSubmit(handleDeleteNote)}
    >
        <input
            type="submit"
            value='Delete Note'
            className="submit-form delete-project-form"
        />
    </form>
  )
}
