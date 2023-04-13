import { foldersDetail, listFolder, removeFolders } from '@/api/folder';
import { useUserContext } from '@/context/UserContext';
import { FolderFilled, FolderAddFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { BsThreeDotsVertical, BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import styles from './folder.module.css';
import { Link } from 'react-router-dom';
import { FolderType } from '@/types/folderTupe';
import { Modal } from 'antd';
import AddFolder from './AddFolder';
import EditFokder from './EditFolder';

const ListFolder = () => {
  const [listFolders, setListFolders] = useState<FolderType[]>([]);
  const [folderOne, setFolderOne] = useState<FolderType[]>([]);
  const { cookies } = useUserContext();
  const useData = cookies?.user;
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [resetPage, setResetPage] = useState(0);

  const handleResetPage = () => {
    setResetPage(resetPage + 1);
  };

  // List toàn bộ thư mục theo id tài khoản
  const getListFolder = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await listFolder(useData as any);
      setListFolders(data);
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toastr.error(error?.response?.data?.message);
    }
  };

  // chi tiết 1 thư mục
  const getByIdFolders = async (_id: any) => {
    const dataOne = { _id: _id, useData: useData };
    setModal1Open(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await foldersDetail(dataOne as any);
      setFolderOne(data);
      console.log('data 1 thư mục', data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toastr.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getListFolder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useData]);

  const removeFolder = async (_id: any) => {
    const confirm = window.confirm('Bạn có muốn xóa không ?');
    if (confirm) {
      await removeFolders({ _id: _id, useData: useData })
        .then(() => {
          toastr.success('Xóa nhà thành công');
          setListFolders(listFolders.filter((item: any) => item._id !== _id));
        })
        .catch((error) => {
          toastr.error(error?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => setModal2Open(true)}
          className="flex items-center justify-center gap-2 px-[10px] py-[5px] rounded-2xl bg-green-100"
        >
          <FolderAddFilled className="text-[30px]" />
          <span className="text-[15px]">Thêm mới</span>
        </button>
        <div className="flex flex-col">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-mparamle min-w-full flex flex-col gap-6 ">
              <div className="w-full p-4">
                <div className="w-full grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
                  {listFolders?.map((item, index: number) => {
                    return (
                      <div
                        key={index}
                        className="product_items w-full p-[10px] bg-[#edf1f7] rounded-[10px] flex justify-between items-center"
                      >
                        <Link to={`/folder/${item._id}`} className="flex items-center gap-2">
                          <FolderFilled className="text-[25px]" />
                          {item?.name?.length > 15 ? (
                            <h2 className="text-[16px]">{item?.name?.substring(0, 15)}...</h2>
                          ) : (
                            <p className="text-[16px]">{item?.name?.substring(0, 15)}</p>
                          )}
                        </Link>
                        <div className={`${styles['dropdown']} inline-block relative`}>
                          <BsThreeDotsVertical />
                          <div
                            className={`${styles['dropdown-menu']} absolute top-3 right-1  hidden text-gray-700 rounded-md bg-white shadow`}
                          >
                            <button
                              onClick={() => {
                                getByIdFolders(item?._id);
                              }}
                              className="rounded-t-md font-bold w-[100px] py-2 px-4 cursor-pointer flex items-center gap-2 text-sm hover:bg-[#e1e5ea]"
                            >
                              <BsFillPencilFill />
                              Đổi tên
                            </button>
                            <button
                              onClick={() => {
                                removeFolder(item?._id);
                              }}
                              className="font-bold rounded-b-md w-[100px] py-2 px-4 cursor-pointer flex items-center gap-2 text-sm hover:bg-[#e1e5ea]"
                            >
                              <BsFillTrashFill />
                              Xóa
                            </button>
                          </div>
                        </div>
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
      </Modal>
    </>
  );
};

export default ListFolder;
