import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { Price } from 'components/Price';
import { Product } from 'types/product';

type CardProductProps = {
    product: Product;
};

export const CardProduct = ({ product }: CardProductProps) => {
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
                {!!product.imgUrl && (
                    <Image
                        src={product.imgUrl}
                        alt={product.name}
                        objectFit="cover"
                        w="200px"
                    />
                )}
            </Flex>

            <Box>
                <Text fontSize="15px" fontWeight={700} color="gray.800" mt="2">
                    {product.name}
                </Text>

                <Price amount={product.price} />
            </Box>
        </Flex>
    );
};
