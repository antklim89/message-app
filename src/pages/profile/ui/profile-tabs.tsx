import { Tabs } from '@chakra-ui/react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';

import { tabs } from '../config/tabs';

export function ProfileTabs() {
  const navigate = useNavigate();

  return (
    <Tabs.Root fitted defaultValue={tabs[0].to} navigate={({ value }) => navigate({ to: value })}>
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
