/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

type SidebarDrawerContextData = UseDisclosureReturn;

type SidebarDrawerProviderProps = {
  children: ReactNode;
};

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProviderProps) => {
  const disclosure = useDisclosure();
  const { pathname } = useLocation();

  useEffect(() => {
    disclosure.onClose();
  }, [pathname]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export function useSidebarDrawer(): SidebarDrawerContextData {
  return useContext(SidebarDrawerContext);
}
