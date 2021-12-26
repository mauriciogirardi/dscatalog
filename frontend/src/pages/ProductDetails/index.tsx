import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Heading,
  Image,
  Divider,
} from '@chakra-ui/react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import { Header } from 'components/Header';
import { CATALOG } from 'constants/paths';
import { Price } from 'components/Price';
import { getById } from 'utils/requests';
import { Product } from 'types/product';
import { SkeletonProductDetail } from './SkeletonProductDetail';

export default function ProductsDetails() {
  const [product, setProduct] = useState({} as Product);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      const data = await getById(`/products/${id}`);

      if (data) {
        setProduct(data);
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  return (
    <>
      <Header />

      <Flex
        height={['90vh', '92.5vh']}
        maxW="900px"
        align="center"
        w="100%"
        m="auto"
        px="4"
      >
        {loading && <SkeletonProductDetail />}

        {!loading && product && (
          <Box w="100%" bg="gray.800" borderRadius="4px" p="5" boxShadow="md">
            <>
              <Link to={CATALOG}>
                <Flex align="center" mb="4">
                  <Icon
                    as={MdArrowBackIosNew}
                    color="blue.400"
                    fontSize={16}
                    mr="2"
                  />
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
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      w={['100%', '80%', '300px']}
                      objectFit="cover"
                      borderRadius="4px"
                    />
                  </Flex>
                  <Heading as="h4" fontSize="20" color="gray.100" mt="3">
                    {product.name}
                  </Heading>
                  <Price
                    amount={product.price}
                    brlSize="18"
                    realSize="30"
                    centSize="18"
                  />
                </Box>

                <Box mt={['5']} w={['100%', '100%', '49%']}>
                  <Heading as="h4" fontSize="18">
                    Descrição do Produto
                  </Heading>
                  <Text color="gray.100" fontSize="15">
                    {product.description}
                  </Text>
                </Box>
              </Flex>
            </>
          </Box>
        )}
      </Flex>
    </>
  );
}