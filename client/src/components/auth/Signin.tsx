import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signin } from '@/api/user';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useUserContext } from '@/context/UserContext';

type FormValues = {
  email: string;
  password: string;
};
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { setCookie } = useUserContext();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { data: user } = await signin(data);
      toastr.success('Đăng nhập tài khoản thành công, chuyển sang trang chủ sau 2s');
      setCookie('user', JSON.stringify(user), { path: '/', maxAge: 30 * 24 * 60 * 60 });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toastr.error('Tên tài khoản hoặc mật khẩu không đúng!');
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded bg-white max-w-md overflow-hidden shadow-2xl p-5 space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">đăng nhập</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Địa chỉ email <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập email"
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập địa chỉ email!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="text-[red] mt-1 block">Địa chỉ email không đúng định dạng!</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="full_name">
                Mật khẩu <span className="text-[red]">*</span>
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Nhập mật khẩu"
                {...register('password', { required: true, minLength: 8, maxLength: 20 })}
              />
              {errors.password?.type === 'required' && (
                <span className="text-[red] mt-1 block">Vui lòng nhập mật khẩu!</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối thiểu 8 ký tự!</span>
              )}
              {errors.password?.type === 'maxLength' && (
                <span className="text-[red] mt-1 block">Mật khẩu tối đa 20 ký tự!</span>
              )}
            </div>
            <div className="flex items-center justify-end">
              <Link to="/forgetPass" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="flex mt-[20px]">
              <button
                type="submit"
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center space-x-2 flex-nowrap">
            <span className="w-20 h-px bg-gray-300" />
            <span>OR</span>
            <span className="w-20 h-px bg-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-3 text-xl">
            <button className="border-2 rounded-md p-3 text-center cursor-pointer hover:bg-indigo-100 ">
              <i className="fab fa-google" />
            </button>
            <button className="border-2 rounded-md p-3 text-center cursor-pointer hover:bg-indigo-100">
              <i className="fab fa-linkedin" />
            </button>
            <button className="border-2 rounded-md p-3 text-center cursor-pointer hover:bg-indigo-100">
              <i className="fab fa-github" />
            </button>
          </div>
          <div className="mt-6 text-gray-600 dark:text-gray-400">
            Bạn chưa có tài khoản?{' '}
            <Link to={'/signup'} className="text-blue-600 hover:underline">
              Đăng ký tài khoản
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
