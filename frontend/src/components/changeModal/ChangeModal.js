import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import ChangeNameForm from "../changeNameForm/ChangeNameForm";
import ChangeEmailForm from "../changeEmailForm/ChangeEmailForm";
import ChangeImageForm from "../changeImageForm/ChangeImageForm";
import ChangePasswordForm from "../changePasswordForm/ChangePasswordForm";

const ChangeModal = ({ isOpen, closeModal, type }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Update your {type}
                </Dialog.Title>
                <Dialog.Description>
                  Change the {type} you want associated with your account.
                </Dialog.Description>
                {
                  {
                    name: <ChangeNameForm closeModal={closeModal} />,
                    email: <ChangeEmailForm closeModal={closeModal} />,
                    image: <ChangeImageForm closeModal={closeModal} />,
                    password: <ChangePasswordForm closeModal={closeModal} />,
                  }[type]
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ChangeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["name", "email", "image", "password"]).isRequired,
};

export default ChangeModal;
