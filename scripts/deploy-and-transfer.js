const { ethers, utils } = require("hardhat");
const { hardhatArguments } = require("hardhat");

async function main() {
    // We get the contract to deploy
    const Woken = await ethers.getContractFactory("Woken");
    const woken = await Woken.deploy();

    const [owner, user1, user2 ] = await ethers.getSigners();
 
    // Deploy
    await woken.deployed();
    console.log("\nWoken deployed to:", woken.address);

    // Enable trading
    await woken.enableTrading()
    console.log(`\nTrading enabled by ${owner.address}`)

    // Add liquidity
    // get uniswap router
    const routerAddress = '0xE3F85aAd0c8DD7337427B9dF5d0fB741d65EEEB5';
    const router = await hre.ethers.getContractAt('IUniswapV2Router02', routerAddress);

    // approve router address to spent tokens from owner's wallet
    const tokensToAdd = ethers.BigNumber.from("10000000000000000000000000");
    const baseCurToAdd = ethers.utils.parseEther("5.0")
    await woken.connect(owner).approve(routerAddress, tokensToAdd);

    // const tokenBalanceBefore = await moonSafe.balanceOf(owner.address);
    const lpAddTx = await router.connect(owner).addLiquidityETH(
      woken.address,
      tokensToAdd,
      0, // slippage is unavoidable
      baseCurToAdd,
      owner.address,
      (Date.now() + 100000),
      {value : baseCurToAdd}
    );

    console.log(`\nLiquidity added`)

    // Enable swap&liquify
    await woken.setSwapAndLiquifyEnabled(true);
    console.log(`\nswap&liquify enabled`);

    // Move some tokens around to trigger swap&liquify
    const tokensToMoveFromOwner = ethers.BigNumber.from("10000000000000000000000000");
    const tokensToMoveFromUser = ethers.BigNumber.from("900000000000000000000000");

    await woken.transfer(user1.address, tokensToMoveFromOwner)
    console.log(`\nsent ${tokensToMoveFromOwner} tokens from ${owner.address} to ${user1.address}`)
    await woken.transfer(user2.address, tokensToMoveFromOwner)
    console.log(`sent ${tokensToMoveFromOwner} tokens from ${owner.address} to ${user2.address}`)

    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)
    
    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)

    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)

    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)

    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)

    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)

    await woken.connect(user1).transfer(user2.address, tokensToMoveFromUser)
    console.log(`\nsent ${tokensToMoveFromUser} tokens from ${user1.address} to ${user2.address}`)
    await woken.connect(user2).transfer(user1.address, tokensToMoveFromUser)
    console.log(`sent ${tokensToMoveFromUser} tokens from ${user2.address} to ${user1.address}`)

    const wokenTokenContractBalance = await woken.balanceOf(woken.address);

    console.log(`\nWoken tokens held in Woken contract: ${wokenTokenContractBalance}`);
    // Log balance of G$ tokens owned by contract
    const goodDollar = await ethers.getContractAt("IERC20", "0x495d133B938596C9984d462F007B676bDc57eCEC");

    const goodDollarBalance = await goodDollar.balanceOf(woken.address)

    console.log(`\nG$ balance of woken contract is: ${goodDollarBalance}`)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

