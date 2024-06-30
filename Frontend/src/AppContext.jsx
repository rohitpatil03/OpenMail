import React, { createContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInbox, setIsInbox] = useState(true);

  const fetchEmailData = async () => {
      try {
          const response = await axios(`${import.meta.env.VITE_BASE_URL}/receive/mail`, { withCredentials: true });
          const res = await response.data;
          setData(res);
          fetchUserData();
      } catch (error) {
          console.log(error)     
      }
      finally {
        setLoading(false)
      }
  };

  const fetchUserData = async() => {
    try {
        const response = await axios(`${import.meta.env.VITE_BASE_URL}/auth/user`, { withCredentials: true });
        const res = await response.data;
        setUsername(res.username);
    } catch (error) {
        console.log(error)     
    }
    finally {
      setLoading(false)
    }
  }

  const contextValue = {
    username,
    setUsername,
    data,
    setData,
    loading,
    setLoading,
    fetchEmailData,
    isInbox,
    setIsInbox,
    
    
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
