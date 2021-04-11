pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./PropertyNFT.sol";

contract RealEstateNFT is PropertyNFT {
    struct Property {
        string landDescription;
        string propertyAddress;
    }

    Property[] public properties;

    bytes32 internal keyHash;
    address public vrfCoordinator;
    uint256 internal fee;
    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyHash)
    ERC721("RealEstateNFT", "RET")
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    public {
        keyHash = _keyHash;
        vrfCoordinator = _VRFCoordinator;
        fee = 1.5*10**18; // 1.5 LINK
    }
    function getNumberOfProperties() public view returns (uint256) {
        return properties.length;
    }
    function getPropertyMetadata(uint256 tokenId)
    public
    view
    returns (
        string memory,
        string memory
    )
    {
        return (
            properties[tokenId].landDescription,
            properties[tokenId].propertyAddress
        );
    }

    function requestToMintNewRealEstateToken(string memory name, uint256 userProvidedSeed) public returns (bytes32){
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - please feed contract $LINK"
        );
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed); // request a random number
        requestToName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        // for now this is random, but it probably shouldn't be in the future lmao
        uint256 newId = properties.length;
        uint256 randomLatitude = (randomNumber % 100000);
        uint256 randomLongitude = (randomNumber % 10000);

        properties.push(
            Property({
                landDescription: "single family home. 3br, 4ba, 10,000 sqft",
                propertyAddress: "120 west 83rd Street, New York, NY"
            })
        );
        _safeMint(requestToSender[requestId], newId); // minting token with ERC721 safeMint
    }
    function getNfTitlesForOwner(address owner) public returns(uint256[]){
        return [0];
    }
    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}