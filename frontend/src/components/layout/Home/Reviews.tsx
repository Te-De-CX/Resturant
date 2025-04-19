import ReviewsCard from "./components/Card/ReviewsCard";
import { reviewsData } from "@/lib/data/home/reviews/data";

const Reviews = () => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12">
          What Our <span className="text-yellow-400">Clients</span> Are Saying
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-0 sm:px-4 md:px-6 lg:px-8">
          {reviewsData.map((item) => (
            <ReviewsCard 
              key={item.id} 
              name={item.name} 
              img={item.img} 
              text={item.text} 
              position={item.position} 
              numberOfStars={item.numberOfStars} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;