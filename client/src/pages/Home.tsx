import React from 'react';
import { useUserContext } from '@/context/UserContext';

const Home = () => {
  const { cookies } = useUserContext();
  return (
    <div>
      <h3>Example code on React cookies</h3>
      <button className="bg-slate-600 text-white">Create Cookie</button>
      <p>Show cookie : </p>
      {cookies.user && <p>{cookies.user.user.name}</p>}
    </div>
  );
};

export default Home;
