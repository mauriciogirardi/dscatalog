import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { CardRowProduct } from '../components/CardRowProduct';
import { SkeletonRow } from '../components/SkeletonRow';
import { SpringPage } from 'types/vendor/spring';
import { Pagination } from 'components/Pagination';
import { Product } from 'types/product';
import { Filter } from 'components/Filter';

import requestData from 'api/requests';

export const List = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProduct] = useState<SpringPage<Product>>();

    const getProducts = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            const data = await requestData<SpringPage<Product>>({
                url: '/products',
                params: {
                    page: page - 1,
                    size: 12,
                },
            });

            if (data?.content) {
                setProduct(data);
                setIsLoading(false);
            }
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <>
            <Flex
                mt="5"
                w="100%"
                align={['center']}
                gap="5"
                flexWrap={['wrap-reverse', 'wrap-reverse', 'nowrap']}
            >
                <Button
                    w={['100%', '100%', '12%']}
                    h={['40px', '40px', '60px']}
                    colorScheme="blue"
                    onClick={() => navigate('new')}
                >
                    Adicionar
                </Button>

                <Filter />
            </Flex>

            {isLoading && (
                <Flex w="100%" gap="5" flexDir="column" mt="6">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                </Flex>
            )}

            {!isLoading && products?.content && (
                <>
                    <Flex w="100%" gap="5" flexDir="column" mt="6">
                        {products.content.map((product) => (
                            <Box key={product.id}>
                                <CardRowProduct
                                    product={product}
                                    onDelete={() => getProducts()}
                                />
                            </Box>
                        ))}
                    </Flex>

                    <Pagination
                        currentPage={products.number + 1}
                        totalCountRegister={products.totalElements}
                        onPageChange={setPage}
                        numberOfElements={products.numberOfElements ?? 0}
                        lastPage={products.totalPages}
                    />
                </>
            )}
        </>
    );
};
