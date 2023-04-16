import { connect } from './connect';

export const listNotes = ({ id, useData }: any) => {
  const url = `/note/${id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${useData?.token}`,
    },
  });
};

export const AddNotes = (data: any) => {
  const url = `/note/add`;
  return connect.post(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const DeleteNote = (data: any) => {
  const url = `/note/${data?._id}`;
  return connect.delete(url, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const NoteOneById = (data: any) => {
  const url = `/note/detail/${data?._id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};

export const updateNote = (data: any) => {
  const url = `/note/${data?._id}`;
  return connect.put(url, data, {
    headers: {
      Authorization: `Bearer ${data?.useData?.token}`,
    },
  });
};
