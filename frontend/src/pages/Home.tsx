import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { ButtonLink } from 'components/ButtonLink';
import mainImageSvg from 'assets/svgs/backgroundMain.svg';

import { Header } from 'components/Header';

export default function Home() {
  return (
    <>
      <Header />

      <Flex
        height={['90vh', '92.5vh']}
        maxW="1000px"
        align="center"
        w="100%"
        m="auto"
        px="4"
      >
        <Flex
          flexDir={['column-reverse', 'column-reverse', 'row']}
          h={['600px', '800px', '510px']}
          borderRadius="4px"
          justify="center"
          align="center"
          boxShadow="xl"
          bg="gray.800"
          w="100%"
          p="8"
        >
          <Flex flexDir="column" align={['center', 'start']} w="100%">
            <Heading
              textAlign={['center', 'left']}
              fontSize={['25px', '35px']}
              w={['300px', '380px']}
            >
              Conheça o melhor catálogo de produtos para DEVs.
            </Heading>
            <Text
              fontSize={['16px', '17px']}
              textAlign={['center', 'left']}
              w={['300px', '380px']}
              color="gray.300"
              mt="2"
              mb="6"
            >
              Ajudaremos você a encontrar os melhores produtos disponíveis no
              mercado.
            </Text>

            <ButtonLink
              path="/product"
              title="INICIE AGORA A SUA BUSCA"
              icon={RiArrowRightSLine}
            />
          </Flex>

          <Box mb={['10', '10', '0']} w="100%">
            <Image
              src={mainImageSvg}
              alt="mulher sentada na mesa com um computador"
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
