import { useState } from "react";

const MediaPreview = () => {
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md mt-10">
        <input
          type="file"
          accept="image/*, video/*"
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="block bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg border-dashed border-4 border-gray-400 p-4"
        >
          {mediaPreview ? (
            <img
              src={mediaPreview}
              alt="Media Preview"
              className="max-w-full h-auto rounded-lg"
            />
          ) : (
            <span className="text-gray-600">Select Media</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default MediaPreview;
