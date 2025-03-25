import { Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import logoIcon from '@/assets/logo.svg';


export function Logo() {
  return (
    <Flex>
      <Link to="/">
        <img
          alt="logo"
          height={64}
          src={logoIcon}
          width={64}
        />
      </Link>
    </Flex>
  );
}
