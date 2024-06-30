import './sidebar.css'
import { sidebarInfo } from './data';
import { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setData, setLoading, setIsInbox } from '../../redux/reducers/reducers';
import {useFetchEmailData} from '../../hooks/fetchEmailData'





const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const username = useSelector((state) => state.rootReducer.username);
    const fetchEmailData = useFetchEmailData();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = {
            from: username,
            to: e.target.to.value,
            subject: e.target.subject.value,
            content: e.target.content.value,
            starred: false,
            important: false,
        }
        console.log(sendData);
        axios.post(`${import.meta.env.VITE_BASE_URL}/send/mail`, sendData, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                // Handle success
                handleClose()
                fetchEmailData()

            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    }



    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className='modalHeading'>
                    <p>Rmail Draft</p>
                </div>

                <form className='formInput' onSubmit={handleSubmit}>
                    <input type="text" placeholder='To' required name='to' />
                    <input type="text" placeholder='Subject' required name='subject' />
                    <textarea name="content" id="content" cols="30" rows="10" placeholder='Content' required></textarea>
                    <button type='submit' className='sendButton'>Send</button>
                </form>





                <button onClick={handleClose}>Close</button>
            </section>
        </div>
    );
};

export default Modal;