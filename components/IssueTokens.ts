import { ethers } from 'hardhat';
import { tokenFarm as tokenFarmAddress } from '../contracts.json';
const issueToken = async () => {
	const tokenFarm = await ethers.getContractAt('TokenFarm', tokenFarmAddress);
	await tokenFarm.issueTokens();
};
