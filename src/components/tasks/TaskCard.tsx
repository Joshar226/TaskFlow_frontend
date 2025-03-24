import { useDraggable } from "@dnd-kit/core"
import { TaskProject } from "../../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStore } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";

type TaskCardProps = {
  task: TaskProject
};

export default function TaskCard({task} : TaskCardProps) {

  const location = useLocation()
  const navigate = useNavigate()

  const showTaskDetails = useStore((store) => store.showTaskDetails)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    padding: '1rem 2rem',
    backgroundColor: '#000',
    display: 'flex',
    borderRadius: '1rem',
    FlexDirection: 'column'
  } : undefined

  const showTaskDetailsFunc = () => {
    navigate(location.pathname + `?task=${task._id}`)
    showTaskDetails()
  }

  return (
    <div className="task-card-flex">
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
        className="task-card"
      >
        <p className="task-title-card">{task.title}</p>
        <p className="task-description-card">{task.description}</p>
      </div>

      <BsThreeDotsVertical
        className="task-three-dots"
        onClick={() => showTaskDetailsFunc()} />
    </div>
  )
}
