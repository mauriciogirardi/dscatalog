import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import { useAuth } from 'hooks/useAuth';
import { useSidebarDrawer } from 'hooks/useSidebarDrawer';
import { SidebarNav } from './SidebarNav';

export const Sidebar = () => {
  const { isOpen, onClose } = useSidebarDrawer();
  const { signOut, user } = useAuth();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" />

          <DrawerHeader>Navegação</DrawerHeader>

          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
          {!!user?.token_type && (
            <DrawerFooter>
              <Button
                w="100%"
                size="sm"
                onClick={signOut}
                _focus={{ borderColor: 'red' }}
                colorScheme="red"
                leftIcon={<RiLogoutCircleRLine />}
              >
                Sair
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
