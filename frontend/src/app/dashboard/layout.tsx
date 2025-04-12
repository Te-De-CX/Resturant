'use client';
import { useState, useEffect } from 'react';
import DashboardNav from '@/components/UI/Nav/DashBoardNav';
import ProtectedRoute from '@/components/layout/Routes/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); 
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <ProtectedRoute>
      <DashboardNav />
      {/* Content area padding adjustment */}
      <div className={`${!isMobile ? 'ml-64' : 'pb-16'} min-h-screen transition-all`}>
        {children}
      </div>
    </ProtectedRoute>
  );
}