import {
  Skeleton,
  Box,
  Text,
  SkeletonText,
  Flex,
  Divider,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { CATALOG } from 'constants/paths';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const SkeletonProductDetail = () => {
  return (
    <Box w="100%" bg="gray.800" borderRadius="4px" p="5" boxShadow="md">
      <Link to={CATALOG}>
        <Flex align="center" mb="4">
          <Icon as={MdArrowBackIosNew} color="blue.400" fontSize={16} mr="2" />
          <Text
            fontWeight={600}
            color="gray.400"
            fontSize="20"
            _hover={{ color: 'blue.400' }}
            transitionDuration="0.2s"
          >
            Voltar
          </Text>
        </Flex>
      </Link>

      <Divider mb="8" />

      <Flex flexDir={['column', 'column', 'row']}>
        <Box w={['100%', '100%', '49%']}>
          <Flex justify={['center', 'center', 'start']}>
            <Skeleton h={['200px', '300px']} w={['100%', '80%', '300px']} />
          </Flex>

          <Skeleton h="6" mt="5" w="200px" />
          <Skeleton h="6" my="4" w="100px" />
        </Box>

        <Box mt={['5']} w={['100%', '100%', '49%']}>
          <Heading as="h4" fontSize="18">
            Descrição do Produto
          </Heading>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </Flex>
    </Box>
  );
};
