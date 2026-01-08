

const DivAboutUsImages = () => {
  const images = [
    {
      className:
        "absolute top-20 left-[378px] w-[250px] h-[188px] rounded-[18px]",
      src: "/src/assets/images/cr7.jpg",
      alt: "Fitness person in dark setting",
    },
    {
      className:
        "absolute top-0 left-0 w-[358px] h-[542px] rounded-[18px]",
      src: "/src/assets/images/image.png",
      alt: "Man with kettlebell in gym",
    },
    {
      className:
        "absolute top-72 left-[247px] w-[353px] h-[450px] rounded-[18px]",
      src: "/src/assets/images/image3.png",
      alt: "Man in blue shirt in gym",
    },
  ];

  return (
    <>
      {/* Images */}
      <div className="relative w-150 h-190">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${image.className}
              bg-cover bg-center
              animate-fade-up
              border border-orange-500
              overflow-hidden
              glow-orange-soft
            `}
            style={{ backgroundImage: `url(${image.src})` }}
            role="img"
            aria-label={image.alt}
          />
        ))}
      </div>

      <style>{`
        /* Animations */
        .animate-fade-up {
          animation: fade-up 1s ease forwards;
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Soft Orange Glow */
        .glow-orange-soft {
          box-shadow:
            0 0 4px rgba(249, 115, 22, 0.4),
            0 0 8px rgba(249, 115, 22, 0.25);
          animation: glow-pulse-soft 3s infinite ease-in-out;
        }

        @keyframes glow-pulse-soft {
          0%, 100% {
            box-shadow:
              0 0 4px rgba(249, 115, 22, 0.35),
              0 0 8px rgba(249, 115, 22, 0.2);
          }
          50% {
            box-shadow:
              0 0 6px rgba(249, 115, 22, 0.5),
              0 0 12px rgba(249, 115, 22, 0.3);
          }
        }
      `}</style>
    </>
  );
};

export default DivAboutUsImages;
