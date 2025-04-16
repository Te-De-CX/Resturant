'use client';

import Ads from './components/Ads';
import Categories from './components/Categories';
import History from './components/History';
// import HomeCart from '@/components/layout/Cart/HomeCart';
import { useCurrentUser } from '@/lib/api/auth';
import Orders from './components/Orders';

export default function Dashboard() {
  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-col md:flex-row w-full overflow-x-hidden">
      <div className="py-6 mr-80  w-full md:w-auto md:flex-1 md:min-w-0"> 
        {user && (
          <div className="space-y-4 px-4 md:px-8"> 
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl md:text-xl font-semibold"> {/* Responsive text */}
                Hello, {user.username}!
              </h2>
            </div>
          </div>
        )}
        {/* <div className="px-4 md:px-8">
          <HomeCart />
        </div> */}
        <Ads />
        <Categories />
        <div className='px-8'>
          <History />
        </div>
      </div>
      <div className="w-full md:w-auto md:flex-shrink-0" >
        <Orders />
      </div>
    </div>
  );
}