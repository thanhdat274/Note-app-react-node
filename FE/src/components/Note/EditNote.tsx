import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUserContext } from '@/context/UserContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddNotes, updateNote } from '@/api/notes';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

type FromValues = {
  _id?: string;
  name: string;
  content: string;
  folderId: string;
};

type Props = {
  resetDataNotes: () => void;
  handleResetPage: () => void;
  setModal2Open: (data: boolean) => void;
  dataNoteOne: FromValues | any;
};

const EditNote = ({ dataNoteOne, resetDataNotes, handleResetPage, setModal2Open }: Props) => {
  const [rawHTML, setRawHTML] = useState('');
  const { cookies } = useUserContext();
  const useData = cookies?.user;
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FromValues>({});

  useEffect(() => {
    if (dataNoteOne) {
      reset(dataNoteOne);
      setRawHTML(dataNoteOne?.content);
    }
  }, [dataNoteOne, reset]);

  const onSubmit: SubmitHandler<FromValues> = async (data: any) => {
    const newData = { ...data, content: rawHTML, useData: useData, folderId: id };
    await updateNote(newData)
      .then(() => {
        toastr.success('Cập nhật thành công!');
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        toastr.error(error?.response?.data?.message);
      })
      .finally(() => {
        setRawHTML('');
        resetDataNotes();
        handleResetPage();
        reset();
        setModal2Open(false);
      });
  };
  return (
    <>
      <div className="w-full">
        <form className="p-[10px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tên ghi chú
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Xin mời nhập tên ghi chú"
              {...register('name', { required: true })}
            />
            {errors.name?.type === 'required' && (
              <span className="text-[red] mt-1 block">Vui lòng nhập tên ghi chú!</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nội dung ghi chú
            </label>
            <ReactQuill theme="snow" value={rawHTML} onChange={setRawHTML} id="content" />
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
    </>
  );
};

export default EditNote;
