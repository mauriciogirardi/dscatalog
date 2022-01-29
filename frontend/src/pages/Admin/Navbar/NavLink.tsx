import { Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

type NavLinkProps = {
    name: string;
    href: string;
};

export const NavLink = ({ href, name }: NavLinkProps) => {
    const { pathname } = useLocation();
    const isActive = (href: string) => pathname.endsWith(href);

    return (
        <Text
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
    );
};
