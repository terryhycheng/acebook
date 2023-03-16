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
      <div className="flex w-max rounded-2xl border p-4 shadow-sm">
        <ProfilePicture className="mr-4 h-32 w-32" publicId={user.imageId} />

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
              className="mr-4 w-max"
            />
            <Button
              id="changePassword"
              text="Change Password"
              className="w-max"
            />
          </div>
        </div>
      </div>

      <ChangeModal isOpen={isOpen} closeModal={closeModal} type={type} />
    </>
  );
};

export default UserInfo;
