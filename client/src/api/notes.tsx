import { connect } from './connect';

export const listNotes = ({ id, useData }: any) => {
  const url = `/note/${id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${useData?.token}`,
    },
  });
};
