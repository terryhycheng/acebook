import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import useUpdate from "../../hooks/useUpdate";

const ChangeEmailForm = ({ closeModal }) => {
  const [email, setEmail] = useState("");

  const finished = () => {
    closeModal();
    setEmail("");
  };

  const { update, isLoading } = useUpdate(finished);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await update({ email });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
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
  );
};

ChangeEmailForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ChangeEmailForm;
