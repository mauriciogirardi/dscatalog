import { Flex, Icon, Text } from '@chakra-ui/react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

type ButtonBackLinkProps = {
  href: string;
  name?: string;
};

export const ButtonBackLink = ({
  href,
  name = 'Voltar',
}: ButtonBackLinkProps) => {
  return (
    <Link to={href}>
      <Flex align="center" mb="4">
        <Icon as={MdArrowBackIosNew} color="blue.400" fontSize={13} mr="2" />
        <Text
          fontWeight={500}
          color="gray.400"
          fontSize="16"
          _hover={{ color: 'blue.400' }}
          transitionDuration="0.2s"
        >
          {name}
        </Text>
      </Flex>
    </Link>
  );
};
