import { EyeOutlined, FileAddFilled, FileTextOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { NoteType } from '@/types/noteType';
import { useUserContext } from '@/context/UserContext';
import { DeleteNote, NoteOneById, listNotes } from '@/api/notes';
import { Modal } from 'antd';
import AddNote from './AddNote';
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import EditNote from './EditNote';

const ListNote = () => {
  const [noteList, setNoteList] = useState<NoteType[]>([]);
  const [noteOneList, setNoteOneList] = useState<NoteType[]>([]);
  const { id } = useParams();
  const { cookies } = useUserContext();
  const useData = cookies?.user;
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [resetPage, setResetPage] = useState(0);

  const handleResetPage = () => {
    setResetPage(resetPage + 1);
  };

  const getNoteList = async () => {
    try {
      const { data } = await listNotes({ id: id, useData: useData } as any);
      setNoteList(data);
    } catch (error: any) {
      toastr.error(error?.response?.data?.message);
    }
  };

  const getByIdNote = async (_id: any) => {
    const dataOne = { _id: _id, useData: useData };
    setModal1Open(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await NoteOneById(dataOne as any);
      setNoteOneList(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastr.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (id) {
      getNoteList();
    }
  }, []);

  const removeNote = async (_id: any) => {
    const confirm = window.confirm('Bạn có muốn xóa không ?');
    if (confirm) {
      await DeleteNote({ _id: _id, useData: useData })
        .then(() => {
          toastr.success('Xóa ghi chú thành công');
          setNoteList(noteList.filter((item: any) => item._id !== _id));
        })
        .catch((error) => {
          toastr.error(error?.response?.data?.message);
        });
    }
  };
  return (
    <>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 pl-2 sm:pl-0">
          <Link to={'/'} className="flex items-center justify-center gap-1 px-[10px] py-[5px] rounded-2xl bg-green-100">
            <LeftOutlined className="text-[15px]" />
            <p className="text-[15px]">Trang chủ</p>
          </Link>
          <button
            onClick={() => setModal2Open(true)}
            className="flex items-center justify-center gap-2 px-[10px] py-[5px] rounded-2xl bg-green-100"
          >
            <FileAddFilled className="text-[20px]" />
            <p className="text-[15px]">Thêm mới</p>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-mparamle min-w-full flex flex-col gap-6 ">
              <div className="w-full p-4">
                <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                  {noteList?.map((item, index: number) => {
                    return (
                      <div key={index} className="w-full p-[10px] bg-[#edf1f7] rounded-[10px] flex flex-col">
                        <div className="w-full p-[10px] bg-[#edf1f7] rounded-[10px] flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FileTextOutlined />
                            <p>{item?.name?.substring(0, 10)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                getByIdNote(item?._id);
                              }}
                            >
                              <EyeOutlined className="text-[15px] flex" />
                            </button>
                            <button
                              onClick={() => {
                                removeNote(item?._id);
                              }}
                            >
                              <BsFillTrashFill className="text-[15px] flex" />
                            </button>
                          </div>
                        </div>
                        <div
                          className="bg-slate-50 py-[5px] px-[10px] rounded-[5px] shadow break-words"
                          dangerouslySetInnerHTML={{
                            __html: `${item?.content.substring(0, 300)}`,
                          }}
                        />
                        <p className="text-[10px] py-1">{moment(item?.updatedAt).format('DD-MM-YYYY, HH:MM:SS')}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Thêm mới ghi chú"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        width={'100rem'}
      >
        <AddNote resetDataNotes={getNoteList} handleResetPage={() => handleResetPage()} setModal2Open={setModal2Open} />
      </Modal>
      <Modal
        title="Đổi tên thư mục"
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <EditNote
          dataNoteOne={noteOneList}
          resetDataNotes={getNoteList}
          handleResetPage={() => handleResetPage()}
          setModal2Open={setModal1Open}
        />
      </Modal>
    </>
  );
};

export default ListNote;
