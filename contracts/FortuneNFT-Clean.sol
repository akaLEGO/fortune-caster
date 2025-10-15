// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FortuneNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Fortune metadata structure
    struct FortuneData {
        uint256 fortuneNumber;
        string title;
        string fortune;
        string poem;
        string careerMeaning;
        string relationshipsMeaning;
        string healthMeaning;
        string businessMeaning;
        string generalMeaning;
        uint256 timestamp;
    }
    
    // Mapping from token ID to fortune data
    mapping(uint256 => FortuneData) public fortunes;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Minting price (in wei)
    uint256 public mintPrice = 0.001 ether; // 0.001 ETH on Base
    
    // Maximum supply (optional)
    uint256 public maxSupply = 10000;
    
    // Events
    event FortuneMinted(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 fortuneNumber,
        string title
    );
    
    constructor() ERC721("Fortune Caster NFT", "FORTUNE") Ownable(msg.sender) {}
    
    // Mint a fortune NFT
    function mintFortune(
        uint256 _fortuneNumber,
        string memory _title,
        string memory _fortune,
        string memory _poem,
        string memory _careerMeaning,
        string memory _relationshipsMeaning,
        string memory _healthMeaning,
        string memory _businessMeaning,
        string memory _generalMeaning
    ) public payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIds.current() < maxSupply, "Max supply reached");
        require(_fortuneNumber >= 1 && _fortuneNumber <= 12, "Invalid fortune number");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        fortunes[newTokenId] = FortuneData({
            fortuneNumber: _fortuneNumber,
            title: _title,
            fortune: _fortune,
            poem: _poem,
            careerMeaning: _careerMeaning,
            relationshipsMeaning: _relationshipsMeaning,
            healthMeaning: _healthMeaning,
            businessMeaning: _businessMeaning,
            generalMeaning: _generalMeaning,
            timestamp: block.timestamp
        });
        
        _safeMint(msg.sender, newTokenId);
        
        emit FortuneMinted(newTokenId, msg.sender, _fortuneNumber, _title);
    }
    
    // Get fortune data for a token
    function getFortuneData(uint256 tokenId) public view returns (FortuneData memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return fortunes[tokenId];
    }
    
    // Set minting price (owner only)
    function setMintPrice(uint256 _newPrice) public onlyOwner {
        mintPrice = _newPrice;
    }
    
    // Set max supply (owner only)
    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        maxSupply = _newMaxSupply;
    }
    
    // Set base URI for metadata (owner only)
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    // Get current token ID counter
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    // Get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    // Withdraw contract balance (owner only)
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // Override _baseURI
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    // Override tokenURI to return JSON metadata
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        FortuneData memory fortune = fortunes[tokenId];
        
        // Create JSON metadata
        string memory json = string(abi.encodePacked(
            '{"name": "',
            fortune.title,
            '", "description": "',
            fortune.poem,
            '", "attributes": [',
            '{"trait_type": "Fortune Number", "value": ',
            _toString(fortune.fortuneNumber),
            '}, {"trait_type": "Fortune Level", "value": "',
            fortune.fortune,
            '"}, {"trait_type": "Mint Date", "value": ',
            _toString(fortune.timestamp),
            '}], "image": "',
            _baseTokenURI,
            'fortune-',
            _toString(fortune.fortuneNumber),
            '.png"}'
        ));
        
        return string(abi.encodePacked(
            "data:application/json;base64,",
            _base64Encode(bytes(json))
        ));
    }
    
    // Helper function to convert uint to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
    
    // Helper function for base64 encoding
    function _base64Encode(bytes memory data) internal pure returns (string memory) {
        if (data.length == 0) return "";
        
        string memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        
        string memory result = new string(4 * ((data.length + 2) / 3));
        
        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)
            
            for {
                let i := 0
            } lt(i, mload(data)) {
                i := add(i, 3)
            } {
                let input := and(mload(add(data, add(32, i))), 0xffffff)
                
                let out := mload(add(tablePtr, and(shr(250, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(244, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(238, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(232, input), 0x3F))), 0xFF))
                out := shl(224, out)
                
                mstore(resultPtr, out)
                
                resultPtr := add(resultPtr, 4)
            }
            
            switch mod(mload(data), 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }
        }
        
        return result;
    }
}
