import { ethers } from 'hardhat';

const tokeknFarmDeployer = async () => {
	const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
	const tokeFarm = await tokenFarmContract.deploy();

	await tokeFarm.deployed();

	console.log('Token Farm deployed to:', tokeFarm.address);
};

tokeknFarmDeployer().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

export default tokeknFarmDeployer;
