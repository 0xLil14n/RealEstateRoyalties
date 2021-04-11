pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./PropertyNFT.sol";

contract RealEstateNFT is PropertyNFT {
    struct Property {
        string landDescription;
        string propertyAddress;
        string propertyName;
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
        string memory,
        string memory,
        address
    )
    {
        return (
            properties[tokenId].propertyName,
            properties[tokenId].landDescription,
            properties[tokenId].propertyAddress,
            tokenIdToOwner[tokenId]
        );
    }

    function requestToMintNewRealEstateToken(string memory name, uint256 userProvidedSeed) public {
        uint256 newId = properties.length;
        properties.push(
            Property({
                landDescription: "single family home. 3br, 4ba, 10,000 sqft",
                propertyAddress: "120 west 83rd Street, New York, NY",
                propertyName: name
            })
        );
        tokenIdToOwner[newId] = msg.sender;
        _safeMint(msg.sender, newId); // minting token with ERC721 safeMint
//        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        // leaving here in case we want to use randomness, but currently not doing anything
        uint256 randomLatitude = (randomNumber % 100000);
        uint256 randomLongitude = (randomNumber % 10000);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}