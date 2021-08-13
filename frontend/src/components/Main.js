import React from "react";

import ShareImage from "./ShareImage";
import ListImages from "./ListImages";

const Main = ({
  captureFile,
  setDescription,
  uploadImage,
  images,
  tipImageOwner,
  web3,
}) => {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="content mr-auto ml-auto">
            <ShareImage
              uploadImage={uploadImage}
              captureFile={captureFile}
              setDescription={setDescription}
            />

            <br />
            <ListImages
              images={images}
              web3={web3}
              tipImageOwner={tipImageOwner}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
