import React, { useContext, createContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export interface UserState {
  logoutResetData: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCookie: any;
}

const UserContext = createContext<UserState | null>(null);

export const useUserContext = (): UserState => useContext(UserContext) as UserState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserProvider = ({ children }: any) => {
  const router = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const logoutResetData = () => {
    removeCookie('user', { path: '/', maxAge: 30 * 24 * 60 * 60 });
    toastr.success('Đăng xuất thành công!');
    router(`/`);
  };

  const value: UserState = {
    logoutResetData,
    cookies,
    setCookie,
  };

  return (
    <div>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </div>
  );
};

export default UserProvider;
