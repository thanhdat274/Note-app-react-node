import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

type PrivateRouterProps = {
  children: JSX.Element;
};

export const PrivateRouter = (props: PrivateRouterProps) => {
  const [cookies] = useCookies(['user']);
  const router = useNavigate();
  useEffect(() => {
    if (!cookies?.user) {
      return router(`/signin`);
    }
  }, [cookies?.user, router]);
  return props.children;
};
