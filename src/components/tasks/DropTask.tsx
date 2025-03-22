import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}

export default function DropTask({status} : DropTaskProps) {

    const {isOver, setNodeRef} = useDroppable({
        id: status
    })

    const style = {
        opacity: isOver ? 0.35 : undefined
    }
  return (
    <div
        style={style}
        ref={setNodeRef}
        className="drop-task-div"
    >Drag Task Here</div>
  )
}
