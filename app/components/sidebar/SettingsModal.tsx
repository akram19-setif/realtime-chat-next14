import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      axios
        .post("/api/settings", data)
        .then(() => {
          router.refresh();
          onClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='text-base font-semibold leading-7 text-gray-900'>
              Profile
            </div>
            <p className='mt-1 text-sm text-gray-600 leading-6'>
              Edit your public information
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                register={register}
                errors={errors}
                required
              />
              <div className=''>
                <label
                  htmlFor='image'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Profile picture
                </label>
              </div>
              <div className='mt-2 flex items-center gao-x-3'>
                <Image
                  src={image || currentUser?.image || "/placeholder.jpg"}
                  width={48}
                  height={48}
                  className=' rounded-full'
                  alt='Avatar'
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  uploadPreset='v9r1tp3k' // Your preset
                  onSuccess={handleUpload}
                  onError={(error: any, widget: any) => {
                    console.error(
                      "--- CldUploadButton onError CALLED (inline) ---"
                    );
                  }}
                >
                  <Button disabled={isLoading} secondary type='button'>
                    Change
                  </Button>
                </CldUploadButton>
              </div>
            </div>
          </div>

          <div className='mt-6 flex  items-center justify-end gap-x-6'>
            <Button
              disabled={isLoading}
              secondary
              type='button'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type='submit'>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
