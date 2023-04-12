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
  console.log(data?.useData?.user?._id);

  const url = `/folder/${data?.useData?.user?._id}`;
  return connect.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};
