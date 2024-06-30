import './sidebar.css'
import { sidebarInfo } from './data';
import { useState, useContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setTabName } from '../../redux/reducers/sidebarReducers';



const Sidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const tabname = useSelector((state) => state.sidebarReducer.tabname);
    const dispatch = useDispatch()

    const handleTabClick = (id) => {
        dispatch(setTabName(id));
    };


    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

   


    return (
        <>
            <div className='sidebarContainer'>
                <div className='sidebarContent'>
                    <button className='compose' onClick={handleOpenModal}>COMPOSE</button>
                    <Modal show={showModal} handleClose={handleCloseModal}>
                    </Modal>
                    <div className='content'>
                        {sidebarInfo.map((item) => {
                            const { id, text, icon, onClickId } = item;
                            return (
                                <>
                                    <button className={(tabname == onClickId) ? "activeSidebarButton" : "deactiveSidebarButton"} key={id} onClick={() => handleTabClick(onClickId)}>
                                        <div className="sidebarIcon">{icon}</div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div>{text}</div>
                                    </button>
                                </>
                            );
                        })}

                    </div>
                </div>
            </div>

        </>
    );
}




export default Sidebar;