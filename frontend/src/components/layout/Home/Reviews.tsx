import ReviewsCard from "./components/Card/ReviewsCard";
import { reviewsData } from "@/lib/data/home/reviews/data";

const Reviews = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-3xl sm:text-4xl font-bold text-black mb-12">
          What Our <span className="text-yellow-400">Clients</span> Are Saying
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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