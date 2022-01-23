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
import { AiOutlinePoweroff } from 'react-icons/ai';

import { useAuth } from 'hooks/useAuth';
import { useSidebarDrawer } from 'hooks/useSidebarDrawer';
import { SidebarNav } from './SidebarNav';
import { ADMIN_AUTH } from 'constants/paths';
import { ButtonLink } from 'components/ButtonLink';

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
          <DrawerFooter>
            {!!user?.token_type ? (
              <Button
                w="100%"
                size="sm"
                onClick={signOut}
                _focus={{ borderColor: 'red' }}
                colorScheme="red"
                leftIcon={<AiOutlinePoweroff />}
              >
                Sair
              </Button>
            ) : (
              <ButtonLink
                title="Login"
                path={ADMIN_AUTH}
                icon={RiLogoutCircleRLine}
                w="100%"
                bg="green.500"
                hoverColor="green.600"
                sizeIcon={15}
                h="8"
              />
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
