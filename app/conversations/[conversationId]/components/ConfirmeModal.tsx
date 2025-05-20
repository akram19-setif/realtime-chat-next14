import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmeModal: React.FC<ConfirmeModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/conversations/${conversationId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        toast.success("Conversation deleted");
      }
      router.refresh();
      setIsLoading(false);
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [conversationId, router, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-center'>
        <div className='mx-auto flex h-12 w-12  justify-center items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
          <FiAlertTriangle className=' h-6 w-6 text-red-600' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'
          >
            Delete conversation
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-400'>
              Are you sure you want to delete this conversation?
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse '>
        <Button disabled={isLoading} danger onClick={handleDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmeModal;
