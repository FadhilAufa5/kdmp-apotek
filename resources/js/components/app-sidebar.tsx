import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, ShoppingCart, Box, Map, Users } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
  const { auth }: any = usePage().props;

  // Menu khusus Apotek
  const apotekSections = [
    {
      title: 'Dashboard',
      items: [{ title: 'Dashboard', href: '/dashboard/apotek', icon: LayoutGrid }],
    },
    {
      title: 'Menus',
      items: [
        { title: 'Purchase Orders', href: '/purchase', icon: ShoppingCart },
        { title: 'Process Orders', href: '/process', icon: Box },
      ],
    },
  ];

  // Menu khusus Busdev
  const busdevSections = [
    {
      title: 'Dashboard',
      items: [{ title: 'Dashboard', href: '/dashboard/busdev', icon: LayoutGrid }],
    },
   {
      title: 'Menus',
      items: [
        { title: 'Mapping', href: '/mapping', icon: Map },
        { title: 'Account Manage', href: '/account', icon: Users },
      ],
    },
  ];

  // Pilih sections sesuai role user
  const sections = auth.user.role === 'apotek' ? apotekSections : busdevSections;

  const footerNavItems: NavItem[] = [];

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain sections={sections} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
