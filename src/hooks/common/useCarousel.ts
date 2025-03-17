import {
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  type TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Direction = "left" | "right";
export type CarouselOptions = {
  isAutoplay: boolean;
  autoplayDelay: number; // milliseconds
  autoPlayDirection: Direction;
  isTouchSwipeMode: boolean;
  isMouseSwipeMode: boolean;
  touchSwipeThreshold: number; // px
};

const DEFAULT_CAROUSEL_OPTIONS: CarouselOptions = {
  isAutoplay: false,
  autoplayDelay: 3_000,
  autoPlayDirection: "right",
  isTouchSwipeMode: false,
  isMouseSwipeMode: false,
  touchSwipeThreshold: 50,
};

const INITIAL_POSITION = {
  start: 0,
  end: 0,
  isSwiping: false,
};

interface Props {
  images: Array<{
    src: string;
    alt: string;
  }>;
  options?: Partial<CarouselOptions>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

// TODO: useInfiniteCarousel하고 비교해서 공통화 필요
const useCarousel = ({ images, options, currentIndex, setCurrentIndex }: Props) => {
  const carouselOptions = useMemo(() => ({ ...DEFAULT_CAROUSEL_OPTIONS, ...options }), [options]);

  const [isTransitioning, setTransitioning] = useState(false);
  const [position, setPosition] = useState(INITIAL_POSITION);

  const move = useCallback(
    (direction: Direction) => () => {
      const preventCase =
        (currentIndex <= 0 && direction === "left") ||
        (currentIndex >= images.length - 1 && direction === "right");

      if (isTransitioning || preventCase) {
        return;
      }

      setCurrentIndex((prev) => (direction === "right" ? prev + 1 : prev - 1));
      setTransitioning(true);
    },
    [isTransitioning, currentIndex, images.length, setCurrentIndex],
  );

  const handleTransitionEnd = useCallback(() => {
    setTransitioning(false);
  }, []);

  const handleSwipeStart = useCallback(
    (startPosition: number) => {
      if (!carouselOptions.isTouchSwipeMode || !carouselOptions.isMouseSwipeMode) {
        return;
      }

      setPosition({
        start: startPosition,
        end: startPosition,
        isSwiping: true,
      });
    },
    [carouselOptions],
  );

  const handleSwipeMove = useCallback(
    (endPosition: number) => {
      if (!carouselOptions.isTouchSwipeMode || !carouselOptions.isMouseSwipeMode) {
        return;
      }

      if (!position.isSwiping) {
        return;
      }

      setPosition((prev) => ({ ...prev, end: endPosition }));
    },
    [position, carouselOptions],
  );

  const handleSwipeEnd = useCallback(() => {
    if (!carouselOptions.isTouchSwipeMode || !carouselOptions.isMouseSwipeMode) {
      return;
    }

    if (!position.isSwiping) {
      return;
    }

    const { start, end } = position;
    const distance = end - start;

    if (distance > carouselOptions.touchSwipeThreshold) {
      move("left")();
    } else if (distance < -carouselOptions.touchSwipeThreshold) {
      move("right")();
    }

    setPosition(INITIAL_POSITION);
  }, [position, move, carouselOptions]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touchStartX = e.targetTouches[0].clientX;
      handleSwipeStart(touchStartX);
    },
    [handleSwipeStart],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touchEndX = e.targetTouches[0].clientX;
      handleSwipeMove(touchEndX);
    },
    [handleSwipeMove],
  );

  const handleTouchEnd = useCallback(() => {
    handleSwipeEnd();
  }, [handleSwipeEnd]);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const mouseStartX = e.clientX;
      handleSwipeStart(mouseStartX);
    },
    [handleSwipeStart],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const mouseEndX = e.clientX;
      handleSwipeMove(mouseEndX);
    },
    [handleSwipeMove],
  );

  const handleMouseUp = useCallback(() => {
    handleSwipeEnd();
  }, [handleSwipeEnd]);

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
    currentIndex,
    setCurrentIndex,
    isTransitioning,
    handleTransitionEnd,
    move,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useCarousel;
