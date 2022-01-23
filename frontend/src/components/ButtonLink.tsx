import { Icon, Text, Link as ChakraLink } from '@chakra-ui/react';
import { ElementType } from 'react';
import { Link } from 'react-router-dom';

type ButtonLinkProps = {
  title: string;
  path: string;
  icon?: ElementType;
  w?: string;
  bg?: string;
  hoverColor?: string;
  sizeIcon?: number;
  h?: string;
};

export const ButtonLink = ({
  path,
  title,
  icon,
  w = '300px',
  bg = 'blue.500',
  hoverColor = 'blue.600',
  sizeIcon = 25,
  h = '10',
}: ButtonLinkProps) => {
  return (
    <Link to={path} style={{ width: '100%' }}>
      <ChakraLink
        as="div"
        display="flex"
        justifyContent="center"
        borderRadius="4px"
        alignItems="center"
        _hover={{
          bg: hoverColor,
        }}
        transitionDuration="0.2s"
        bg={bg}
        w={['100%', '100%', w]}
        h={h}
      >
        <Text fontWeight={500}>{title}</Text>
        {!!icon && <Icon ml="2" as={icon} fontSize={sizeIcon} />}
      </ChakraLink>
    </Link>
  );
};
