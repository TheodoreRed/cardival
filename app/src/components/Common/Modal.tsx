import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-5/6 pb-20 rounded-xl bg-slate-200 h-fit ">
        {children}
        <button
          className="absolute px-4 py-2 text-white duration-300 rounded-md hover:bg-red-600 bottom-3 left-3 bg-red-950"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
