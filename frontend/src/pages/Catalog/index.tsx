import { useCallback, useEffect, useState } from 'react';
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { SkeletonCatalog } from './SkeletonCatalog';
import { CardProduct } from 'components/CardProduct';
import { SpringPage } from 'types/vendor/spring';
import { Pagination } from 'components/Pagination';
import { Product } from 'types/product';
import { Header } from 'components/Header';

import requestData from 'api/requests';

export default function Catalog() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProduct] = useState<SpringPage<Product>>();

  const getProduct = useCallback(async (): Promise<void> => {
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
    getProduct();
  }, [getProduct]);

  return (
    <>
      <Header />

      <Container maxW="container.lg" py="4">
        <Heading as="h4" fontSize="20px" fontWeight={500} color="gray.300">
          Catálago de produtos
        </Heading>

        {isLoading && (
          <SimpleGrid as="div" mt="10" minChildWidth="200px" gap="5">
            <SkeletonCatalog />
            <SkeletonCatalog />
            <SkeletonCatalog />
            <SkeletonCatalog />
          </SimpleGrid>
        )}

        {!isLoading && products?.content && (
          <>
            <SimpleGrid
              mt="10"
              minChildWidth="200px"
              gap="5"
              align="flex-start"
            >
              {products.content.map((product) => (
                <Link to={`${product.id}`} key={product.id}>
                  <CardProduct product={product} />
                </Link>
              ))}
            </SimpleGrid>

            <Pagination
              currentPage={products.number + 1}
              totalCountRegister={products.totalElements}
              onPageChange={setPage}
              numberOfElements={products.numberOfElements ?? 0}
              lastPage={products.totalPages}
            />
          </>
        )}
      </Container>
    </>
  );
}
