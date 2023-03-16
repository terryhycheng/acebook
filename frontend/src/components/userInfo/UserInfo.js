import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../button/Button";
import ProfilePicture from "../profilePicture/ProfilePicture";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
      <ProfilePicture className="h-32 w-32" publicId={user.imageId} />

      <div>
        <div>
          {user.name}
          <Button text="Edit Name" className="w-max" />
        </div>

        <div>
          {user.email}
          <Button text="Edit Email" className="w-max" />
        </div>

        <div>
          <Button text="Change Photo" className="w-max" />
          <Button text="Change Password" className="w-max" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
