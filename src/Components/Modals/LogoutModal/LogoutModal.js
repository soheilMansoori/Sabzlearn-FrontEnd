import React from 'react'
import './LogoutModal.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function LogoutModal({ isShowLogoutModal, canselLogout, acpectLogout ,title}) {
    // console.log(canselLogout);
    return (
        <Modal
            show={isShowLogoutModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <h1 className='text-center my-5 fs-1'>
                {title}
            </h1>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button size='lg' className='btn btn-success fs-2 px-5' onClick={() => acpectLogout()}> بله </Button>
                <Button size='lg' className='btn btn-danger fs-2 px-5' onClick={() => canselLogout()}> خیر </Button>
            </Modal.Footer>
        </Modal>
    )
}
