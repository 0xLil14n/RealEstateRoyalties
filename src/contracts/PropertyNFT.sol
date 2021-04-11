pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract PropertyNFT is ERC721, VRFConsumerBase, Ownable {

    mapping(bytes32 => string) requestToName;
    mapping(bytes32 => address) requestToSender;

    struct Location {
        uint256 latitude;
        uint256 longitude;// TODO make these signed integers
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

}