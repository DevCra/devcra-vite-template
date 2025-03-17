import clsx from "clsx";
import {
  Children,
  type PropsWithChildren,
  type ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";

// Accordion 기본은 여러 개 열리는 모드
interface AccordionProps {
  isSingleOpen?: boolean;
  initialOpenIdx?: number;
  isValidateBeforeToggleOpen?: (idx: number) => boolean;
  children: ReactNode;
}

interface AccordionItemProps extends PropsWithChildren {
  idx: number;
  title: string;
  onToggle?: () => void;
  isOpen?: boolean;
  stylesOptions?: {
    headerContainer?: string;
    headerText?: string;
    headerTextOpen?: string;
    contentContainer?: string;
    contentContainerOpen?: string;
    arrowIcon?: string;
  };
}

function Accordion({
  isSingleOpen = false,
  initialOpenIdx,
  isValidateBeforeToggleOpen,
  children,
}: AccordionProps) {
  const [openItemIndices, setOpenItemIndices] = useState<number[]>([]);

  const handleToggle = useCallback(
    (idx: number) => {
      if (isValidateBeforeToggleOpen && !isValidateBeforeToggleOpen(idx)) {
        return;
      }

      setOpenItemIndices((prev) => {
        if (isSingleOpen) {
          return prev.includes(idx) ? [] : [idx];
        } else {
          return prev.includes(idx) ? prev.filter((itemIdx) => itemIdx !== idx) : [...prev, idx];
        }
      });
    },
    [isSingleOpen, isValidateBeforeToggleOpen],
  );

  useEffect(() => {
    if (initialOpenIdx !== undefined) {
      setOpenItemIndices([initialOpenIdx]);
    }
  }, [initialOpenIdx]);

  return (
    <ul>
      {Children.map(children, (child) => {
        if (isValidElement<AccordionItemProps>(child)) {
          return cloneElement(child, {
            isOpen: openItemIndices.includes(child.props.idx),
            onToggle: () => handleToggle(child.props.idx),
          });
        }
        return child;
      })}
    </ul>
  );
}

function AccordionItem({
  idx,
  title,
  onToggle,
  isOpen,
  children,
  stylesOptions,
}: AccordionItemProps) {
  return (
    <li className="list-none">
      <div
        className={clsx("flex cursor-pointer items-center gap-3", stylesOptions?.headerContainer)}
        onClick={onToggle}
      >
        {/* <Icon.ThickArrowDown
          className={clsx(
            stylesOptions?.arrowIcon,
            "transition-all duration-300",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          size={16}
        /> */}
        <span
          className={clsx(
            "text-sm font-semibold",
            !isOpen && stylesOptions?.headerText,
            isOpen && (stylesOptions?.headerTextOpen || stylesOptions?.headerText),
          )}
        >
          {title}
        </span>
      </div>
      <ul
        className={clsx(
          stylesOptions?.contentContainer,
          isOpen ? `block ${stylesOptions?.contentContainerOpen}` : "hidden",
        )}
      >
        {children}
      </ul>
    </li>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
