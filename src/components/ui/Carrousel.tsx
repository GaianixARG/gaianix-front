import { ChevronLeft, ChevronRight } from "lucide-react";
import IconRounded from "./IconRounded";
import { useEffect, useState } from "react";

type Props<T> = {
  id: string;
  tipo: "slide" | "static";
  interval?: number;
  defaultIndex?: number;
  data: T[];
  component: React.ComponentType<T>;
};

const transitionActiveItem =
  "absolute w-full transition-transform duration-1200 ease-in-out transform translate-x-0";
const transitionInactiveItem =
  "absolute w-full transition-transform duration-1200 ease-in-out transform -translate-x-full";

const Carrousel = <T,>({
  id,
  tipo,
  interval = 5000,
  defaultIndex = 0,
  data,
  component: ComponentItem,
}: Props<T>) => {
  const [activeItem, setActiveItem] = useState(defaultIndex);

  const onNext = () => {
    setActiveItem((prev) => (prev + 1) % data.length);
  };
  const onPrev = () => {
    setActiveItem((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const slideTo = (index: number) => {
    setActiveItem(index);
  };

  useEffect(() => {
    const items = document.querySelectorAll(`[data-carousel-item]`);
    items.forEach((item, index) => {
      item.className = classNameItem(index);
      item.setAttribute(
        "data-carousel-item",
        index === activeItem ? "active" : ""
      );
    });
  }, [activeItem]);

  useEffect(() => {
    if (tipo == "slide") {
      const intervalId = setInterval(() => {
        onNext();
      }, interval);
      return () => clearInterval(intervalId);
    }
  }, [interval]);

  const classNameItem = (index: number) =>
    `${
      index === activeItem ? transitionActiveItem : transitionInactiveItem
    } flex items-center justify-center`;

  return (
    <div id={id} className="relative w-full" data-carousel={tipo}>
      <div className="relative h-48 sm:h-24 overflow-hidden rounded-lg md:h-48 pt-10">
        {data.map((item, index) => (
          <div
            key={index}
            className={classNameItem(index)}
            data-carousel-item={index === activeItem ? "active" : ""}
          >
            <ComponentItem key={`carousel-item-${index}`} {...item} />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {data.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeItem ? "bg-white" : "bg-gray-500"
            }`}
            aria-current={index === activeItem ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => slideTo(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
        data-carousel-prev
        onClick={onPrev}
      >
        <IconRounded
          icon={ChevronLeft}
          size="md"
          tipo="accent"
          className="group-hover:bg-white/50 group-focus:ring-1 group-focus:ring-white"
        />
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
        data-carousel-next
        onClick={onNext}
      >
        <IconRounded
          icon={ChevronRight}
          size="md"
          tipo="accent"
          className="group-hover:bg-white/50 group-focus:ring-1 group-focus:ring-white"
        />
      </button>
    </div>
  );
};

export default Carrousel;
