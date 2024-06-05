import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SuccessModal from './pages/SuccessModal';
import DeleteModal from './pages/DeleteModal';

const App = () => {
    const [item, setItem] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        getRequest();
    }, []);

    const getRequest = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/users`);
            setItem(response.data);
        } catch (error) {
            console.error("error", error);
        }
    };

    const postRequest = async (event) => {
        event.preventDefault();
        try {
            const users = {
                name: name,
                email: email,
                userName: userName
            };
            await Axios.post(`http://localhost:8000/users`, users, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            getRequest();
            setEmail('');
            setName('');
            setUserName('');
            setShowSuccessModal(true)
        } catch (error) {
            console.error("error", error);
        }
    };

    const DeleteRequest = async (id) => {
        try {
            await Axios.delete(`http://localhost:8000/users/${id}`);
            getRequest();
            setShowDeleteModal(true); 
        } catch (error) {
            console.error("error", error);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        setShowDeleteModal(false);
    };

    return (
        <div>
            <form onSubmit={postRequest}>
                <input 
                value={name}
                onChange={e =>{
                    setName(e.target.value)
                }}
                />
                <input
                value={email}
                onChange={e =>{
                    setEmail(e.target.value)
                }}
                />
                <input
                value={userName}
                onChange={e =>{
                    setUserName(e.target.value)
                }}
                />
                <button> добавить</button>
            </form>

            <div className='pteg' style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={{  position: 'relative', left:60}}>name</p>
    


    <p style={{  position: 'relative', left:190}}>email</p>   
    <p style={{  position: 'relative', left:320}}>username</p>
            </div>

            {item.map((items) => (
    <div className='pteg' style={{display:'flex', flexDirection:'row'}}  key={items.id}>
        <p style={{  position: 'relative', left:80}}>{items.name}</p>
        <p style={{  position: 'relative', left:240}}>{items.email}</p>
        <p style={{  position: 'relative', left:410}}>{items.userName}</p>
        <button style={{  position: 'relative', left:500}} onClick={() =>DeleteRequest(items.id)}>удалить</button>
        
    </div>
))}

            
            {showSuccessModal && <SuccessModal onClose={closeModal} />}
            {showDeleteModal && <DeleteModal onClose={closeModal} />}
        </div>
    );
};

export default App; 
