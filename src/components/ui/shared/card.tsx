import React from "react";
import { ChevronRight, MoveUpRight } from "lucide-react";

interface WorkoutCardProps {
  image: string;
  title: string;
  buttonText?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  titleColor?: string;
  footerBgClass?: string;
}


const Card: React.FC<WorkoutCardProps> = ({
  image,
  title,
   titleColor,
   footerBgClass,
  buttonText = "Explore",
  onClick,
  width = 404,
  height = 399,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ width, height }}
      className="
        relative overflow-hidden
        rounded-[18px]
        border border-black/10
        shadow-[0_10px_30px_rgba(0,0,0,0.15)]
        bg-white
        cursor-pointer
        active:scale-[0.98]
        transition-transform
      "
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div   className={`
    absolute bottom-0 left-0 right-0
    backdrop-blur-md p-5
    ${footerBgClass ?? "bg-white/90"}
  `}>
      <h3
  className={`text-lg font-bold uppercase ${
    titleColor ?? "text-zinc-900"
  }`}
>
  {title}
</h3>

  <button className="mt-2 flex items-center gap-2 text-orange-500 font-semibold">
  {buttonText}

  {/* Outer rotated circle */}
  <span
    className="
      w-6 h-6
      bg-orange-500
      rounded-[63px]
      flex items-center justify-center
      p-2
      
    "
  >
    {/* Arrow counter-rotated */}
  <MoveUpRight
  size={14}
  className="text-black"
/>

  </span>
</button>


      </div>
    </div>
  );
};

export default Card;
