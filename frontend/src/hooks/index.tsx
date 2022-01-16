import { ReactNode } from 'react';

import { SidebarDrawerProvider } from './useSidebarDrawer';
import { ShowPasswordProvider } from './useShowPassword';
import { AuthProvider } from './useAuth';

type ProviderProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <SidebarDrawerProvider>
        <ShowPasswordProvider>{children}</ShowPasswordProvider>
      </SidebarDrawerProvider>
    </AuthProvider>
  );
};
