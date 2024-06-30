import './email.css';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdLabelImportantOutline, MdLabelImportant, MdDeleteOutline } from 'react-icons/md'
import axios from 'axios';
import { useFetchEmailData } from '../../hooks/fetchEmailData'
import { useSelector, useDispatch } from 'react-redux';
import { setViewContent, setContentBody } from '../../redux/reducers/reducers';


const Email = ({ _id, to, from, starred, important, viewed, content, subject, timestamp, __v }) => {
    const [state, setState] = useState({starred:starred, important:important, delete:false, viewed:viewed});
    const fetchEmailData = useFetchEmailData()
    const dispatch = useDispatch()
    const viewContent = useSelector((state) => state.rootReducer.viewContent);


    const handleClickViewed = async(e) =>{
        const data = {id:_id, update:'viewed', value:!state.viewed}
        
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/edit`, data, {withCredentials:true});
            fetchEmailData();
          } catch (error) {
            console.error(error); // Handle any errors
          }
        
        dispatch(setViewContent(!viewContent))
        dispatch(setContentBody({ _id, to, from, starred, important, viewed, content, subject, timestamp, __v }))
        const newState = { ...state, viewed:!state.viewed}
        setState(newState)
    }

    const handleClickStar = async(e) => {
        const data = {id:_id, update:'starred', value:!state.starred}
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/edit`, data, {withCredentials:true});
            fetchEmailData();
          } catch (error) {
            console.error(error); // Handle any errors
          }
        const newState = { ...state, starred:!state.starred}
        setState(newState)
    }
    const handleClickImportant = async(e) => {
        const data = {id:_id, update:'important', value:!state.important}
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/edit`, data, {withCredentials:true});
            fetchEmailData();
          } catch (error) {
            console.error(error); // Handle any errors
          }
        
        const newState = { ...state, important:!state.important}
        setState(newState)
    }

    const handleClickDelete = async(e) => {
        const data = {id:_id}
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/delete`, data, {withCredentials:true});
            console.log(response.data);
            fetchEmailData();
          } catch (error) {
            console.error(error); // Handle any errors
          }
    };

    
    return (
        <>

            <button className={viewed?'emailContainerViewed':'emailContainer'} onClick={handleClickViewed}>
                <div className='markers'>
                    {state.starred ? (
                        <FaStar className='iconBtn' name='star' onClick={handleClickStar} />
                    ) : (
                        <FaRegStar className='iconBtn' name='star' onClick={handleClickStar} />
                    )}
                    {state.important ? (
                        <MdLabelImportant className='iconBtn' name='important' onClick={handleClickImportant} />
                    ) : (
                        <MdLabelImportantOutline className='iconBtn' name='important' onClick={handleClickImportant} />
                    )}
                    
                    <MdDeleteOutline className='iconBtn' name='delete' onClick={handleClickDelete} />
                </div>
                <div className='emailContent'>
                    <h4 className='subjectContainer' style={{margin:'0px'}}>{subject}</h4>
                    <p className='contentContainer'  style={{margin:'0px'}}>{content}</p>
                    <p  style={{margin:'0px'}}>{timestamp}</p>
                </div>

            </button>
        </>
    );
}

export default Email;