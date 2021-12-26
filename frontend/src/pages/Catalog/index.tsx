import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Header } from 'components/Header';
import { CardProduct } from 'components/CardProduct';
import { Product } from 'types/product';
import { Pagination } from 'components/Pagination';
import { useEffect, useState } from 'react';
import { getPage } from 'utils/requests';
import { SpringPage } from 'types/vendor/spring';
import { SkeletonCatalog } from './SkeletonCatalog';

export default function Catalog() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProduct] = useState<SpringPage<Product>>();

  useEffect(() => {
    async function getProduct() {
      setIsLoading(true);
      const data = await getPage('/products', page - 1);

      if (data.content) {
        setProduct(data);
        setIsLoading(false);
      }
    }

    getProduct();
  }, [page]);

  return (
    <>
      <Header />

      <Container maxW="container.lg" py="4">
        <Heading as="h4" fontSize="20px" fontWeight={500} color="gray.300">
          Catálago de produtos
        </Heading>

        {isLoading && (
          <SimpleGrid mt="10" minChildWidth="200px" gap="5" align="flex-start">
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
