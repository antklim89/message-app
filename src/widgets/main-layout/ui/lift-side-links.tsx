import { Button } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { Protected } from '@/shared/ui/protected';
import { links } from '../config/links';

export function LiftSideLinks() {
  return (
    <>
      {links.map(link => (
        <Protected
          key={link.label}
          checkIsPublic={userId => !link.isPublic && userId == null}
          privateElement={
            <Button width="full" asChild variant="solid">
              <Link to={link.to}>{link.label}</Link>
            </Button>
          }
        />
      ))}
    </>
  );
}
