pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract PropertyNFT is ERC721, VRFConsumerBase {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(bytes32 => string) requestToName;
    mapping(bytes32 => address) requestToSender;

    struct Location {
        int256 latitude;
        int256 longitude;
    }
    enum AssetType {
        TITLE,
        OTHER
    }
    enum LeaseTerm{
        T_12M,
        T_24M,
        T_6M
    }
    struct Lease {
        string leaseeFirstName;
        string leaseeLastName;
        LeaseTerm leaseTerm;
        Date startDateTimestamp;
        Date endDateTimestamp;
    }
    struct Date {
        uint256 month;
        uint256 day;
        uint256 year;
    }
    struct Property {
        Location geoLocation;
        string landDescription;
        AssetType assetRecordType;
        Lease activeLease;
        Lease[] leases;
    }
    Property[] public properties;
}