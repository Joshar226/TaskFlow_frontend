import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  PencilIcon, TrashIcon, RectangleGroupIcon 
} from '@heroicons/react/16/solid'
import { BsThreeDots } from 'react-icons/bs'
import { Task } from '../../types'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'

type ProjectMenuProps = {
  taskId: Task['_id']
}

export default function TaskMenu({taskId} : ProjectMenuProps) {

  const manager = useStore((store) => store.manager)

  const navigate = useNavigate()
  
  return (
    <div className="text-right">
      <Menu>
        <MenuButton>
          <BsThreeDots className="task-three-dots"/>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-56 origin-top-right rounded-xl border border-white/5 bg-gray-900 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button 
              onClick={() => navigate(`?viewTask=${taskId}`)}
              className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
              <RectangleGroupIcon className="size-9 fill-white/30" />
              <p>View Details</p>
            </button>
          </MenuItem>

          {manager && <>
            <MenuItem>
              <button 
                onClick={() => navigate(`?editTask=${taskId}`)}
                className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
                <PencilIcon className="size-9 fill-white/30" />
                <p >Edit</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button 
                onClick={() => navigate(`?deleteTask=${taskId}`)}
                className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
                <TrashIcon className="size-9 fill-white/30" />
                <p>Delete</p>
              </button>
            </MenuItem>
          </>}
        </MenuItems>
      </Menu>
    </div>
  )
}
