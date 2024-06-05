import React from 'react';

const DeleteModal = ({ onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h1>Пользователь успешно удален</h1>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default DeleteModal;
