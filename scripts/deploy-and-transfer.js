const { ethers, utils } = require("hardhat");
const { hardhatArguments } = require("hardhat");

async function main() {
    // We get the contract to deploy
    const Woken = await ethers.getContractFactory("Woken");
    const woken = await Woken.deploy();

    // Deploy
    await woken.deployed();
    console.log("Woken deployed to:", woken.address);

    // Move some tokens around between non-deployer wallets
    const maxAmount = await woken._maxTxAmount()
    const [owner, user1, user2 ] = await ethers.getSigners();

    await woken.transfer(user1.address, (maxAmount.mul(10)))
    console.log(`sent ${maxAmount.mul(10)} tokens from deployer to user1.address`)
    await woken.transfer(user2.address, (maxAmount.mul(10)))
    console.log(`sent ${maxAmount.mul(10)} tokens from deployer to user2.address`)
    await woken.connect(user1.address).transfer(user2.address, maxAmount)
    console.log(`\n sent ${maxAmount} tokens from user1.address to user2.address`)
    await woken.connect(user2.address).transfer(user1.address, maxAmount)
    console.log(`sent ${maxAmount} tokens from user2.address to user1.address`)
    await woken.connect(user1.address).transfer(user2.address, maxAmount)
    console.log(`\n sent ${maxAmount} tokens from user1.address to user2.address`)
    await woken.connect(user2.address).transfer(user1.address, maxAmount)
    console.log(`sent ${maxAmount} tokens from user2.address to user1.address`)
    await woken.connect(user1.address).transfer(user2.address, maxAmount)
    console.log(`\n sent ${maxAmount} tokens from user1.address to user2.address`)
    await woken.connect(user2.address).transfer(user1.address, maxAmount)
    console.log(`sent ${maxAmount} tokens from user2.address to user1.address`)

    // Log balance of G$ tokens owned by contract
    //const GoodDollar = await ethers.getContractFactory("IERC20");
    //const goodDollar = await MyContract.attach(
    //  "0x67C5870b4A41D4Ebef24d2456547A03F1f3e094B"
    //);
    //const goodDollarSupply = await goodDollar.totalSupply()

    //console.log(goodDollarSupply)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });