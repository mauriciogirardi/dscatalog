import { Box, Heading, Input, VStack } from '@chakra-ui/react';
import { ButtonBackLink } from 'components/ButtonBackLink';
import { ButtonLink } from 'components/ButtonLink';
import { ADMIN_AUTH } from 'constants/paths';

export default function Register() {
  return (
    <Box
      bg="gray.800"
      py="10"
      px="5"
      w={['100%', '100%', '40%']}
      position="relative"
    >
      <Box position="absolute" top="4" left="4">
        <ButtonBackLink href={ADMIN_AUTH} />
      </Box>

      <Heading
        as="h1"
        fontWeight={300}
        color="gray.300"
        mb="5rem"
        mt="10"
        textAlign="center"
        fontSize="4xl"
      >
        Cadastro
      </Heading>

      <VStack spacing={5} mb="8">
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" type="password" />
      </VStack>

      <ButtonLink path={'/'} w="100%" title="Enviar" />
    </Box>
  );
}
