import { Dialog, DialogPanel } from '@headlessui/react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Modal({children} : {children: React.ReactNode}) {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const projectId = queryParams.get('viewProject')

  const navigate = useNavigate()

  const closeModal = () => {
    navigate(location.pathname, {replace: true})
  }

  return (
    <>
      <Dialog open={projectId ? true : false} as="div" className=" relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-[80rem] rounded-xl bg-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
