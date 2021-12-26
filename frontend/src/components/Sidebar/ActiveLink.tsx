import { Link, useLocation } from 'react-router-dom';
import { cloneElement, ReactElement } from 'react';

interface ActiveLikProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
  href: string;
}

export function ActiveLink({ children, href }: ActiveLikProps) {
  const { pathname } = useLocation();

  let isActive = false;

  if (pathname === href) isActive = true;

  return (
    <Link to={href}>
      {cloneElement(children, { color: isActive ? 'blue.400' : 'gray.50' })}
    </Link>
  );
}
