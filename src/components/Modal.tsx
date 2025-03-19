import { IoCloseCircle } from "react-icons/io5";
import { useStore } from "../store";


export default function Modal({children} : {children : React.ReactNode}) {

    const hideModal = useStore((store) => store.hideModal)

  return (
    <div className="modal-bg">
        <div className="modal-div">
          <IoCloseCircle 
              className="modal-btn-close"
              onClick={hideModal}
          />

          <div className="modal-form-div">
            {children}
          </div>

        </div>
    </div>
  )
}
