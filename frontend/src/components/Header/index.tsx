import { Flex, Container, Box, IconButton, Icon } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useSidebarDrawer } from 'hooks/useSidebarDrawer';
import { Logo } from './Logo';

export const Header = () => {
  const { onOpen, isOpen } = useSidebarDrawer();

  return (
    <Box bg="gray.800" borderBottom="1px" borderColor="blue.400">
      <Container maxW="container.lg" py="4">
        <Flex align="center" justify="space-between">
          <Logo />

          {!isOpen && (
            <IconButton
              pt="1.5"
              aria-label="open navigation"
              type="button"
              onClick={onOpen}
              variant="unstyled"
              _hover={{ color: 'gray.200' }}
              transitionDuration="0.2s"
              icon={<Icon as={RiMenuLine} fontSize="25" />}
            />
          )}
        </Flex>
      </Container>
    </Box>
  );
};
