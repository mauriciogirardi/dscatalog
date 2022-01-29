import { Flex } from '@chakra-ui/react';

import { ADMIN_CATEGORIES, ADMIN_PRODUCTS, ADMIN_USERS } from 'constants/paths';
import { hasAnyRoles } from 'utils/auth';
import { NavLink } from './NavLink';

export const Navbar = () => {
    return (
        <Flex as="nav" bg="gray.800" borderRadius="4px" p="4" gap="8">
            <NavLink href={ADMIN_PRODUCTS} name="Produtos" />

            <NavLink href={ADMIN_CATEGORIES} name="Categorias" />

            {hasAnyRoles(['ROLE_ADMIN']) && (
                <NavLink href={ADMIN_USERS} name="Usuários" />
            )}
        </Flex>
    );
};
