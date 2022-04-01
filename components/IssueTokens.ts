import { ethers } from 'hardhat';
import { tokenFarm as tokenFarmAddress } from '../contracts.json';
const issueToken = async () => {
	const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
	const tokenFarm = tokenFarmContract.attach(tokenFarmAddress);
	await tokenFarm.issueTokens();
};
