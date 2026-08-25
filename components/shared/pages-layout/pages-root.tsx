import { cn } from '@/lib/utils';
import { PageHeader } from './pages-header';
import { PageIcon } from './pages-icon';
import { PageTitle } from './pages-title';
import { PageActions } from './pages-actions';
import { PageContent } from './pages-content';

interface PagesRootProps {
  className?: string;
  children: React.ReactNode;
}

function PagesRoot({ className, children }: Readonly<PagesRootProps>) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-4 p-4', className)}>
      <div className="flex min-h-0 flex-1 flex-col gap-6 p-1 md:p-6">{children}</div>
    </div>
  );
}

PagesRoot.Header = PageHeader;
PagesRoot.Icon = PageIcon;
PagesRoot.Title = PageTitle;
PagesRoot.Actions = PageActions;
PagesRoot.Content = PageContent;

export { PagesRoot };
export { PageHeader } from './pages-header';
export { PageIcon } from './pages-icon';
export { PageTitle } from './pages-title';
export { PageActions } from './pages-actions';
export { PageContent } from './pages-content';
