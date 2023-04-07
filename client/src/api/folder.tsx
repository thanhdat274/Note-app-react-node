import { connect } from './connect';

export const listFolder = (useData: any) => {
  // console.log('api', useData.user._id);
  const url = `/folder/${useData.user._id}`;
  return connect.get(url, {
    headers: {
      Authorization: `Bearer ${useData?.token}`,
    },
  });
};
// export const listFolder = () => {
//   // console.log('api', useData.user._id);
//   const url = `/folder`;
//   return connect.get(url);
// };
