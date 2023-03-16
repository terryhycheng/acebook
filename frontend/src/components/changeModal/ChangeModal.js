import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../button/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalContext } from "../../contexts/ModalContext";

const ChangeModal = ({ isOpen, closeModal, type }) => {
  const [info, setInfo] = useState("");
  const { token, setToken, setUser } = useContext(AuthContext);
  const { pushModal } = useContext(ModalContext);

  const [isLoading, setIsLoading] = useState(null);

  const handleNameChange = (event) => {
    setInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [type]: info }),
    });

    const data = await response.json();

    console.log(data.user);

    if (response.ok) {
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      closeModal();
    } else {
      pushModal({
        message: data.message,
        type: "error",
      });
    }
    setInfo("");
    setIsLoading(false);
  };

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
                  Change your {type}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Change the {type} you want associated with your account.
                  </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <input
                      id={type}
                      type={type === "email" ? "email" : "text"}
                      required
                      value={info}
                      onChange={handleNameChange}
                      className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    />
                  </div>
                  <Button
                    text="Submit Change"
                    type="submit"
                    id="submit"
                    isDisabled={isLoading}
                  />
                </form>
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
  type: PropTypes.oneOf(["name", "email"]).isRequired,
};

export default ChangeModal;
