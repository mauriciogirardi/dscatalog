import { Flex, Heading } from '@chakra-ui/react';
import { HOME } from 'constants/paths';
import { ButtonBackLink } from './ButtonBackLink';

export default function NotFound() {
  return (
    <Flex w="100%" h="100vh" flexDir="column" align="center" justify="center">
      <Heading mb="5">Página não encontada!</Heading>
      <ButtonBackLink href={HOME} name="Voltar para home" />
    </Flex>
  );
}
