async function main() {
    // We get the contract to deploy
    const Woken = await ethers.getContractFactory("Woken");
    const woken = await Woken.deploy();
  
    await woken.deployed();
  
    console.log("Woken deployed to:", woken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });