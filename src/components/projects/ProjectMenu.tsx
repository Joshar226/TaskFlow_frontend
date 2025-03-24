import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  PencilIcon, TrashIcon
} from '@heroicons/react/16/solid'
import { BsThreeDots } from 'react-icons/bs'
import { Project } from '../../types'
import { useNavigate } from 'react-router-dom'

type ProjectMenuProps = {
  projectId: Project['_id']
}

export default function ProjectMenu({projectId} : ProjectMenuProps) {
  const navigate = useNavigate()
  
  const editProject = () => {
    navigate(`?viewProject=${projectId}`)
  }

  const deleteProject = () => {
    navigate(`?deleteProject=${projectId}`)
  }

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
              onClick={() => editProject()}
              className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
              <PencilIcon className="size-9 fill-white/30" />
              <p >Edit</p>
            </button>
          </MenuItem>
          <MenuItem>
            <button 
              onClick={() => deleteProject()}
              className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-pointer">
              <TrashIcon className="size-9 fill-white/30" />
              <p>Delete</p>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
