import { Dialog } from '@headlessui/react';
import * as Icons from "@/app/data/svg/Icons";
import { useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  disableOutsideClose?: boolean;
  fullScreen?: boolean;
  isOpen: boolean;
  onClose: () => void;
  panelClassNames?: string;
  hideClose?: boolean;
};

function Modal({
  children,
  disableOutsideClose = false,
  fullScreen = false,
  isOpen,
  onClose,
  panelClassNames,
  hideClose,
}: ModalProps) {
  
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (disableOutsideClose) return;
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-50 overflow-y-auto"
    >
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          disableOutsideClose ? 'pointer-events-none' : ''
        }`}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 flex items-center justify-center"
      >
        <Dialog.Panel
          className={`bg-background-100 text-foreground-100 p-4 px-8 font-sans 
            ${fullScreen ? 'h-full w-full' : 'rounded-[16px] cardShadowBor borderColor'}
            relative ${panelClassNames} max-w-lg w-[450px] mx-auto h-[650px] max-h-[60%] overflow-auto`
          }
        >
          {children}
          {!hideClose ? (
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 text-gray-500 hover:text-primary2-100 focus:outline-none"
            >
              <Icons.xIcon />
            </button>
          ) : null}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal;
