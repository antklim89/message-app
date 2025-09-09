import type { ComponentProps } from 'react';
import { Link } from '@tanstack/react-router';

import logoIcon from '@/shared/assets/logo.svg';

export function Logo(props: ComponentProps<'img'>) {
  return (
    <Link to="/">
      <img alt="logo" height={64} src={logoIcon} width={64} {...props} />
    </Link>
  );
}
