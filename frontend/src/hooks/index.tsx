import { ReactNode } from 'react';

import { SidebarDrawerProvider } from './useSidebarDrawer';

type ProviderProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProviderProps) => {
  return <SidebarDrawerProvider>{children}</SidebarDrawerProvider>;
};
