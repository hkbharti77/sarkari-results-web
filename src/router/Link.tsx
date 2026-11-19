import React from 'react';
import { useRouter } from './RouterContext';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  scroll?: boolean;
  activeClassName?: string;
  exact?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  replace = false,
  scroll = true,
  activeClassName,
  exact = false,
  onClick,
  className = '',
  children,
  ...rest
}) => {
  const { route, navigate } = useRouter();

  // Determine active state
  const isExternal = to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:');
  const targetPath = to.split('?')[0].split('#')[0];
  const isActive = exact
    ? route.pathname === targetPath
    : targetPath === '/'
    ? route.pathname === '/'
    : route.pathname.startsWith(targetPath);

  const combinedClassName = `${className} ${isActive && activeClassName ? activeClassName : ''}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      (!rest.target || rest.target === '_self') &&
      !isExternal
    ) {
      e.preventDefault();
      navigate(to, { replace, scroll });
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={combinedClassName}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
};
