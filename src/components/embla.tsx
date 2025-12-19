import React, { useEffect, useRef, useState, useCallback } from 'react';

interface EmblaAPI {
  scrollTo: (index: number, jump?: boolean) => void;
  selectedScrollSnap: () => number;
  on: (event: string, callback: () => void) => void;
  destroy: () => void;
}

interface NumberCarouselProps {
  title: string;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
  unit?: string;
  onChange?: (value: number) => void;
}

const NumberCarousel: React.FC<NumberCarouselProps> = ({
  title,
  min,
  max,
  step = 1,
  defaultValue,
  unit = '',
  onChange
}) => {
  const emblaRef = useRef<HTMLDivElement>(null);
  const [emblaApi, setEmblaApi] = useState<EmblaAPI | null>(null);
  
  // Generate numbers based on min, max, and step
  const numbers: number[] = [];
  for (let i = min; i <= max; i += step) {
    numbers.push(Number(i.toFixed(2))); // Handle decimal steps
  }
  
  // Find default index
  const defaultIndex = numbers.findIndex(num => num === defaultValue);
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex >= 0 ? defaultIndex : Math.floor(numbers.length / 2));

  // Update selectedIndex when defaultValue changes
  useEffect(() => {
    const newIndex = numbers.findIndex(num => num === defaultValue);
    if (newIndex >= 0 && newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
      if (emblaApi) {
        emblaApi.scrollTo(newIndex, true);
      }
    }
  }, [defaultValue, numbers]);

  useEffect(() => {
    if (!emblaRef.current) return;

    const createEmbla = (emblaRoot: HTMLDivElement, startIndex: number = 0): EmblaAPI => {
      const container = emblaRoot.querySelector('.embla__container') as HTMLDivElement;
      if (!container) return {} as EmblaAPI;
      
      const slides = Array.from(container.children) as HTMLElement[];
      if (slides.length === 0) return {} as EmblaAPI;
      
      let selectedScrollSnap = startIndex;
      let isDragging = false;
      let startX = 0;
      let currentX = 0;
      let translateX = 0;
      let targetTranslateX = 0;
      let selectCallback: (() => void) | null = null;
      let animationFrameId: number | null = null;
      
      // ✅ Always use LTR for carousel (numbers should scroll left to right)
      const slideWidth = 80;
      const centerOffset = emblaRoot.offsetWidth / 2 - slideWidth / 2;

      const updateSlidePositions = () => {
        translateX += (targetTranslateX - translateX) * 0.1;
        container.style.transform = `translate3d(${translateX}px, 0, 0)`;
        animationFrameId = requestAnimationFrame(updateSlidePositions);
      };

      const scrollTo = (index: number, jump: boolean = false) => {
        selectedScrollSnap = Math.max(0, Math.min(index, slides.length - 1));
        targetTranslateX = centerOffset - (selectedScrollSnap * slideWidth);
        if (jump) {
          translateX = targetTranslateX;
          container.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }
        if (selectCallback) selectCallback();
      };

      const onPointerDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        startX = e.type.includes('mouse') ? (e as MouseEvent).pageX : (e as TouchEvent).touches[0].pageX;
        currentX = translateX;
        container.style.cursor = 'grabbing';
      };

      const onPointerMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const x = e.type.includes('mouse') ? (e as MouseEvent).pageX : (e as TouchEvent).touches[0].pageX;
        const diff = x - startX;
        targetTranslateX = currentX + diff;
      };

      const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        container.style.cursor = 'grab';
        
        const offset = centerOffset - translateX;
        const newIndex = Math.round(offset / slideWidth);
        scrollTo(newIndex);
      };

      emblaRoot.addEventListener('mousedown', onPointerDown as EventListener);
      emblaRoot.addEventListener('mousemove', onPointerMove as EventListener);
      emblaRoot.addEventListener('mouseup', onPointerUp);
      emblaRoot.addEventListener('mouseleave', onPointerUp);
      emblaRoot.addEventListener('touchstart', onPointerDown as EventListener, { passive: true });
      emblaRoot.addEventListener('touchmove', onPointerMove as EventListener, { passive: true });
      emblaRoot.addEventListener('touchend', onPointerUp);

      updateSlidePositions();
      scrollTo(selectedScrollSnap, true);

      return {
        scrollTo,
        selectedScrollSnap: () => selectedScrollSnap,
        on: (event: string, callback: () => void) => {
          if (event === 'select') {
            selectCallback = callback;
          }
        },
        destroy: () => {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
          emblaRoot.removeEventListener('mousedown', onPointerDown as EventListener);
          emblaRoot.removeEventListener('mousemove', onPointerMove as EventListener);
          emblaRoot.removeEventListener('mouseup', onPointerUp);
          emblaRoot.removeEventListener('mouseleave', onPointerUp);
          emblaRoot.removeEventListener('touchstart', onPointerDown as EventListener);
          emblaRoot.removeEventListener('touchmove', onPointerMove as EventListener);
          emblaRoot.removeEventListener('touchend', onPointerUp);
        }
      };
    };

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!emblaRef.current) return;
      
      const api = createEmbla(emblaRef.current, selectedIndex);
      api.on('select', () => {
        const newIndex = api.selectedScrollSnap();
        setSelectedIndex(newIndex);
        if (onChange) {
          onChange(numbers[newIndex]);
        }
      });
      setEmblaApi(api);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (emblaApi && emblaApi.destroy) {
        emblaApi.destroy();
      }
    };
  }, [defaultValue, numbers.length, onChange]);

  const scrollToNumber = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  const getNumberStyles = (index: number) => {
    const distance = Math.abs(index - selectedIndex);
    const isSelected = index === selectedIndex;
    
    let opacity = 1;
    let scale = 1;
    let fontSize = '3rem';
    
    if (distance === 0) {
      opacity = 1;
      scale = 1.4;
      fontSize = '2rem';
    } else if (distance === 1) {
      opacity = 0.8;
      scale = 1.2;
      fontSize = '1rem';
    } else if (distance === 2) {
      opacity = 0.6;
      scale = 1.0;
      fontSize = '1rem';
    } else {
      opacity = 0.4;
      scale = 0.9;
      fontSize = '1rem';
    }
    
    return {
      opacity,
      transform: `scale(${scale})`,
      fontSize,
      color: isSelected ? '#FF4100' : '#ffffff',
      fontWeight: isSelected ? 'bold' : 'normal',
      textShadow: isSelected ? 'none' : '0 0 4px rgba(0,0,0,0.5)',
    };
  };

  return (
    <div className="w-full" dir="ltr">
      <div className="text-center mb-8">
        <h2 className="text-orange-500 text-xl font-medium mb-6">{title}</h2>
      </div>
      
      <div 
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing w-full"
        style={{ 
          position: 'relative', 
          height: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          minHeight: '200px',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <div 
          className="embla__container flex items-center"
          style={{ 
            touchAction: 'pan-y',
            willChange: 'transform',
            height: '100%'
          }}
        >
          {numbers.map((number, index) => (
            <div
              key={`${number}-${index}`}
              className="shrink-0 flex items-center justify-center transition-all duration-300"
              style={{ 
                width: '80px', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <span
                className="font-bold transition-all duration-300 select-none cursor-pointer whitespace-nowrap"
                style={getNumberStyles(index)}
                onClick={() => scrollToNumber(index)}
              >
                {number}{unit}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      
    </div>
  );
};

export default NumberCarousel;