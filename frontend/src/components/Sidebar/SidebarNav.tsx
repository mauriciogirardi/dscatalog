import { Stack } from '@chakra-ui/react';
import { RiGitMergeFill, RiInputMethodFill, RiHomeFill } from 'react-icons/ri';

import { NavLink } from './NavLink';

export const SidebarNav = () => {
  return (
    <Stack spacing="5">
      <NavLink href="/" icon={RiHomeFill} title="Home" />
      <NavLink href="/product" icon={RiInputMethodFill} title="Catálago" />
      <NavLink href="/admin" icon={RiGitMergeFill} title="Admin" />
    </Stack>
  );
};
