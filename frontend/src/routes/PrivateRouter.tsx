import { Navigate, useLocation } from 'react-router-dom';

import { ADMIN, ADMIN_AUTH } from 'constants/paths';
import { hasAnyRoles, isAuthenticated } from 'api/requests';
import { Role } from 'types/user';

type PrivateRouterProps = {
    children: JSX.Element;
    roles?: Role[];
};

export const PrivateRouter = ({
    children,
    roles = ['ROLE_OPERATOR'],
}: PrivateRouterProps) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return (
            <Navigate
                to={{ pathname: ADMIN_AUTH }}
                state={{ from: location }}
                replace
            />
        );
    }

    return !hasAnyRoles(roles) ? <Navigate to={ADMIN} /> : children;
};
