import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import useUpdate from "../../hooks/useUpdate";

const ChangeNameForm = ({ closeModal }) => {
  const [name, setName] = useState("");

  const finished = () => {
    closeModal();
    setName("");
  };

  const { update, isLoading } = useUpdate(finished);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await update({ name });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          id="name"
          type="text"
          required
          value={name}
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
  );
};

ChangeNameForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ChangeNameForm;
