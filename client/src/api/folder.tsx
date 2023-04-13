import { connect } from './connect';

export const listFolder = (useData: any) => {
  const url = `/folder/${useData?.user?._id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${useData?.token}`,
    },
  });
};

export const createFolder = (data: any) => {
  const url = `/folder/${data?.useData?.user?._id}`;
  return connect.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const removeFolders = (data: any) => {
  const url = `/folder/${data?._id}`;
  return connect.delete(url, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const foldersDetail = (data: any) => {
  const url = `/folder/detail/${data?._id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const updateFolders = (data: any) => {
  const url = `/folder/${data?._id}`;
  return connect.put(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};
