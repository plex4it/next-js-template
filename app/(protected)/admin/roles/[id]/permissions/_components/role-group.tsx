'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import assignGroup from '@/lib/api/roles/permission-groups/assign-group';
import { toast } from 'sonner';
import unassignGroup from '@/lib/api/roles/permission-groups/unassign-group';
import { useState } from 'react';

interface RoleGroupProps {
  title: string;
  description?: string | null;
  groupId: bigint;
  roleId: bigint;
  isAssigned: boolean;
}

export function RoleGroup({
  title,
  description,
  groupId,
  roleId,
  isAssigned,
}: Readonly<RoleGroupProps>) {
  const [active, setActive] = useState(isAssigned);

  const handleCheck = async (checked: boolean) => {
    setActive(checked);

    const result = checked
      ? await assignGroup(roleId, groupId)
      : await unassignGroup(roleId, groupId);

    if (!result.ok) {
      toast.error(result.message);
      setActive(!checked);
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-row items-center gap-3">
        <div className="flex flex-col p-0">
          <p className="font-semibold text-foreground">{title}</p>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        <div className="ml-auto flex gap-4 items-center">
          <Switch onCheckedChange={handleCheck} checked={active} />
        </div>
      </CardContent>
    </Card>
  );
}
