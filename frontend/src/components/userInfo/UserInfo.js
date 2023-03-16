import React, { useContext, Fragment, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../button/Button";
import ProfilePicture from "../profilePicture/ProfilePicture";
import ChangeModal from "../changeModal/ChangeModal";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex w-max rounded-2xl border p-4 shadow-sm">
        <ProfilePicture className="mr-4 h-32 w-32" publicId={user.imageId} />

        <div className="flex flex-col justify-between">
          <div>
            {user.name}
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Edit
            </button>
          </div>

          <div>
            {user.email}
            <Button text="Edit" className="ml-4 w-max" />
          </div>

          <div>
            <Button text="Change Photo" className="mr-4 w-max" />
            <Button text="Change Password" className="w-max" />
          </div>
        </div>
      </div>

      <ChangeModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default UserInfo;
