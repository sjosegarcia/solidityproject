import { ethers } from 'hardhat';
import { abi as tokenFarmAbi } from '../artifacts/contracts/TokenFarm.sol/TokenFarm.json';

const issueToken = async () => {
	const tokenFarm = new ethers.Contract(
		'0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
		tokenFarmAbi
	);
};
