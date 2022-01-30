import { Button, Flex, Image, Tag, Text } from '@chakra-ui/react';

import { Price } from 'components/Price';
import { Product } from 'types/product';

type CardRowProductProps = {
    product: Product;
};

export const CardRowProduct = ({ product }: CardRowProductProps) => {
    return (
        <Flex
            borderRadius="4px"
            boxShadow="md"
            bg={['white']}
            w="100%"
            p="4"
            flexDir={['column', 'row']}
        >
            <Flex
                borderRight={['0', '1px solid #ccc']}
                borderBottom={['1px solid #ccc', '0']}
                justify={['center']}
            >
                {!!product.imgUrl && (
                    <Image
                        mr={['0', '5']}
                        mb={['5', '0']}
                        src={product.imgUrl}
                        alt={product.name}
                        objectFit="cover"
                        w="100px"
                    />
                )}
            </Flex>

            <Flex
                ml="5"
                flexDir="column"
                align="flex-start"
                justify="center"
                mt={['5', '0']}
            >
                <Text fontSize="20px" fontWeight={700} color="gray.800" mb="-2">
                    {product.name}
                </Text>

                <Price amount={product.price} />

                <Flex gap="2" align="center">
                    {product.categories.map((category) => (
                        <Tag
                            key={category.id}
                            mt="3"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="gray"
                            size="sm"
                        >
                            {category.name}
                        </Tag>
                    ))}
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
                <Button
                    variant="outline"
                    colorScheme="blackAlpha"
                    w={['50%', '120px']}
                    h="34px"
                >
                    Editar
                </Button>
                <Button
                    variant="outline"
                    colorScheme="red"
                    w={['50%', '120px']}
                    h="34px"
                >
                    Excluir
                </Button>
            </Flex>
        </Flex>
    );
};
