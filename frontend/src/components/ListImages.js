import React from "react";
import Identicon from "identicon.js";

const ListImages = ({ images, web3, tipImageOwner }) => {
  return images.map((image, key) => {
    return (
      <div className="card mb-4" key={key}>
        <div className="card-header">
          <img
            className="mr-2"
            width="30"
            height="30"
            src={`data:image/png;base64,${new Identicon(
              image.author,
              30
            ).toString()}`}
            alt={image.description}
          />
          <small className="text-muted">{image.author}</small>
        </div>
        <ul id="imageList" className="list-group list-group-flush">
          <li className="list-group-item">
            <p className="text-center">
              <img
                src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                style={{ maxWidth: "420px" }}
                alt={image.author}
              />
            </p>
            <p>{image.description}</p>
          </li>
          <li key={key} className="list-group-item py-2">
            <small className="float-left mt-1 text-muted">
              TIPS: {web3.utils.fromWei(image.tipAmount.toString())} ETH
            </small>
            <button
              className="btn btn-link btn-sm float-right pt-0"
              name={image.id}
              onClick={(event) => {
                let tipAmount = web3.utils.toWei("0.1", "Ether");
                tipImageOwner(event.target.name, tipAmount);
              }}
            >
              TIP 0.1 ETH
            </button>
          </li>
        </ul>
      </div>
    );
  });
};

export default ListImages;
