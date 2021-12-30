import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiLockLine, RiMailLine } from 'react-icons/ri';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { ADMIN_AUTH_RECOVER, ADMIN_AUTH_REGISTER } from 'constants/paths';
import { useShowPassword } from 'hooks/useShowPassword';
import { Input } from 'components/Form/Input';

type FormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail é um campo obrigatório!')
    .email('Formato de email invalido!'),
  password: yup.string().required('Senha é um campo obrigatório!'),
});

export const Login = () => {
  const { showPassword } = useShowPassword();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

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

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5}>
          <Input
            placeholder="E-mail"
            icon={RiMailLine}
            isFilled={!!watch().email}
            {...register('email')}
            error={errors.email}
            name="email"
          />
          <Input
            placeholder="Senha"
            icon={RiLockLine}
            type={showPassword ? 'text' : 'password'}
            isFilled={!!watch().password}
            {...register('password')}
            error={errors.password}
            name="password"
            isTypePassword
          />
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

        <Button
          type="submit"
          isLoading={isSubmitting}
          w="100%"
          colorScheme="blue"
        >
          Logar
        </Button>
      </Box>

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
