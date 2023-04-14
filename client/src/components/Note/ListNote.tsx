import { EyeOutlined, FileAddFilled, FileTextOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { NoteType } from '@/types/noteType';
import { useUserContext } from '@/context/UserContext';
import { listNotes } from '@/api/notes';

const ListNote = () => {
  const [noteList, setNoteList] = useState<NoteType[]>([]);
  const { id } = useParams();
  const { cookies } = useUserContext();
  const useData = cookies?.user;

  const getNoteList = async () => {
    try {
      const { data } = await listNotes({ id: id, useData: useData } as any);
      setNoteList(data);
    } catch (error: any) {
      toastr.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getNoteList();
  }, []);
  return (
    <>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 pl-2 sm:pl-0">
          <Link to={'/'} className="flex items-center justify-center gap-1 px-[10px] py-[5px] rounded-2xl bg-green-100">
            <LeftOutlined className="text-[15px]" />
            <p className="text-[15px]">Trang chủ</p>
          </Link>
          <button
            // onClick={() => setModal2Open(true)}
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
                <div className="w-full grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
                  {noteList?.map((item, index: number) => {
                    return (
                      <div key={index} className="w-full p-[10px] bg-[#edf1f7] rounded-[10px]">
                        <div className="w-full p-[10px] bg-[#edf1f7] rounded-[10px] flex justify-between items-center">
                          <FileTextOutlined />
                          <div className="flex items-center gap-2">
                            <button
                            // onClick={() => {
                            //   getByIdFolders(item?._id);
                            // }}
                            >
                              <EyeOutlined className="text-[15px] flex" />
                            </button>
                            <button
                            // onClick={() => {
                            //   removeFolder(item?._id);
                            // }}
                            >
                              <BsFillTrashFill className="text-[15px] flex" />
                            </button>
                          </div>
                        </div>
                        {/* <div className="bg-slate-50 py-[5px] px-[10px] rounded-[5px] shadow">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dicta, incidunt exercitationem ad
                      laudantium nesciunt? Omnis eligendi laboriosam possimus inventore, nisi, ullam quas pariatur
                      quisquam ipsum, cumque illo sunt quos.
                    </div> */}
                        <div
                          className="bg-slate-50 py-[5px] px-[10px] rounded-[5px] shadow"
                          dangerouslySetInnerHTML={{
                            __html: `${item?.content.substring(0, 100)}`,
                          }}
                        />
                        <p className="text-[10px] py-1">April 10th 2023, 5:56:26 pm</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        title="Thêm mới thư mục"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <AddFolder
          resetDataListFolder={getListFolder}
          handleResetPage={() => handleResetPage()}
          setModal2Open={setModal2Open}
        />
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
        <EditFokder
          dataFolderOne={folderOne}
          resetDataListFolder={getListFolder}
          handleResetPage={() => handleResetPage()}
          setModal2Open={setModal1Open}
        />
      </Modal> */}
    </>
  );
};

export default ListNote;
