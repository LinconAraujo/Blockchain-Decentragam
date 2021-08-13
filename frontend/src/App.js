import React, { useState, useEffect } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Loading from "./components/Loading";

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const App = ({ accounts, contracts: { decentragram }, web3 }) => {
  const [buffer, setBuffer] = useState();
  const [description, setDescription] = useState();
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reLoading, setReLoading] = useState(false);

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };

  const uploadImage = () => {
    ipfs.add(buffer, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }

      if (!description) {
        alert("please add a description");
        return;
      }

      setLoading(true);
      decentragram.methods
        .uploadImage(result[0].hash, description)
        .send({ from: accounts[0] })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
    });
  };

  const tipImageOwner = (id, tipAmount) => {
    setLoading(true);
    decentragram.methods
      .tipImageOwner(id)
      .send({ from: accounts[0], value: tipAmount })
      .on("transactionHash", () => {
        setReLoading(true);
      });
  };

  const sortImages = (a, b) => b.tipAmount - a.tipAmount;

  useEffect(() => {
    const init = async () => {
      const count = await decentragram.methods.imageCount().call();
      setImageCount(count.toNumber());
    };
    init();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      const imagesTmp = [];
      for (let i = 1; i <= imageCount; i++) {
        const image = await decentragram.methods.images(i).call();
        imagesTmp.push(image);
      }
      setImages(imagesTmp.sort(sortImages));

      setReLoading(false);
      setLoading(false);
    };

    getImages();
  }, [imageCount, reLoading]);

  return (
    <div>
      <Navbar account={accounts[0]} />
      {loading ? (
        <Loading />
      ) : (
        <Main
          captureFile={captureFile}
          setDescription={setDescription}
          uploadImage={uploadImage}
          images={images}
          tipImageOwner={tipImageOwner}
          web3={web3}
        />
      )}
    </div>
  );
};

export default App;
