import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { updateFolders } from '@/api/folder';
import { useUserContext } from '@/context/UserContext';

type FromValues = {
  _id: string;
  name: string;
  authId: string;
};

type Props = {
  resetDataListFolder: () => void;
  handleResetPage: () => void;
  setModal2Open: (data: boolean) => void;
  dataFolderOne: FromValues | any;
};

const EditFokder = ({ resetDataListFolder, dataFolderOne, handleResetPage, setModal2Open }: Props) => {
  const { cookies } = useUserContext();
  const useData = cookies?.user;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FromValues>({});

  useEffect(() => {
    if (dataFolderOne) {
      reset(dataFolderOne);
    }
  }, [dataFolderOne, reset]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<FromValues> = async (data: any) => {
    const newData = { ...data, authId: useData?.user?._id, useData: useData };
    await updateFolders(newData)
      .then(() => {
        toastr.success('Đổi tên thư mục thành công!');
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        toastr.error(error?.response?.data?.message);
      })
      .finally(() => {
        resetDataListFolder();
        handleResetPage();
        reset();
        setModal2Open(false);
      });
  };
  return (
    <div className="w-full">
      <form className="p-[10px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên thư mục
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Xin mời nhập tên thư mục"
            {...register('name', { required: true, minLength: 6 })}
          />
          {errors.name?.type === 'required' && (
            <span className="text-[red] mt-1 block">Vui lòng nhập tên thư mục!</span>
          )}
          {errors.name?.type === 'minLength' && (
            <span className="text-[red] mt-1 block">Tên thư mục tối thiểu 6 ký tự!</span>
          )}
        </div>

        <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFokder;
