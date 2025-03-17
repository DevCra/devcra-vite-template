import { type TouchEvent, useCallback, useEffect, useMemo, useState } from "react";

import type { ImageType } from "@/types/image";

type Direction = "left" | "right";
export type CarouselOptions = {
  perSlides: number;
  isInfinityMode: boolean; // loop mode
  isAutoplay: boolean;
  autoplayDelay: number; // milliseconds
  autoPlayDirection: Direction;
  isTouchSwipeMode: boolean;
  touchSwipeThreshold: number; // px
};

const DEFAULT_CAROUSEL_OPTIONS: CarouselOptions = {
  perSlides: 1,
  isInfinityMode: false,
  isAutoplay: false,
  autoplayDelay: 3_000,
  autoPlayDirection: "right",
  isTouchSwipeMode: false,
  touchSwipeThreshold: 50,
};
const INITIAL_TOUCH_POSITION = {
  start: 0,
  end: 0,
};

interface Props {
  images: ImageType[];
  options?: Partial<CarouselOptions>;
}

// TODO: useCarousel 비교해서 공통화 필요
const useInfiniteCarousel = ({ images, options }: Props) => {
  const carouselOptions = useMemo(() => ({ ...DEFAULT_CAROUSEL_OPTIONS, ...options }), [options]);

  const clonedSlideCounts = carouselOptions.perSlides + 1;
  const clonedImages = useMemo(
    () => [...images.slice(-clonedSlideCounts), ...images, ...images.slice(0, clonedSlideCounts)],
    [images, clonedSlideCounts],
  );

  const initialIndex = carouselOptions.isInfinityMode ? clonedSlideCounts : 0;
  const carouselImages = carouselOptions.isInfinityMode ? clonedImages : images;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setTransitioning] = useState(false);
  const [touchPosition, setTouchPosition] = useState(INITIAL_TOUCH_POSITION);

  const move = useCallback(
    (direction: Direction) => () => {
      const preventCase =
        (!carouselOptions.isInfinityMode && currentIndex <= 0 && direction === "left") ||
        (!carouselOptions.isInfinityMode &&
          currentIndex >= carouselImages.length - 1 &&
          direction === "right");

      if (isTransitioning || preventCase) {
        return;
      }

      setCurrentIndex((prev) => (direction === "right" ? prev + 1 : prev - 1));
      setTransitioning(true);
    },
    [isTransitioning, currentIndex, carouselImages, carouselOptions],
  );

  const handleTransitionEnd = useCallback(() => {
    if (!carouselOptions.isInfinityMode) {
      setTransitioning(false);
      return;
    }

    if (currentIndex === carouselImages.length - clonedSlideCounts) {
      setCurrentIndex(clonedSlideCounts);
    } else if (currentIndex === clonedSlideCounts - 1) {
      setCurrentIndex(carouselImages.length - clonedSlideCounts - 1);
    }
    setTransitioning(false);
  }, [currentIndex, carouselImages, clonedSlideCounts, carouselOptions]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touchStartX = e.targetTouches[0].clientX;
    setTouchPosition({ start: touchStartX, end: touchStartX });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touchEndX = e.targetTouches[0].clientX;
    setTouchPosition((prev) => ({ ...prev, end: touchEndX }));
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!carouselOptions.isTouchSwipeMode) {
      return;
    }

    const { start, end } = touchPosition;

    if (start === 0 && end === 0) {
      return;
    }

    const distance = end - start;

    if (distance > carouselOptions.touchSwipeThreshold) {
      move("left")();
    } else if (distance < -carouselOptions.touchSwipeThreshold) {
      move("right")();
    }

    setTouchPosition(INITIAL_TOUCH_POSITION);
  }, [touchPosition, move, carouselOptions]);

  useEffect(() => {
    if (!carouselOptions.isAutoplay) {
      return;
    }

    const intervalId = window.setInterval(() => {
      move(carouselOptions.autoPlayDirection)();
    }, carouselOptions.autoplayDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, [carouselOptions, move]);

  return {
    carouselImages,
    currentIndex,
    isTransitioning,
    handleTransitionEnd,
    move,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useInfiniteCarousel;
