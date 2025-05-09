'use client';

import { useCurrentUser } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardLoading from '@/app/dashboard/loading';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/Login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <DashboardLoading />
      </div>
    );
  }

  return <>{children}</>;
}