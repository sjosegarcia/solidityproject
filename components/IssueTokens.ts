import { ethers } from 'hardhat';

const issueToken = async () => {
	const tokenFarmContract = ethers.getContractFactory('TokenFarm');
	const tokenFarm = (await tokenFarmContract).attach(
		'0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
	);
	await tokenFarm.issueTokens();
};
