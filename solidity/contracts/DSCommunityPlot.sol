// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
import '@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol';
import './DSCommunityToken.sol';
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

contract DSCommunityPlot is
  ERC721,
  ERC721Enumerable,
  ERC721URIStorage,
  ERC721Burnable,
  AccessControl,
  VRFV2WrapperConsumerBase,
  ConfirmedOwner,
  AutomationCompatibleInterface
{
    using Counters for Counters.Counter;

    struct TokenClaim {
      uint last_claimed;
      uint unclaimed;
    }
    event MintUser(address indexed to, uint256 tokenId);
    event TokenIdIncremented(uint tokenId);

    mapping (uint => string[]) meta_mappings;
    uint[] pending_mint_id_meta;
    uint MIN_ALLOWED_AMOUNT = 1;
    uint MAX_ALLOWED_DAY = 50;
    uint DELTA_INCREMENT = 1;
    uint lastSnapshotIncrementDelta = 0;
    uint lastSnapshotIdCounter;
    // Address LINK - hardcoded for Goerli
    address linkAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;

    address dsCTAddress;
    DSCommunityToken _communityToken;
    
    uint256 lastBurntSnapshot;

    Counters.Counter private _tokenIdCounter;

    string private _baseTokenURI;

    mapping(uint => TokenClaim) token_claims;


    event PlotRollRequestSent(uint256 requestId);
    event PlotRollRequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        uint256 paid;
        bool fulfilled;
        uint256[] randomWords;
    }

    mapping(uint256 => RequestStatus) public s_requests; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    uint32 callbackGasLimit = 400000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    uint32 numWords = 2;

    // address WRAPPER - hardcoded for Goerli
    address wrapperAddress = 0x708701a1DfF4f478de54383E49a627eD4852C816;

  
    constructor(
      string memory name,
      string memory symbol,
      string memory baseTokenURI,
      DSCommunityToken communityToken
    ) 
    ConfirmedOwner(msg.sender)
    VRFV2WrapperConsumerBase(linkAddress, wrapperAddress)   
    ERC721(name, symbol) {
      _baseTokenURI = baseTokenURI;
      _communityToken = communityToken;
      _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }


    function setMetaMap(uint index, string[] memory hashes) public onlyOwner {
      meta_mappings[index] = hashes;
    }

    function mintUser(address to) public virtual {
      require(_isMintAllowed(to), "User does not satisfy allowlist criteria");
      require(!_isAlreadyMinted(to), "Max 1 mint allowed per user");
      uint tokenId = _tokenIdCounter.current();
      _safeMint(to, tokenId);
      pending_mint_id_meta.push(tokenId);
      _tokenIdCounter.increment();
      uint lastReqId = lastRequestId;
      bool lastRequestStatus = s_requests[lastReqId].fulfilled;
      if (lastRequestStatus == true) {
        this.requestPlotRoll(); 
      }     
      emit MintUser(to, tokenId);
    }

    function _isMintAllowed(address to)
      private
      view
      returns (bool)
    {
      return DSCommunityToken(linkAddress).balanceOf(to) > MIN_ALLOWED_AMOUNT;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
      super._beforeTokenTransfer(from, to, tokenId);
    }


    function _isAlreadyMinted(address to)
      internal returns (bool)
    {
      return false;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
      super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
    {
      return string(abi.encodePacked(_baseTokenURI, super.tokenURI(tokenId)));
    }

    function supportsInterface(bytes4 interfaceId)
      public
      view
      override(ERC721, ERC721Enumerable, AccessControl)
      returns (bool)
    {
      return super.supportsInterface(interfaceId);
    }

  function checkUpkeep(bytes calldata)
    external
    view
    override
    returns (bool upkeepNeeded, bytes memory performData)
  {
    uint currentDiff = _tokenIdCounter.current() - lastSnapshotIdCounter;

    upkeepNeeded = currentDiff > 0 ? true : false;
    performData = abi.encode(uint(currentDiff - lastSnapshotIncrementDelta));
    return (upkeepNeeded, performData);
  }

  /**
   * @notice Called by keeper to send funds to underfunded addresses
   * @param performData The abi encoded list of addresses to fund
   */
  function performUpkeep(bytes calldata performData) external override {
    uint performType = abi.decode(performData, (uint));
    uint tokenIdCurr = _tokenIdCounter.current();
    if (performType < 0) {
      MIN_ALLOWED_AMOUNT ++;
    } else {
      if (MIN_ALLOWED_AMOUNT > 0) {
        MIN_ALLOWED_AMOUNT --;
      }
    }
    if (performType > 50) {
      MAX_ALLOWED_DAY -= 10; 
    }
    lastSnapshotIncrementDelta =  lastSnapshotIdCounter - tokenIdCurr;
    lastSnapshotIdCounter = tokenIdCurr;

    uint256 currentBurnt = _communityToken.amountBurnt(); 
    uint256 burnDiff = currentBurnt - lastBurntSnapshot;
    uint256 newMintCeil = burnDiff * 5;
    uint lastTokenId = _tokenIdCounter.current();
    uint mintPerUser = newMintCeil % lastTokenId;
    for (uint i = 0; i < lastTokenId; i ++) {
      token_claims[i].unclaimed += mintPerUser;
    }
  }

  function requestPlotRoll() external onlyOwner returns (uint256 requestId) {
      requestId = requestRandomness(callbackGasLimit, requestConfirmations, numWords);
      s_requests[requestId] = RequestStatus({
          paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
          randomWords: new uint256[](0),
          fulfilled: false
      });
      requestIds.push(requestId);
      lastRequestId = requestId;
      emit PlotRollRequestSent(requestId);
      return requestId;
  }

  function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
    require(s_requests[_requestId].paid > 0, 'request not found');
    s_requests[_requestId].fulfilled = true;
    for (uint i = 0; i < pending_mint_id_meta.length; i++) {
      uint current_pending_mint_id = pending_mint_id_meta[i];
      uint256 d10Value = (_randomWords[0] % 10);
      // 70% chance of minting plain, 20% chance beach, 10% mountain
      uint256 d3Value;  
      if (d10Value < 7) {
        d3Value = 0;
      } else if (d10Value < 9) {
        d3Value = 1;
      } else {
        d3Value = 2;
      }
      uint256 d5Value = (_randomWords[1] % 5);
      string memory meta_value = meta_mappings[d3Value][d5Value];
      _setTokenURI(current_pending_mint_id, meta_value);
      delete pending_mint_id_meta[i];
      i --;
    }
    emit PlotRollRequestFulfilled(_requestId, _randomWords);
  }

  function getRequestStatus(uint256 _requestId)
    external
    view
    returns (
      uint256 paid,
      bool fulfilled,
      uint256[] memory randomWords
    )
  {
    require(s_requests[_requestId].paid > 0, 'request not found');
    RequestStatus memory request = s_requests[_requestId];
    return (request.paid, request.fulfilled, request.randomWords);
  }  
}
