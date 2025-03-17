import { type MouseEvent, type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  hideOnClickOutside = false,
  children,
  isOpen,
  hide,
  isEscKeyClickOutside = false,
}: {
  hideOnClickOutside?: boolean;
  children: ReactNode;
  isOpen: boolean;
  hide: () => void;
  isEscKeyClickOutside?: boolean;
}) => {
  const [container, setContainer] = useState<Element | null>(null);

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const portalContainer = document.querySelector("#modalRoot");
    setContainer(portalContainer);
  }, []);

  useEffect(() => {
    if (!isEscKeyClickOutside || !isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEscKeyClickOutside, isOpen, hide]);

  if (!isOpen || !container) {
    return null;
  }

  return createPortal(
    <div
      className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/90"
      onClick={hideOnClickOutside ? hide : undefined}
    >
      <div className="flex h-full w-full flex-col" onClick={stopPropagation}>
        {children}
      </div>
    </div>,
    container,
  );
};

const ModalHeader = ({
  title,
  children,
  hide,
}: {
  title?: string;
  children?: ReactNode;
  hide?: () => void;
}) => {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <p>{title}</p>
      {children}
      <button type="button" onClick={hide}>
        {/* <Icon.Close className="text-white" size={24} /> */}
      </button>
    </header>
  );
};

const ModalContent = ({ children }: { children?: ReactNode }) => {
  return <main className="flex-1">{children}</main>;
};

const ModalFooter = ({ children }: { children?: ReactNode }) => {
  return <footer>{children}</footer>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

/* Compound Component */

export default Modal;
