import type { ComponentProps } from 'react';
import { Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import logoIcon from '@/share/assets/logo.svg';

export function Logo(props: ComponentProps<'img'>) {
  return (
    <Flex>
      <Link to="/">
        <img alt="logo" height={64} src={logoIcon} width={64} {...props} />
      </Link>
    </Flex>
  );
}
