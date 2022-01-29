import { Flex, Text } from '@chakra-ui/react';
import { hasAnyRoles } from 'utils/auth';
import { ADMIN, ADMIN_CATEGORIES, ADMIN_USERS } from 'constants/paths';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const { pathname } = useLocation();
    const isActive = (href: string) => pathname.endsWith(href);

    const navbar = [
        {
            name: 'Produtos',
            href: ADMIN,
            hasPermission: hasAnyRoles(['ROLE_OPERATOR']),
        },
        {
            name: 'Categorias',
            href: ADMIN_CATEGORIES,
            hasPermission: hasAnyRoles(['ROLE_OPERATOR']),
        },
        {
            name: 'Usuários',
            href: ADMIN_USERS,
            hasPermission: hasAnyRoles(['ROLE_ADMIN']),
        },
    ];

    return (
        <Flex as="nav" bg="gray.800" borderRadius="4px" p="4" gap="8">
            {navbar.map(({ name, href, hasPermission }) => (
                <>
                    {hasPermission && (
                        <Text
                            key={name}
                            color={isActive(href) ? 'blue.400' : 'gray.400'}
                            fontWeight={600}
                            _hover={{ color: 'blue.400' }}
                            transitionDuration="0.2s"
                            bg={isActive(href) ? 'blue.900' : 'gray.800'}
                            py="1"
                            px="3"
                            borderRadius="8"
                        >
                            <Link to={href}>{name}</Link>
                        </Text>
                    )}
                </>
            ))}
        </Flex>
    );
};
