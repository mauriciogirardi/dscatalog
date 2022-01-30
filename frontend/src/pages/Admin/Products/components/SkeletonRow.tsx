import { Flex, Skeleton } from '@chakra-ui/react';

export const SkeletonRow = () => {
    return (
        <Flex
            borderRadius="4px"
            flexDir={['column', 'row']}
            boxShadow="md"
            bg="white"
            w={['100%']}
            p="4"
        >
            <Flex
                borderRight={['0', '1px solid #ccc']}
                borderBottom={['1px solid #ccc', '0']}
                justify={['center']}
            >
                <Skeleton w="100px" h="100px" mr={['0', '5']} mb={['5', '0']} />
            </Flex>

            <Flex
                ml="5"
                flexDir="column"
                align="flex-start"
                justify="center"
                mt={['5', '0']}
            >
                <Skeleton h="6" w="150px" />

                <Skeleton h="4" w="100px" mt="4" />

                <Flex gap="2" align="center" mt="3">
                    <Skeleton h="4" w="100px" />
                    <Skeleton h="4" w="100px" />
                </Flex>
            </Flex>

            <Flex
                flexDir={['row', 'column']}
                align="flex-end"
                justify="center"
                flex="1"
                gap="4"
                mt={['5', '0']}
            >
                <Skeleton w={['50%', '120px']} h="34px" />
                <Skeleton w={['50%', '120px']} h="34px" />
            </Flex>
        </Flex>
    );
};
