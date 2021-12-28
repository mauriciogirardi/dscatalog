import { Flex, Spinner } from '@chakra-ui/react';

export const Loader = () => {
  return (
    <Flex align="center" justify="center" v="100%" h="90vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.400"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
