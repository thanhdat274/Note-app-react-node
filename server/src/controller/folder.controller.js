import Folder from "../model/folder.model";

export const ListFolder = (res, req) => {
  // const id = req.body;
  console.log("ididididid___", req.body);


  // console.log("id", id);
  // const res = Folder.findOne({ idAuth: id }).populate("authId").exec();
  // console.log("first", res)
  // try {
  //   // Folder.findOne({ idAuth: id }, (err, data) => {
  //   //   if (err) {
  //   //     return res.status(400).json({ message: 'Không tìm thấy dữ liệu' });
  //   //   }
  //   //   return res.json({ data });
  //   // });
  //   const dataget = Folder.findOne({ authId: id }).populate("authId").exec();
  //   return res.status(200).json(dataget)
  // } catch (error) {
  //   console.log(error);
  // }
  return {}

}