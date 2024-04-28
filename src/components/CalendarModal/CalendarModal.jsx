import Modal from 'react-modal';
import useAppContext from "../../hooks/useAppContext";
import ModalView from "../ModalView/ModalView.jsx";

const customStyles = {
    content: {
        color: '#000',
        backgroundColor: '#DDD',
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        borderRadius: '0.75rem',
        overflow: 'hidden'
    },
    overlay: {
        backgroundColor: '#000000c4',
    }
};

Modal.setAppElement('#root');

function CalendarModal({handleOpenModal, children}) {
    const { isModalOpen } = useAppContext();

    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
            onRequestClose={handleOpenModal}
            shouldCloseOnOverlayClick={true}
            contentLabel="Example Modal"
        >
            <ModalView handleOpenModal={handleOpenModal}/>
        </Modal>
    )
}

export default CalendarModal;