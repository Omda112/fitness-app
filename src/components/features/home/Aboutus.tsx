import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Dumbbell } from "lucide-react";
import DivAboutUsImages from "./Aboutusimage";
import { useEffect, useRef, useState } from "react";

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

const features = [
  {
    title: "Personal Trainer",
    description:
      "Achieve your fitness goals with the guidance of our certified trainers.",
  },
  {
    title: "Cardio Programs",
    description:
      "From steady-state runs to interval sprints, our treadmill programs.",
  },
  {
    title: "Quality Equipment",
    description:
      "Our gym is equipped with the latest cardio & strength machines.",
  },
  {
    title: "Healthy Nutritions",
    description:
      "Fuel your fitness journey with customized meal plans for you.",
  },
];

export default function Aboutus() {
  const headingAnim = useScrollAnimation();
  const featuresAnim = useScrollAnimation({ threshold: 0.3 });
  const buttonAnim = useScrollAnimation({ threshold: 0.4 });

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-cover bg-center">
      <div className="absolute inset-0 bg-[#fffffff2] backdrop-blur-[43px]" />

      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-20 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 max-w-7xl w-full">

          {/* Images */}
          <div className="hidden lg:block">
            <DivAboutUsImages />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-16 flex-1">

            {/* Heading */}
            <div
              ref={headingAnim.ref}
              className={`flex flex-col gap-6 text-center transition-all duration-700 ease-out
                ${headingAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              <Badge className="mx-auto flex justify-center bg-linear-to-r from-orange-500 to-red-500 text-white border-none px-4 sm:px-6 py-3 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20">
                <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                About Our Gym
              </Badge>

              <h1 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-tight px-3">
                <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  EMPOWERING YOU TO
                </span>
                <br />
                <span className="bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                  ACHIEVE GREATNESS
                </span>
              </h1>

              <p className="font-normal text-[#242424] text-lg leading-[28.8px] max-w-xl mx-auto">
                We believe fitness is more than just a workout—it's a lifestyle.
                With top-of-the-line facilities, certified trainers, and a
                supportive community, we're here to inspire and guide you every
                step of the way.
              </p>
            </div>

            {/* Features */}
            <div
              ref={featuresAnim.ref}
              className={`flex flex-col gap-8 transition-all duration-700 delay-150 ease-out
                ${featuresAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
            >
              <div className="grid grid-cols-2 gap-6">
                {features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        <ArrowUpRight className="w-5 h-5 text-orange-500" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-xl">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-6">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {features.slice(2, 4).map((feature, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        <ArrowUpRight className="w-5 h-5 text-orange-500" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-xl">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div
              ref={buttonAnim.ref}
              className={`transition-all duration-700 delay-300 ease-out
                ${buttonAnim.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
            >
              <Button className="w-50 h-12.5 bg-[#ff4100] hover:bg-[#ff4100]/90 rounded-[100px] px-7.5 relative">
                <span className="font-semibold text-[#f3f3f4] text-base">
                  Get Started
                </span>
                <div className="absolute -right-1.75 top-1/2 -translate-y-1/2 flex items-center justify-center w-8.75 h-8.75 bg-[#ff4100] rounded-full border-[2.12px] border-[#f3f3f4]">
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#f3f3f4]" />
                </div>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
