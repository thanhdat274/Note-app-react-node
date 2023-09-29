const User = require('../model/user')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existUser = await User.findOne({ email }).exec();
    if (existUser) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      })
    }
    const user = await new User({ name, email, password }).save();
    return res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      }
    })
  } catch (error) {
    return res.status(400).json({ message: "Đăng kí thất bại" })
  }
};

exports.signin = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Email không tồn tại. Vui lòng đăng ký' });
    }
    if (!user.authencated(data.password)) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng. Xin thử lại' });
    }
    const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: 30 * 24 * 60 * 60 })
    const { _id, name, email } = user;
    return res.status(200).json({ token, user: { _id, name, email } })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Đăng nhập thất bại" })
  }
}