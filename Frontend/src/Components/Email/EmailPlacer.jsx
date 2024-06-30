import { useState, useEffect, Fragment, useContext } from 'react'

import './email.css';
import Email from './Email';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setData, setLoading, setIsInbox } from '../../redux/reducers/reducers';
import { useFetchEmailData } from '../../hooks/fetchEmailData'


const EmailPlacer = () => {

    const username = useSelector((state) => state.rootReducer.username);
    const data = useSelector((state) => state.rootReducer.data);
    const tabname = useSelector((state) => state.sidebarReducer.tabname);
    const loading = useSelector((state) => state.rootReducer.loading);
    const fetchEmailData = useFetchEmailData()




    useEffect(() => {
        fetchEmailData();
    }, []);


    if (loading) {
        <>
            <div>
                <h1>Loading</h1>
            </div>
        </>
    }
    else {
        return (
            <>

                <div className='emailPlacer'>
                    {data
                        .filter((item) => {
                            if (tabname === 'inbox') {
                                return true;
                            } else if (tabname === 'sent') {
                                return item.from === username;
                            } else if (tabname === 'recevied') {
                                return item.to === username;
                            } else if (tabname === 'starred') {
                                return item.starred === true;
                            } else if (tabname === 'important'){
                                return item.important === true;
                            }
                            
                            return false;
                        })
                        .map((item) => (
                            <Fragment key={item._id}>
                                <Email {...item} />
                                <hr />
                            </Fragment>
                        ))}

                </div>
            </>
        );
    }
}

export default EmailPlacer;