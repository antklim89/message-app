import { Icon, IconButton } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

import { Protected } from '@/shared/ui/protected';
import { links } from '../config/links';

export function BottomSideLinks() {
  return (
    <>
      {links.map(link => (
        <Protected
          key={link.label}
          checkIsPublic={userId => !link.isPublic && userId == null}
          privateElement={
            <IconButton aria-label={`link to ${link.label}`} variant="subtle" asChild>
              <Link to={link.to}>
                <Icon as={link.icon} />
              </Link>
            </IconButton>
          }
        />
      ))}
    </>
  );
}
