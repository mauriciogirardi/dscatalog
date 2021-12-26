import { Box, Flex, Text, Skeleton, SkeletonText } from '@chakra-ui/react';

export const SkeletonCatalog = () => {
  return (
    <Flex
      borderRadius="4px"
      flexDir="column"
      boxShadow="md"
      bg="white"
      w={['100%', '230px']}
      p="4"
    >
      <Flex justify="center" w="100%">
        <Skeleton w="200px" h="200px" />
      </Flex>

      <Box>
        <Text fontSize="15px" fontWeight={700} color="gray.800" mt="2">
          <Skeleton h="5" w="200px" />
        </Text>

        <Text fontSize="12px" fontWeight={400} color="gray.500" mt="2">
          <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </Text>

        <Skeleton h="5" w="100px" mt="4" />
      </Box>
    </Flex>
  );
};
