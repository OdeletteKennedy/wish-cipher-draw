import { expect } from "chai";
import { ethers } from "hardhat";
import { FHEVM } from "@fhevm/hardhat";

describe("FHELottery", function () {
  let fhevm: FHEVM;
  
  before(async function () {
    fhevm = await FHEVM.init();
  });

  it("Should create a lottery", async function () {
    const FHELottery = await ethers.getContractFactory("FHELottery");
    const lottery = await FHELottery.deploy();
    await lottery.waitForDeployment();
    
    const tx = await lottery.createLottery("Test Lottery", 10);
    const receipt = await tx.wait();
    expect(receipt).to.not.be.null;
  });
});
