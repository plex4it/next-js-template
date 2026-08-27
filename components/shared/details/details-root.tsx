import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { DetailsContent } from './content/details-content';
import { DetailsHeader } from './header/details-header';
import { DetailsHeaderInfo } from './header/details-header-info';
import { DetailsHeaderImage } from './header/details-header-image';
import { DetailsHeaderTabs } from './header/details-header-tabs';
import { DetailsHeaderInfoContent } from './header/details-header-info-content';
import { DetailsHeaderActions } from './header/details-header-actions';
import { DetailsHeaderContent } from './header/details-header-content';
import { DetailsContentTitle } from './content/details-content-title';
import { DetailsContentHeader } from './content/details-content-header';
import { DetailsHeaderInfoSubTitle } from './header/details-header-info-subTitle';
import { DetailsHeaderInfoTitle } from './header/details-header-info-title';
import { DetailsContentBody } from './content/details-content-body';

interface DetailsRootProps {
  children: ReactNode;
  className?: string;
}

const DetailsRoot = ({ children, className }: Readonly<DetailsRootProps>) => {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>;
};

DetailsRoot.Header = DetailsHeader;
DetailsRoot.Content = DetailsContent;
DetailsRoot.Info = DetailsHeaderInfo;
DetailsRoot.Image = DetailsHeaderImage;
DetailsRoot.Tabs = DetailsHeaderTabs;
DetailsRoot.InfoContent = DetailsHeaderInfoContent;
DetailsRoot.InfoSubTitle = DetailsHeaderInfoSubTitle;
DetailsRoot.InfoTitle = DetailsHeaderInfoTitle;
DetailsRoot.Actions = DetailsHeaderActions;
DetailsRoot.HeaderContent = DetailsHeaderContent;
DetailsRoot.ContentTitle = DetailsContentTitle;
DetailsRoot.ContentHeader = DetailsContentHeader;
DetailsRoot.ContentBody = DetailsContentBody;

export { DetailsRoot };
