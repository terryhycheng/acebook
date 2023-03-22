/* eslint-disable react/jsx-no-bind */
import React, { useContext, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../button/Button";
import ProfilePicture from "../profilePicture/ProfilePicture";
import ChangeModal from "../changeModal/ChangeModal";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(i) {
    setType(i);
    setIsOpen(true);
  }

  return (
    <>
      <div className="mt-6 flex w-full rounded-2xl border border-gray-100 bg-white p-6">
        <ProfilePicture className="mr-6 h-32 w-32" publicId={user.imageId} />

        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            {user.name}
            <button
              type="button"
              onClick={() => openModal("name")}
              className="ml-1"
            >
              <PencilIcon className="h-4 w-4 text-blue-500" />
            </button>
          </div>

          <div className="flex items-center">
            {user.email}
            <button
              type="button"
              onClick={() => openModal("email")}
              className="ml-1"
            >
              <PencilIcon className="h-4 w-4 text-blue-500" />
            </button>
          </div>

          <div>
            <Button
              id="changePhoto"
              text="Change Photo"
              className="mr-6 w-max"
              clickCallback={() => openModal("image")}
            />
            <Button
              id="changePassword"
              text="Change Password"
              className="w-max"
              clickCallback={() => openModal("password")}
            />
          </div>
        </div>
      </div>

      <ChangeModal isOpen={isOpen} closeModal={closeModal} type={type} />
    </>
  );
};

export default UserInfo;
