// SPDX-License-Identifier: MIT LICENSE
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract DSCommunityToken is ERC20, ERC20Burnable, Ownable {

  mapping(address => bool) controllers;
  uint256 public amountBurnt;
   
  constructor() ERC20("DSCommunityRewards", "DSCT") { }

  function mint(address to, uint256 amount) external {
    require(controllers[msg.sender], "Only controllers can mint");
    _mint(to, amount);
  }

  function burnFrom(address account, uint256 amount) public override {
    if (controllers[msg.sender]) {
      _burn(account, amount);
    }
    else {
      super.burnFrom(account, amount);
    }
    amountBurnt += amount;
  }

  function addController(address controller) external onlyOwner {
    controllers[controller] = true;
  }

  function removeController(address controller) external onlyOwner {
    controllers[controller] = false;
  }
}