import { SelectFieldItem } from '@/components/shared/form/select-field';
import { Result } from '@/lib/api/utils';
import { LookupResponse } from '@/lib/types/lookup-response';
import { useCallback, useEffect, useState } from 'react';

export function useLookup(
  lookup: () => Promise<Result<LookupResponse[]>>,
  autoFetch: boolean = true
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SelectFieldItem[]>([]);

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    const result = await lookup();

    if (!result.ok) {
      setError(result.message);
    } else {
      setData(result.data.map((p) => ({ label: p.description, value: p.id.toString() })));
    }
    setLoading(false);
  }, [lookup]);

  useEffect(() => {
    if (autoFetch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { loading, error, data, fetchData };
}
