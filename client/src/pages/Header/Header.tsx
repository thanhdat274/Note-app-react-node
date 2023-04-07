import React, { useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import styles from './style.module.css';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { cookies, logoutResetData } = useUserContext();
  const toggleNav = () => {
    setToggle(!toggle);
  };
  return (
    <div className="shadow md:shadow-none">
      <div className="flex md:hidden justify-between items-center px-4 mt-5">
        <h1 className="uppercase font-bold text-3xl">Note app</h1>
        <button className="flex items-center" onClick={() => toggleNav()}>
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>
      <header
        className={`fixed md:relative md:block right-0 md:right-0 top-0  w-4/5 md:w-full h-full bg-white z-10 ease-in duration-300 ${
          toggle ? 'right-0' : 'right-[-100%]'
        }`}
      >
        <div className="container mx-auto bg-[#3f51b5] md:bg-transparent p-4">
          <div className="flex flex-col md:flex md:flex-row md:justify-between gap-y-4 items-start md:items-center px-[15px] md:p-0 py-[20px]">
            <div></div>
            <div>
              <h2 className="md:text-xl xl:text-2xl font-bold uppercase text-white md:text-black">Note app</h2>
            </div>
            {cookies?.user && (
              <div className="flex flex-col md:flex md:flex-row gap-2">
                <div className="flex flex-col md:flex md:flex-row gap-2">
                  <div className={`${styles['dropdown']} inline-block relative`}>
                    <button className="bg-[#ffc107] md:bg-[#3961fb] font-bold text-black md:text-white px-[15px] py-[10px]">
                      Xin chào: {cookies?.user?.user?.name}
                    </button>
                    <div className={`${styles['dropdown-menu']} absolute hidden text-gray-700 pt-2 rounded-md`}>
                      <button
                        onClick={() => logoutResetData()}
                        className="rounded-md bg-slate-200 font-bold hover:text-gray-50 hover:bg-gray-400 py-2 px-4 block cursor-pointer"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}{' '}
          </div>
        </div>
        <button className="block md:hidden absolute top-2 right-5 text-white text-2xl" onClick={() => toggleNav()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>

      {toggle && (
        <button
          className="md:before:bg-inherit before:bg-[#0000003b] before:w-full before:h-full before:absolute before:inset-0"
          onClick={() => toggleNav()}
        ></button>
      )}
    </div>
  );
};

export default Header;
