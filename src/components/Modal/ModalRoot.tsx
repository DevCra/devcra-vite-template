import { useEffect, useRef } from "react";

const mutationObserverOption: MutationObserverInit = {
  childList: true,
  subtree: false,
};

const ModalRoot = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: MutationObserver;

    if (modalRef.current) {
      observer = new MutationObserver(() => {
        const size = modalRef.current?.childNodes.length || 0;
        document.body.classList.toggle("no-scroll", size > 0);
      });

      observer.observe(modalRef.current, mutationObserverOption);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div id="modalRoot" ref={modalRef} />;
};

export default ModalRoot;
