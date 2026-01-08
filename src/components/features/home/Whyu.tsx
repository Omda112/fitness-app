import { Dumbbell } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ================= Scroll Animation Hook ================= */
function useScrollAnimation(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // animation مرة واحدة
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
/* ========================================================= */

const Whyus = () => {
  const badgeAnim = useScrollAnimation();
  const headingAnim = useScrollAnimation({ threshold: 0.3 });
  const featuresAnim = useScrollAnimation({ threshold: 0.35 });
  const imagesAnim = useScrollAnimation({ threshold: 0.35 });

  const whyUsFeatures = [
    {
      number: '01',
      title: 'Personalized Fitness Plans',
      description:
        'We tailor every workout to fit your unique goals and fitness level ensuring that you make the most progress.',
    },
    {
      number: '02',
      title: 'Results-Driven Focus',
      description:
        "Everything we do is designed to help you achieve measurable results, whether you're aiming for weight loss.",
    },
    {
      number: '03',
      title: 'State-Of-The-Art Equipment',
      description:
        'We provide the latest in gym equipment, from cardio machines to free weights, designed to support every type.',
    },
  ];

  const gymImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80',
    '/src/assets/images/Imagewhyus.png',
  ];

  return (
    <div className="w-full bg-linear-to-b from-gray-900 to-black">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">

        {/* Background Text */}
        <div className="absolute top-10 left-0 pointer-events-none">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-gray-800 opacity-20">
            WHY US
          </h1>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>

              {/* Badge */}
              <div
                ref={badgeAnim.ref}
                className={`flex items-center gap-2 mb-6 transition-all duration-700 ease-out
                  ${badgeAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
                `}
              >
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                </div>
                <span className="text-orange-500 font-semibold">Why Us</span>
              </div>

              {/* Headings */}
              <div
                ref={headingAnim.ref}
                className={`transition-all duration-700 delay-150 ease-out
                  ${headingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  ELEVATE FITNESS WITH THE
                </h2>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
                  <span className="text-orange-500">BEST WAY</span>{' '}
                  <span className="text-white">POSSIBLE</span>
                </h2>

                <p className="text-gray-300 text-lg mb-12">
                  We offer a fitness journey that's tailored to your goals,
                  supported by professional trainers and a welcoming community.
                  Whether it's weight loss, strength building, or overall wellness.
                </p>
              </div>

              {/* Features */}
              <div
                ref={featuresAnim.ref}
                className={`space-y-8 transition-all duration-700 delay-300 ease-out
                  ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
              >
                {whyUsFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-6"
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {feature.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images */}
            <div
  ref={imagesAnim.ref}
  className={`flex gap-4 transition-all duration-700 delay-300 ease-out
    ${imagesAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
  `}
>
  {/* Left Column */}
  <div className="flex flex-col gap-4 flex-1">
    <div className="h-95 rounded-2xl overflow-hidden">
      <img
        src={gymImages[0]}
        alt="Gym 1"
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div className="h-86.25 rounded-2xl overflow-hidden">
      <img
        src={gymImages[1]}
        alt="Gym 2"
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
      />
    </div>
  </div>

  {/* Right Column */}
  <div className="flex flex-col gap-4 flex-1">
    <div className="h-71.25 rounded-2xl overflow-hidden">
      <img
        src={gymImages[2]}
        alt="Gym 3"
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div className="h-86.25 rounded-2xl overflow-hidden">
      <img
        src={gymImages[3]}
        alt="Gym 4"
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
      />
    </div>
  </div>
</div>


          </div>
        </div>
      </section>
    </div>
  );
};

export default Whyus;
