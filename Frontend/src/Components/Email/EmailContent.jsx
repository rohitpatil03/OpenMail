import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdLabelImportantOutline, MdLabelImportant, MdDeleteOutline, MdArrowBack } from 'react-icons/md'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setViewContent, setContentBody } from '../../redux/reducers/reducers';
import { useFetchEmailData } from '../../hooks/fetchEmailData'
import './email.css'

const EmailContent = () => {
    const contentBody = useSelector((state) => state.rootReducer.contentBody);
    const viewContent = useSelector((state) => state.rootReducer.viewContent);

    const [state, setState] = useState({ starred: false, important: false, delete: false, viewed: true });
    const fetchEmailData = useFetchEmailData()
    const dispatch = useDispatch()



    const handleClickViewed = async (e) => {
        const data = { id: contentBody._id, update: 'viewed', value: !state.viewed }


        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/edit`, data, { withCredentials: true });
            fetchEmailData();
        } catch (error) {
            console.error(error); // Handle any errors
        }

        dispatch(setViewContent(!viewContent))
        dispatch(setContentBody({ _id, to, from, starred, important, viewed, content, subject, timestamp, __v }))
        const newState = { ...state, viewed: !state.viewed }
        setState(newState)
    }

    const handleClickStar = async (e) => {
        const data = { id: contentBody._id, update: 'starred', value: !state.starred }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/edit`, data, { withCredentials: true });
            fetchEmailData();
        } catch (error) {
            console.error(error); // Handle any errors
        }
        const newState = { ...state, starred: !state.starred }
        setState(newState)
    }
    const handleClickImportant = async (e) => {
        const data = { id: contentBody._id, update: 'important', value: !state.important }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/edit`, data, { withCredentials: true });
            fetchEmailData();
        } catch (error) {
            console.error(error); // Handle any errors
        }

        const newState = { ...state, important: !state.important }
        setState(newState)
    }

    const handleClickDelete = async (e) => {
        const data = { id: contentBody._id }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/receive/delete`, data, { withCredentials: true });
            console.log(response.data);
            fetchEmailData();
        } catch (error) {
            console.error(error); // Handle any errors
        }
    };

    const handleClickBack = () => {
        dispatch(setViewContent(!viewContent))
    }
    return (
        <>
            <div className='emailPlacer'>
                <div className="emailContentSubject">
                    <div className='emailContentFunctionalBar'>
                        <MdArrowBack className='iconBtn' onClick={handleClickBack}/>
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
                    <hr />
                    <div style={{marginTop:'30px'}}>
                        <h2>{contentBody.subject}</h2>
                        <hr style={{ padding: '20px', border: 'none' }} />
                        <div className='emailContentUser'>
                            <p style={{ fontSize: 'larger', fontWeight: 600, color: 'black', margin: '0px' }}>{contentBody.from}</p>
                            {/* <p style={{fontSize:'large', color:'black', margin:'0px'}}>{contentBody.to}</p> */}
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

                                
                            </div>
                        </div>
                        <hr style={{ padding: '10px', border: 'none' }} />
                        <p>{contentBody.content}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EmailContent