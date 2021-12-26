import { Stack } from '@chakra-ui/react';
import { ADMIN, CATALOG, HOME } from 'constants/paths';
import { RiGitMergeFill, RiInputMethodFill, RiHomeFill } from 'react-icons/ri';

import { NavLink } from './NavLink';

export const SidebarNav = () => {
  return (
    <Stack spacing="5">
      <NavLink href={HOME} icon={RiHomeFill} title="Home" />
      <NavLink href={CATALOG} icon={RiInputMethodFill} title="Catálago" />
      <NavLink href={ADMIN} icon={RiGitMergeFill} title="Admin" />
    </Stack>
  );
};
