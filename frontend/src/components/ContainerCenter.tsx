import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ContainerCenterProps = {
  children: ReactNode;
};

export const ContainerCenter = ({ children }: ContainerCenterProps) => {
  return (
    <Flex
      height={['90vh', '92.5vh']}
      maxW="1000px"
      align="center"
      w="100%"
      m="auto"
      px="4"
    >
      {children}
    </Flex>
  );
};
