import { ethers } from 'hardhat';

const tokeknFarmDeployer = async () => {
	const cgTokenContract = await ethers.getContractFactory('CGToken');
	const daiTokenContract = await ethers.getContractFactory('DaiToken');
	const cgToken = await cgTokenContract.deploy();
	const daiToken = await daiTokenContract.deploy();
	await cgToken.deployed();
	await daiToken.deployed();
	const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
	const tokenFarm = await tokenFarmContract.deploy(
		cgToken.address,
		daiToken.address
	);

	await tokenFarm.deployed();

	console.log('Token Farm deployed to:', tokenFarm.address);
	await cgToken.transfer(tokenFarm.address, '1000000000000000000');
	const tokenFarmBalance = await cgToken.balanceOf(tokenFarm.address);
	console.log('TokenFarm balance of CG Token: ', tokenFarmBalance);
	const accounts = await ethers.getSigners();
	await daiToken.transfer(accounts[0].address, '1000000000000000000');
	const eoaDaiBalance = await daiToken.balanceOf(accounts[0].address);
	console.log('Dai balance of account', eoaDaiBalance);
};

tokeknFarmDeployer().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

export default tokeknFarmDeployer;
