'use client';

import Ads from './components/Ads';
import Categories from './components/Categories';
import History from './components/History';
import { useCurrentUser } from '@/lib/api/auth';
import Orders from './components/Orders';
import { BiBell } from 'react-icons/bi';

export default function Dashboard() {
  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-col md:flex-row w-full overflow-x-hidden">
      <div className="md:py-6 pt-6 mr-80  w-full md:w-auto md:flex-1 md:min-w-0"> 
        {user && (
          <div className="space-y-4 px-4 md:px-8 flex justify-between"> 
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl md:text-xl font-semibold">
                Hello, {user.username}!
              </h2>
            </div>
            <div>
              <BiBell className='w-5 h-5' />
            </div>
          </div>
        )}
        <Ads />
        <Categories />
        <div className='md:px-8 px-4'>
          <History />
        </div>
      </div>
      <div className="w-full md:w-auto md:flex-shrink-0" >
        <Orders />
      </div>
    </div>
  );
}