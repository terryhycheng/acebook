import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button/Button";
import useUpdate from "../../hooks/useUpdate";

const ChangePasswordForm = ({ closeModal }) => {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");

  const finished = () => {
    closeModal();
    setError("");
    setPassword("");
    setPasswordTwo("");
  };

  const { update, isLoading } = useUpdate(finished);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordTwoChange = (event) => {
    setPasswordTwo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkPassword = (passwordInput) => {
      return passwordInput.length >= 6 && /[A-Z]/.test(passwordInput);
    };

    //  check password strength: at 6 chars, at least 1 cap
    if (!checkPassword(password)) {
      setError(
        "Password must have at least 6 characters and 1 capital letter."
      );
      setPassword("");
      setPasswordTwo("");

      return;
    }

    // check confirmedPassword == password
    if (password !== passwordTwo) {
      setError("Passwords do not match");
      setPassword("");
      setPasswordTwo("");

      return;
    }

    await update({ password });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          placeholder="Password"
          id="password"
          type="password"
          required
          value={password}
          onChange={handlePasswordChange}
          className="relative block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
        <input
          placeholder="Retype Password"
          id="password2"
          type="password"
          required
          value={passwordTwo}
          onChange={handlePasswordTwoChange}
          className="relative block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <Button
        text="Submit Change"
        type="submit"
        id="submit"
        isDisabled={isLoading}
      />
    </form>
  );
};

ChangePasswordForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
