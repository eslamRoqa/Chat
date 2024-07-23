import {createContext, useEffect, useId, useState} from 'react';
import {getUserLogged} from '../components/UserDataLocal';

const UserIdContext = createContext();

export const UserIdProvider = ({children}) => {
  const [userId, setUserId] = useState();

  console.log('useEffectInUserIdContext', userId);
  getUserLogged().then(userId => {
    setUserId(userId);
  }, []);

  return (
    <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
  );
};

export default UserIdContext;
