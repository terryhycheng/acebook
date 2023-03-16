import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../button/Button";
import ProfilePicture from "../profilePicture/ProfilePicture";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex w-max rounded-2xl border p-4 shadow-sm">
      <ProfilePicture className="mr-4 h-32 w-32" publicId={user.imageId} />

      <div className="flex flex-col justify-between">
        <div>
          {user.name}
          <Button text="Edit" className="ml-4 w-max" />
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
  );
};

export default UserInfo;
