// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Decentragram {
  string public name = 'Decentragram';

  // Store Images
  uint public imageCount = 0;
  
  mapping(uint => Image) public images;

  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address author;
  }

  event ImageCreated (
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address author
  );

  event ImageTipped (
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address author
  );

  // Create Images
  function uploadImage(
    string memory _imgHash,
    string memory _description
  ) validateArgs(_imgHash, _description) external {

    // Increment image id
    imageCount++;

    // Add image to contract
    images[imageCount] = Image(
      imageCount, 
      _imgHash, 
      _description, 
      0, 
      msg.sender
    );

    // Trigger an event
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  }

  // Tip Images
  function tipImageOwner(uint _id) external payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= imageCount);

    // Fetch the image
    Image memory _image = images[_id];
    
    // Fetch the author
    address _author = _image.author;
    
    // Pay the author by sending them Ether
    payable(_author).transfer(msg.value);
    
    // Increment the tip amount
    _image.tipAmount = _image.tipAmount + msg.value;
    
    // Update the image
    images[_id] = _image;

    // Trigger an event
    emit ImageCreated(_image.id, _image.hash, _image.description, _image.tipAmount, _author);
  }

  // Modifier
  modifier validateArgs(
    string memory _imgHash,
    string memory _description
  ) {
    // Make sure the image hash exists
    require(bytes(_imgHash).length > 0);
    // Make sure the description exists
    require(bytes(_description).length > 0);
    // Make sure uploader address exists
    require(msg.sender != address(0x0));
    _;
  }
}