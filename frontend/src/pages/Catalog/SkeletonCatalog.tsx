import { Box, Flex, Text, Skeleton } from '@chakra-ui/react';

export const SkeletonCatalog = () => {
    return (
        <Flex
            borderRadius="4px"
            flexDir="column"
            boxShadow="md"
            bg="white"
            w={['100%', '230px']}
            p="4"
            as="div"
        >
            <Flex justify="center" w="100%">
                <Skeleton w="200px" h="200px" />
            </Flex>

            <Box>
                <Text mt="2">
                    <Skeleton h="5" w="100px" />
                </Text>

                <Skeleton h="5" w="100px" mt="3" />
            </Box>
        </Flex>
    );
};
