import { CommandIcon } from 'lucide-react';

export function CompanyLogo() {
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <CommandIcon className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-medium">App Template</span>
        <span className="">v0.1.0</span>
      </div>
    </>
  );
}
