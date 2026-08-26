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
import { LanguagesIcon } from 'lucide-react';
import { useChangeLanguage, useT } from 'next-i18next/client';

export function NavUserLanguageMenu() {
  const { t, i18n } = useT('common');
  const changeLanguage = useChangeLanguage();
  const currentLng = i18n.language?.startsWith('pt') ? 'pt' : 'en';

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <LanguagesIcon data-icon="inline-start" />
        {t('language')}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={currentLng}
            onValueChange={(value) => {
              if (value === 'en' || value === 'pt') {
                void changeLanguage(value);
              }
            }}
          >
            <DropdownMenuRadioItem value="en">{t('langEn')}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pt">{t('langPt')}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
