'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Img from '../../../../../../public/images/dashboard/home/menu.jpg'; 

type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
type MealType = 'breakfast' | 'lunch' | 'dinner';

interface DailyMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
  text: string;
}

type WeeklyMeals = {
  [key in DayOfWeek]: DailyMeals;
};

const MealPlanner = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [currentMeal, setCurrentMeal] = useState<MealType>('breakfast');

  const weeklyMeals: WeeklyMeals = {
    Sunday: {
      breakfast: 'Pancakes with maple syrup and fresh berries',
      lunch: 'Grilled salmon with quinoa and roasted vegetables',
      dinner: 'Beef stew with crusty bread',
      text: "its a beautiful day isn't it"
    },
    Monday: {
      breakfast: 'Avocado toast with poached eggs',
      lunch: 'Chicken Caesar salad',
      dinner: 'Margherita pizza with pepperoni toppings',
      text: "its a beautiful day isn't it"
    },
    Tuesday: {
      breakfast: 'Greek yogurt with granola and honey',
      lunch: 'Turkey and cheese sandwich with soup',
      dinner: 'Spaghetti carbonara',
      text: "its a beautiful day isn't it"
    },
    Wednesday: {
      breakfast: 'Smoothie bowl with chia seeds',
      lunch: 'Vegetable stir fry with rice',
      dinner: 'Grilled chicken with mashed potatoes',
      text: "its a beautiful day isn't it"
    },
    Thursday: {
      breakfast: 'Omelette with mushrooms and cheese',
      lunch: 'Tuna salad wrap with chips',
      dinner: 'Beef tacos with all the fixings',
      text: "its a beautiful day isn't it"
    },
    Friday: {
      breakfast: 'French toast with bacon',
      lunch: 'Shrimp pasta alfredo',
      dinner: 'BBQ ribs with coleslaw',
      text: "its a beautiful day isn't it"
    },
    Saturday: {
      breakfast: 'Bagel with cream cheese and smoked salmon',
      lunch: 'Burger with sweet potato fries',
      dinner: 'Lobster risotto',
      text: "its a beautiful day isn't it"
    }
  };

  const mealDescription: Record<MealType, string> = {
    breakfast: 'Start your day with this nutritious and delicious meal',
    lunch: 'A perfect midday meal to keep you energized',
    dinner: 'A satisfying dinner to end your day right'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hours = currentTime.getHours();
    let mealType: MealType;

    if (hours >= 6 && hours < 11) {
      mealType = 'breakfast';
    } else if (hours >= 11 && hours < 16) {
      mealType = 'lunch';
    } else {
      mealType = 'dinner';
    }

    setCurrentMeal(mealType);
  }, [currentTime]);

  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = currentTime.toLocaleDateString('en-US', dateOptions);
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  const formattedTime = currentTime.toLocaleTimeString('en-US', timeOptions);
  const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[currentTime.getDay()] as DayOfWeek;

  return (
    <div className="lg:bg-[#868686] lg:bg-opacity-20 lg:text-white bg-white text-white md:text-gray-800 p-4 lg:p-6 rounded-xl lg:border-2 lg:border-white lg:backdrop-blur-2xl shadow-lg lg:shadow-none">
      <h3 className="text-lg text-black lg:text-xl capitalize font-bold text-center mb-3 lg:mb-4">your meal planner</h3>
      <div className="flex flex-col px-3 py-2 rounded-xl overflow-hidden relative bg-[#191919] bg-opacity-30 pb-4 lg:pb-6">
      <div className="lg:block absolute inset-0 z-10">
  <div className="relative w-full h-full">
    <Image
      src={Img}
      alt="Menu Background"
      fill
      className="object-cover"
      quality={100}
      priority
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/50"></div>
  </div>
</div>
        <div className="flex justify-between z-20 items-start my-1 lg:my-2">
          <h4 className="text-yellow-400 text-lg lg:text-xl font-bold">{currentDay}</h4>
          <div className="flex flex-col text-xs lg:text-sm">
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
          </div>
        </div>
        <div className="font-semibold text-sm lg:text-base mt-2 z-20">
          <p>{weeklyMeals[currentDay][currentMeal]}</p>
        </div>
        <div className="text-xs lg:text-[0.7rem] my-1 lg:mt-2">
          {mealDescription[currentMeal]}
        </div>
        its a beautiful day isn&apos;t it
      </div>
    </div>
  );
};

export default MealPlanner;