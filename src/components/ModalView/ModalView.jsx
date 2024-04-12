const ModalView = ({handleOpenModal}) => {
    return (
        <>
            <button type="button" onClick={handleOpenModal} className="absolute top-2 right-2 p-2 border border-[#dddddd]">X</button>
            <form action="#">
                <label htmlFor="task">
                    <input type="text" id="task" />
                </label>
                <button type="button">Save</button>
            </form>
        </>
    )
}

export default ModalView;