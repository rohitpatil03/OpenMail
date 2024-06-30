import React, { useState, useRef, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import { links, social } from './data'
import logo from '../../assets/react.svg'
import { useSelector, useDispatch } from 'react-redux';
import './nav.css'
import { setPhoneView, setShowSidebar } from '../../redux/reducers/reducers';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.rootReducer.username);
  const showSidebar = useSelector((state) => state.rootReducer.showSidebar);

  

  const toggleLinks = () => {
    dispatch(setShowSidebar(!showSidebar))
  };


  const handleLogoutClick = async() => {
    try {
        const response = await axios(`${import.meta.env.VITE_BASE_URL}/auth/logout`, { withCredentials: true });
        console.log(response.status)
        if(response.status == 200){
          navigate("/login", {replace:true})
          
        }
    } catch (error) {
        console.log(error)     
    }
  }

  // useEffect(() => {
  //   const linksHeight = linksRef.current.getBoundingClientRect().height;
  //   if (showSidebar) {
  //     linksContainerRef.current.style.height = `${linksHeight}px`;
  //   } else {
  //     linksContainerRef.current.style.height = '0px';
  //   }
  // }, [showSidebar]);

  useEffect(() => {
    // Update windowWidth state when the window is resized
    const handleResize = () => {
      if (window.innerWidth > 950){
        dispatch(setPhoneView(false))
      }
      else{
        dispatch(setPhoneView(true))
      }
        
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  



  return (
    <nav className='nav'>

      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt="Place for the logo" />
          
        </div>

        {/* <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {links.map((link)=>{
              const {id, url, text} = link;
              return(
                <a href={url} key={id}><li key={id}>{text}</li></a>
              );
            })}
          </ul>
        </div> */}
        <div className='navSearchContainer'>
          <input type="text" className='navSearchBar'/>
        </div>


        
        <button className='navBtn'>
          {username}
        </button>
        <button className='navBtn' onClick={handleLogoutClick}>
          LOGOUT
        </button>

        <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>

      </div>
    </nav>
  );
}

export default Navbar