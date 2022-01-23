import { Navigate, useLocation } from 'react-router-dom';

import { ADMIN_AUTH } from 'constants/paths';
import { isAuthenticated } from 'api/requests';

type PrivateRouterProps = {
  children: JSX.Element;
};

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to={ADMIN_AUTH} state={{ from: location }} replace />;
  }

  return children;
};
