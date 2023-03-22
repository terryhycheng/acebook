/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImageUploadPreview = ({ selectedImage }) => {
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  return (
    <div className="flex justify-center">
      {selectedImage && (
        <div className="relative h-64 w-64 overflow-hidden rounded-full">
          <img alt="preview" src={preview} />
        </div>
      )}
    </div>
  );
};

ImageUploadPreview.propTypes = {
  selectedImage: PropTypes.object,
};

ImageUploadPreview.defaultProps = {
  selectedImage: null,
};

export default ImageUploadPreview;
