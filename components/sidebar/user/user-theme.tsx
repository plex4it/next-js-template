'use client';

import React from 'react';
import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useT } from 'next-i18next/client';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
} as const;

export function NavUserThemeMenu() {
  const { t } = useT('common');
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const currentTheme = mounted ? ((theme as keyof typeof THEME_ICONS) ?? 'system') : 'system';
  const CurrentIcon = THEME_ICONS[currentTheme] ?? SunIcon;

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <CurrentIcon data-icon="inline-start" />
        {t('theme')}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={currentTheme}
            onValueChange={(value) => {
              if (value) setTheme(value);
            }}
          >
            <DropdownMenuRadioItem value="light">
              <SunIcon data-icon="inline-start" />
              {t('themeLight')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <MoonIcon data-icon="inline-start" />
              {t('themeDark')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <MonitorIcon data-icon="inline-start" />
              {t('themeSystem')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
