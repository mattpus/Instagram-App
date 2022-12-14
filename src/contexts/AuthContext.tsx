import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';

import {Hub} from 'aws-amplify';
import {HubCallback} from '@aws-amplify/core';

type UserType = CognitoUser | null | undefined;

type AuthContextType = {
  user: UserType;
  userId: string;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userId: '',
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      console.log('DATA FROM HUB ===>', data);
      const {event} = data.payload;
      if (event === 'singOut') {
        setUser(null);
      }
      if (event === 'singIn') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <AuthContext.Provider value={{user, userId: user?.attributes?.sub}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
