import React from "react";

const ShareImage = ({ uploadImage, captureFile, setDescription }) => {
  return (
    <>
      <p>&nbsp;</p>
      <h2>Share Image</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          uploadImage();
        }}
      >
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .bpm, .gif"
          onChange={captureFile}
        />

        <div className="form-group mr-sm-2">
          <br />
          <input
            id="imageDescription"
            type="text"
            className="form-control"
            placeholder="Image description..."
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">
          Upload!
        </button>
      </form>
    </>
  );
};

export default ShareImage;
