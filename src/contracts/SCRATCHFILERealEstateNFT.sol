pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./PropertyNFT.sol";

contract SCRATCHRealEstateNFT is PropertyNFT {
    struct Property {
        Location geoLocation;
        string landDescription;
        //        AssetType assetRecordType;
        //        Lease activeLease;
        string propertyAddress;
    }
    Property[] properties;
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
    //    function getPropertyFromId(uint256 id) public returns (Property memory) {
    //        return properties[id];
    //    }
    function requestToMintNewRealEstateToken(string memory name, uint256 userProvidedSeed) public returns (bytes32){
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
            //                activeLease: Lease({
            //                    leaseeFirstName:"Leaser FIrst name",
            //                    leaseeLastName:"Leaser Last name",
            //                    leaseTerm: LeaseTerm.T_12M,
            //                    startDateTimestamp: Date({month: 1, day: 20, year: 2021}),
            //                    endDateTimestamp:Date({month: 2, day: 1, year: 2022})
            //                }),
            //                leases: leases,
            geoLocation:Location({
                latitude: randomLatitude,
                longitude: randomLongitude
                }),
            //                assetRecordType: AssetType.TITLE,
            landDescription: "single family home. 3br, 4ba, 10,000 sqft",
            propertyAddress: "120 west 83rd Street, New York, NY"
            })
        );
        _safeMint(requestToSender[requestId], newId); // minting token with ERC721 safeMint
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}