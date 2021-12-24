import { Box, Flex, Image, Text } from '@chakra-ui/react';

type CardProductProps = {
  urlImg?: string;
  title: string;
  price: string;
};

export const CardProduct = ({ urlImg, title, price }: CardProductProps) => {
  const [real, cents] = price.split(',');

  return (
    <Flex
      borderRadius="4px"
      flexDir="column"
      boxShadow="xl"
      bg="white"
      w={['100%', '230px']}
      p="4"
    >
      <Flex justify="center" w="100%">
        <Image src={urlImg} alt={title} objectFit="cover" w="200px" />
      </Flex>

      <Box>
        <Text fontSize="15px" fontWeight={700} color="gray.800" mt="2">
          {title}
        </Text>

        <Flex align="center" mt="2">
          <Text
            fontWeight={500}
            color="gray.300"
            fontSize="12px"
            mt="-5px"
            mr="1"
          >
            R$
          </Text>
          <Text fontSize="20px" fontWeight={800} color="blue.400">
            {real}
          </Text>
          <Text fontWeight={800} color="blue.400" fontSize="14px" mt="5px">
            ,{cents}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
