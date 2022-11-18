// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


async function deployAndInitContracts() {
   const dsCommunityToken = await hre.ethers.getContractFactory("DSCommunityToken");
  const dsCommTokenDeploy = await dsCommunityToken.deploy(
  );
  await dsCommTokenDeploy.deployed(); 
  const ds_comm_token_contract_address =  dsCommTokenDeploy.address;  

  const dsCommunityPlot = await hre.ethers.getContractFactory("DSCommunityPlot");
  const dsCommPlotDeploy = await dsCommunityPlot.deploy(
    "Dao Sense Community Plot",
    "dscp",
    "ipfs://QmTqhTyXHMeLxvgGgN6U5KqXmYqmjHwVTKzEt7ZoRj9s9T/",
    ds_comm_token_contract_address
  );
  await dsCommPlotDeploy.deployed();
  const ds_plot_contract_address =  dsCommPlotDeploy.address;



  console.log("Plot contract " + ds_plot_contract_address);
  console.log("Community token " + ds_comm_token_contract_address);
  return {
    'plot': ds_plot_contract_address,
    'token': ds_comm_token_contract_address,
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployAndInitContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
