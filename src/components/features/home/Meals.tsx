import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Dumbbell } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ================= Scroll Animation Hook ================= */
function useScrollAnimation(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
/* ========================================================= */

const Meals = () => {
  const badgeAnim = useScrollAnimation();
  const headingAnim = useScrollAnimation({ threshold: 0.3 });
  const cardsAnim = useScrollAnimation({ threshold: 0.3 });

  const mealPlans = [
    {
      title: 'BREAKFAST',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
    },
    {
      title: 'LUNCH',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    },
    {
      title: 'DINNER',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    },
  ];

  return (
    <div className="w-full bg-[#fffffff2] py-5">
      
      {/* Badge */}
      <div
        ref={badgeAnim.ref}
        className={`flex justify-center transition-all duration-700 ease-out
          ${badgeAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="inline-flex items-center gap-3 mt-2 px-6 py-3">
          <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <span className="text-orange-600 font-bold text-lg">
            Healthy Nutritions
          </span>
        </div>
      </div>

      {/* Meal Plans Section */}
      <section className="relative  px-4 sm:px-6 lg:px-8">
        
      

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div
            ref={headingAnim.ref}
            className={`text-center mb-12 transition-all duration-700 delay-150 ease-out
              ${headingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
          >

               <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-gray-800 opacity-30">
            HEALTHY
          </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">
              FUEL YOUR FITNESS JOURNEY WITH
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
              CUSTOMIZED{' '}
              <span className="text-orange-500">MEAL PLANS</span> FOR YOU
            </h2>
          </div>

          {/* Meal Cards */}
          <div
            ref={cardsAnim.ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
              transition-all duration-700 delay-300 ease-out
              ${cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
            `}
          >
            {mealPlans.map((meal, index) => (
              <Card
                key={index}
                className="bg-gray-200 border-none overflow-hidden group hover:shadow-2xl transition-all duration-300"
                style={{
                  transitionDelay: `${index * 120}ms`, // stagger effect
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {meal.title}
                  </h3>

                  <button className="flex items-center gap-2 text-orange-500 font-semibold hover:gap-4 transition-all">
                    Read More
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Meals;
