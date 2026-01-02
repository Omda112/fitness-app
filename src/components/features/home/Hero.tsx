import { Trans, useTranslation } from "react-i18next";
import hero from "@/assets/images/hero_image.png"; // hero image inside assets
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-29.25 px-6 md:px-12 lg:px-20 pt-12 md:pt-18 lg:pt-25 rounded-lg overflow-hidden
                        bg-[url('/src/assets/images/home-cover.png')] bg-cover bg-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/60 z-0"></div>

      {/* Text Content */}
      <div className="relative z-10 pt-0 md:pt-10 lg:pt-20 text-center lg:text-start">

        {/* Heading */}
        <h1 className="font-bold uppercase leading-[120%] text-gray-100 text-3xl md:text-5xl lg:text-[4rem]">
          <Trans
            i18nKey="home.hero_section.hero_heading.title"
            components={{ highlight: <span className="text-[#FF4100]" /> }}
          />
        </h1>

        {/* Description */}
        <div className="mt-6 md:mt-7 text-base md:text-lg font-normal leading-7 
                       text-gray-200 ps-4 md:ps-5 border-s-4 border-s-[#FF4100] 
                        max-w-xl mx-auto lg:mx-0">
          <p>{t("home.hero_section.description.desc_line1")}</p>
          <p>{t("home.hero_section.description.desc_line2")}</p>
          <p>{t("home.hero_section.description.desc_line3")}</p>
        </div>

        {/* Gym Statistics */}
        <ul className="flex flex-wrap justify-center gap-6 mt-10 md:gap-8 md:mt-12 
                       lg:flex-nowrap lg:justify-start lg:gap-8 lg:mt-16 
                    text-gray-100">
          <li className="flex flex-col gap-1.5 w-36 lg:w-46.5">
            <span className="text-2xl font-bold leading-9">1200+</span>
            <span className="text-lg capitalize">{t("home.hero_section.gym_data.Active_Members")}</span>
          </li>
          <li className="flex flex-col gap-1.5 w-36 lg:w-46.5">
            <span className="text-2xl font-bold leading-9">12+</span>
            <span className="text-lg capitalize">{t("home.hero_section.gym_data.Certified_Trainers")}</span>
          </li>
          <li className="flex flex-col gap-1.5 w-36 lg:w-46.5">
            <span className="text-2xl font-bold leading-9">20+</span>
            <span className="text-lg capitalize whitespace-nowrap">{t("home.hero_section.gym_data.Year_Of_Experience")}</span>
          </li>
        </ul>

        {/* Hero Buttons */}
        <div className="flex flex-row items-center justify-center gap-6 md:gap-10 lg:items-start lg:justify-start lg:gap-15 mt-10 md:mt-12 lg:mt-16">
          {/* Get Started */}
          <div className="relative flex items-center">
            <Button className="bg-[#FF4100] text-gray-100 rounded-[6.25rem] font-semibold text-base leading-4 py-5 px-8">
              {t("home.hero_section.hero_buttons.get_started")}
            </Button>
            <div className="absolute -end-4 bg-[#FF4100] border-2 border-gray-100 rounded-full p-1">
              <MoveUpRight size={18} />
            </div>
          </div>

          {/* Explore More */}
          <div className="relative flex items-center">
            <Button className="bg-transparent text-[#FF4100] border border-[#FF4100] rounded-[6.25rem] font-semibold text-base leading-4 py-5 px-8">
              {t("home.hero_section.hero_buttons.explore_more")}
            </Button>
            <div className="absolute -end-4 bg-[#FF4100] border-2 border-gray-100 rounded-full p-1">
              <MoveUpRight size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative z-10 flex justify-center md:justify-center lg:justify-end">
        <img
          src={hero}
          alt="Hero"
          className="w-full max-w-sm md:max-w-md h-auto lg:w-116.75 lg:h-179.75"
        />
      </div>
    </section>
  );
};

export default Hero;
