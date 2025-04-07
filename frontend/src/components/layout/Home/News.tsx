import NewsCard from "./components/Card/NewsCard";
import { newsData } from "@/lib/data/home/news/data";

const News = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-3xl sm:text-4xl font-semibold capitalize mb-12 text-gray-900">
          Latest Burger News
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsData.map((item) => (
            <NewsCard 
              key={item.id} 
              img={item.img} 
              name={item.name} 
              date={item.date} 
            />
          ))}
        </div>
        
        <div className="text-center">
          <button className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Read Blog
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;