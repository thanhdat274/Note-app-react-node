import { listFolder } from '@/api/folder';
import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const ListFolder = () => {
  const [listFplder, setListFolder] = useState([]);
  const { cookies } = useUserContext();
  const useData = cookies?.user;
  // console.log(useData.user._id);

  useEffect(() => {
    const getListFolder = async () => {
      try {
        const { data } = await listFolder(useData as any);
      } catch (error: any) {
        console.log(error);
        toastr.error(error?.response?.data?.message);
      }
    };
    getListFolder();
  }, [useData]);

  console.log('first', useData); 
  return <div>ListFolder</div>;
};

export default ListFolder;
