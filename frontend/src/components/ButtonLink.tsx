import { Icon, Text, Link as ChakraLink } from '@chakra-ui/react';
import { ElementType } from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  title: string;
  path: string;
  icon?: ElementType;
};

export const ButtonLink = ({ path, title, icon }: ButtonLinkProps) => {
  return (
    <Link to={path} style={{ width: '100%' }}>
      <ChakraLink
        as="div"
        display="flex"
        justifyContent="center"
        borderRadius="4px"
        alignItems="center"
        _hover={{
          bg: 'blue.600',
        }}
        transitionDuration="0.2s"
        bg="blue.500"
        w={['100%', '100%', '300px']}
        h="10"
      >
        <Text fontWeight={500}>{title}</Text>
        {!!icon && <Icon as={icon} fontSize={25} mt="-3px" />}
      </ChakraLink>
    </Link>
  );
};
