pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./PropertyNFT.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract RealEstateNFT is PropertyNFT {
    AggregatorV3Interface internal priceFeed;
    struct Property {
        string landDescription;
        string propertyAddress;
        string name;
//        string activeLease; // TODO add automatic updates for activeLease property
        int estimatedPropertyValue; // TODO integrate with api to automatically update estimated property value
        string schoolZoning; // TODO integrate with a school zoning api?
        string buildingPermits;
        string municipality;
//        string boundaries;
//        string floorplans;
//        string easements;
    }
    struct PropertyDetails {
        string schoolZoning; // TODO integrate with a school zoning api?
        string buildingPermits;
        string caveats;
        string municipality;
        string environmentTitle;
        string leasingAndMiningRights;
        string geographyAndTopology;
    }
    mapping(uint256 => string) public tokenIdToActiveLease;
    mapping(uint256 => PropertyDetails) public tokenIdToPropertyDetails;
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
        /**
         * Network: Rinkeby
         * Aggregator: ETH/USD
         * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
         */
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }
    function getThePrice() public view returns (int) {
        (
        uint80 roundID,
        int price,
        uint startedAt,
        uint timeStamp,
        uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
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
        int,
        string memory,
        string memory,
        string memory
    )
    {


        int priceInETH = ((properties[tokenId].estimatedPropertyValue * 100000000 )/ getThePrice()) ;
        return (
            properties[tokenId].name,
            properties[tokenId].landDescription,
            properties[tokenId].propertyAddress,
            priceInETH,
            properties[tokenId].schoolZoning,
            properties[tokenId].buildingPermits,
            properties[tokenId].municipality
        );
    }

    function updateTokenPropertyDetails(
        uint256 tokenId,
        string memory schoolZoning,
        string memory buildingPermits,
        string memory caveats,
        string memory municipality,
        string memory environmentTitle,
        string memory leasingAndMiningRights,
        string memory geographyAndTopology
    ) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), "ERC721: updateTokenPropertyDetails caller is not owner nor approved"
        );
        tokenIdToPropertyDetails[tokenId] = PropertyDetails({
            schoolZoning: schoolZoning,
            buildingPermits: buildingPermits,
            caveats: caveats,
            municipality: municipality,
            environmentTitle: environmentTitle,
            leasingAndMiningRights: leasingAndMiningRights,
            geographyAndTopology: geographyAndTopology
        });
    }
    function requestToMintNewRealEstateToken(
        string memory name,
        int estimatedPropertyValue,
        string memory description,
        string memory propertyAddress,
        string memory activeLease,
        string memory schoolZoning,
        string memory buildingPermits,
        string memory municipality
    ) public {
        uint256 newId = properties.length;
        tokenIdToActiveLease[newId] = activeLease;

        properties.push(
            Property({
                landDescription: description,
                propertyAddress: propertyAddress,
                estimatedPropertyValue: estimatedPropertyValue,
                name: name,
                schoolZoning: schoolZoning,
                municipality: municipality,
                buildingPermits: buildingPermits
            })
        );
        tokenIdToOwner[newId] = msg.sender;
        _safeMint(msg.sender, newId);
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