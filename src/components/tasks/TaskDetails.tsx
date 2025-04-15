import { Task } from "../../types"
import { FaArrowRight } from "react-icons/fa6";
import CreateNoteForm from "../notes/CreateNoteForm";
import { formatDate } from "../../utils/utils";
import DeleteNoteForm from "../notes/DeleteNoteForm";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import ChangeStatusForm from "./ChangeStatusForm";

type TaskDetailsProps = {
    task: Task
}

export default function TaskDetails({task} : TaskDetailsProps) {
    
    const { data: user } = useAuth()

    if(user)
  return (
    <>
        <h1 className="task-details-title">{task.title}</h1>
        <p className="task-details-description">{task.description}</p>

        <div>
            {task.completedBy.map( completedByInfo => (
                <div key={completedByInfo._id} className="completed-by-info">
                    <p>{completedByInfo.user.name}</p>
                    <FaArrowRight />
                    <p>{completedByInfo.status}</p>
                </div>
            ))}
        </div>

        <div>
            <h2 className="notes-title">Change Status</h2>
            <ChangeStatusForm task={task} />
        </div>

        <div className="notes-content">
            <h2 className="notes-title">Notes</h2>
            <CreateNoteForm task={task} />

            <div className="notes-info">
                {task.notes.map ( note => (
                    <div key={note._id} className="note-info-flex">
                        <div className="note-info-content">
                            <p>{note.content}</p>
                            <FaArrowRight />
                            <p><span className="note-created-by">Created by:</span> {note.createdBy.name}</p>
                            <p><span className="note-created-by">at:</span> {formatDate(note.createdAt)}</p>
                        </div>

                        {isManager(note.createdBy._id, user._id) && <DeleteNoteForm task={task} note={note} />}
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}
