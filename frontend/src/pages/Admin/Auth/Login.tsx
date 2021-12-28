import { Box, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { ButtonLink } from 'components/ButtonLink';
import { ADMIN_AUTH_RECOVER, ADMIN_AUTH_REGISTER } from 'constants/paths';

export const Login = () => {
  return (
    <Box bg="gray.800" py="10" px="5" w={['100%', '100%', '40%']}>
      <Heading
        as="h1"
        fontWeight={300}
        color="gray.300"
        mb="5rem"
        textAlign="center"
        fontSize="4xl"
      >
        LOGIN
      </Heading>

      <VStack spacing={5}>
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" type="password" />
      </VStack>

      <Text
        mt="3"
        mb="4rem"
        fontSize="14"
        color="blue.400"
        _hover={{ color: 'blue.500' }}
        display="inline-block"
      >
        <Link to={ADMIN_AUTH_RECOVER}>Esqueceu a senha?</Link>
      </Text>

      <ButtonLink path={'/'} w="100%" title="Logar" icon={RiArrowRightSLine} />

      <Flex mt="10" justify="center">
        <Text fontWeight={600} color="gray.400">
          Não tem cadastro?
        </Text>

        <Text
          fontWeight={600}
          color="blue.400"
          ml="2"
          _hover={{ color: 'blue.500' }}
          cursor="pointer"
        >
          <Link to={ADMIN_AUTH_REGISTER}>CADASTRAR</Link>
        </Text>
      </Flex>
    </Box>
  );
};
