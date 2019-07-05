import React from 'react'
import './modal.css'

 const Modal = ({onClose,onDelete})=> {
    return(
            <div className="modal-wrapper"> 
                <div className='modal_content'>
                    <span className="modal_label">Are You Sure?</span>
                  <div>
                    <button className='sure' onClick={onDelete}>I`m sure</button>
                    <button className='cancel' onClick={onClose}>Cancel</button>
                  </div>
                </div>
            </div>
       
    )




}
export default Modal;