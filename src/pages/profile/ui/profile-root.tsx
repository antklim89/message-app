import { ScrollArea, Stack, Tabs } from '@chakra-ui/react';
import { Link, Outlet, useLocation, useNavigate, useParams, useRouter } from '@tanstack/react-router';

import { tabs } from '../config/tabs';

export function ProfileRoot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { buildLocation } = useRouter();
  const { profileId = '' } = useParams({ strict: false });

  return (
    <Tabs.Root fitted value={location.pathname} navigate={({ value }) => navigate({ to: value })}>
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <Tabs.List mb={2} minWidth="480px">
              {tabs.map(tab => {
                const linkOptions = { to: tab.to, params: { profileId } } as const;
                return (
                  <Tabs.Trigger key={tab.label} value={buildLocation(linkOptions).href} asChild>
                    <Link {...linkOptions}>{tab.label}</Link>
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>

      <Tabs.ContentGroup asChild>
        <Stack as="section">
          <Outlet />
        </Stack>
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
}
