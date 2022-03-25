import { ethers } from 'hardhat';

const tokeknFarmDeployer = async () => {
	const cgTokenContract = await ethers.getContractFactory('CGToken');
	const mDaiTokenContract = await ethers.getContractFactory('DaiToken');
	const cgToken = await cgTokenContract.deploy();
	const mDaiToken = await mDaiTokenContract.deploy();
	await cgToken.deployed();
	await mDaiToken.deployed();
	const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
	const tokenFarm = await tokenFarmContract.deploy(
		cgToken.address,
		mDaiToken.address
	);

	await tokenFarm.deployed();

	console.log('Token Farm deployed to:', tokenFarm.address);
	await cgToken.transfer(tokenFarm.address, '1000000000000000000');
	const tokenFarmBalance = await cgToken.balanceOf(tokenFarm.address);
	console.log('TokenFarm balance of CG Token: ', tokenFarmBalance);
	const accounts = await ethers.getSigners();
	await mDaiToken.transfer(accounts[0].address, '1000000000000000000');
	const eoaDaiBalance = await mDaiToken.balanceOf(accounts[0].address);
	console.log('Dai balance of account', eoaDaiBalance);
};

tokeknFarmDeployer().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

export default tokeknFarmDeployer;
