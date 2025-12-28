import { useTranslation } from "react-i18next";
import logo from "@/assets/images/fitness-app-logo.png";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
    // Translation
    const { t } = useTranslation();

    return (
        <footer className="bg-zinc-300 dark:bg-[#232424] py-4 px-4 lg:pt-10 lg:pb-20 lg:px-20">
            {/* Main container: flex layout for mobile (column) and large screens (row) */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-0">

                {/* ---------------- Logo & Slogan ---------------- */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 lg:border-0 lg:mb-0 lg:pb-0">

                    {/* Logo image */}
                    <img
                        src={logo}
                        alt="Fitness APP Logo"
                        className="w-48 h-32 lg:w-28 lg:h-16"
                    />
                    
                    {/* Slogan lines */}
                    <p className="text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                        {t("footer.slogan_1")}
                    </p>
                    <p className="text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                        {t("footer.slogan_2")}
                    </p>
                </div>

                {/* ---------------- Contact Us Section ---------------- */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 lg:border-0 lg:mb-0 lg:pb-0">

                    {/* Section Title */}
                    <h4 className="text-[#242424] dark:text-[#F3F3F4] font-bold uppercase leading-5 md:leading-6 lg:leading-7 text-base md:text-lg lg:text-xl mb-4">
                        {t('footer.contact_us')}
                    </h4>

                    {/* Contact list */}
                    <ul className="flex flex-col space-y-2">

                        {/* Phone */}
                        <li className="flex items-center gap-4 dark:text-[#F3F3F4]">
                            <span className="rounded-full border border-black dark:border-[#3F4553] p-2">
                                <Phone size={16} className="fill-current text-black dark:text-white" />
                            </span>
                            <span className="text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                                {t('footer.phone_number')}
                            </span>
                        </li>

                        {/* Email */}
                        <li className="flex items-center gap-4 dark:text-[#F3F3F4]">
                            <span className="rounded-full border border-black dark:border-[#3F4553] p-2">
                                <Mail size={16} />
                            </span>
                            <span className="text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                                info@gmail.com
                            </span>
                        </li>
                    </ul>
                </div>

                {/* ---------------- Gym Timing Section ---------------- */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 lg:border-0 lg:mb-0 lg:pb-0">

                    {/* Section Title */}
                    <h4 className="text-[#242424] dark:text-[#F3F3F4] font-bold uppercase leading-5 md:leading-6 lg:leading-7 text-base md:text-lg lg:text-xl">
                        {t('footer.gym_timing')}
                    </h4>

                    {/* Gym hours list */}
                    <ul className="mt-4 space-y-1">
                        <li className="text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                            {t("footer.gym_timing_1")}
                        </li>
                        <li className="text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                            {t("footer.gym_timing_2")}
                        </li>
                    </ul>
                </div>

                {/* ---------------- Location Section ---------------- */}
                <div className="pb-4 lg:pb-0">

                    {/* Section Title */}
                    <h4 className="text-[#242424] dark:text-[#F3F3F4] font-bold uppercase leading-5 md:leading-6 lg:leading-7 text-base md:text-lg lg:text-xl">
                        {t('footer.location')}
                    </h4>
                    
                    {/* Address */}
                    <p className="mt-4 text-[#242424] dark:text-[#F3F3F4] font-normal leading-5 md:leading-6 lg:leading-7 text-sm md:text-base lg:text-lg">
                        {t("footer.gym_location_1")}<br />
                        {t("footer.gym_location_2")}
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
