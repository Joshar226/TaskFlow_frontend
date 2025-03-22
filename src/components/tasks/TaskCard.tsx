import { useDraggable } from "@dnd-kit/core"
import { TaskProject } from "../../types";

type TaskCardProps = {
  task: TaskProject
};

export default function TaskCard({task} : TaskCardProps) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
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
  )
}
