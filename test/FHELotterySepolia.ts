import { expect } from "chai";
import { ethers } from "hardhat";

describe("FHELottery Sepolia", function () {
  it("Should deploy on Sepolia testnet", async function () {
    const FHELottery = await ethers.getContractFactory("FHELottery");
    const lottery = await FHELottery.deploy();
    await lottery.waitForDeployment();
    
    const address = await lottery.getAddress();
    expect(address).to.be.properAddress;
  });
});
