import { ReactNode } from 'react';

import { SidebarDrawerProvider } from './useSidebarDrawer';
import { ShowPasswordProvider } from './useShowPassword';

type ProviderProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProviderProps) => {
  return (
    <SidebarDrawerProvider>
      <ShowPasswordProvider>{children}</ShowPasswordProvider>
    </SidebarDrawerProvider>
  );
};
