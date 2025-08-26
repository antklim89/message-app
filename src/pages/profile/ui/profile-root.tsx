import { Tabs } from '@chakra-ui/react';
import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';

import { tabs } from '../config/tabs';

export function ProfileRoot() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabs.Root fitted value={location.href} navigate={({ value }) => navigate({ to: value })}>
      <Tabs.List>
        {tabs.map(tab => (
          <Tabs.Trigger key={tab.label} value={tab.to} asChild>
            <Link to={tab.to}>{tab.label}</Link>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.ContentGroup>
        <Outlet />
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
}
