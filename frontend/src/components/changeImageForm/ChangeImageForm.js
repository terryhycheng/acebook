import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Button from "../button/Button";
import useUpdate from "../../hooks/useUpdate";
import useUpload from "../../hooks/useUpload";
import ImageUploadPreview from "../imageUploadPreview/ImageUploadPreview";

const ChangeImageForm = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState();
  const upload = useUpload();

  const finished = () => {
    closeModal();
    setSelectedImage(null);
  };

  const { update, isLoading } = useUpdate(finished);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageId = await upload(selectedImage);

    await update({ imageId });
  };

  return (
    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon
              aria-hidden="true"
              className="mb-3 h-10 w-10 text-gray-400"
            />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            accept="image/*"
            onChange={onSelectFile}
            type="file"
            className="hidden"
          />
        </label>
      </div>

      <ImageUploadPreview selectedImage={selectedImage} />
      <Button
        text="Submit Change"
        type="submit"
        id="submit"
        isDisabled={isLoading}
      />
    </form>
  );
};

ChangeImageForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ChangeImageForm;
