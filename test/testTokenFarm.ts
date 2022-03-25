import { assert, expect } from 'chai';
import { ethers } from 'hardhat';
import { CGToken, DaiToken } from '../typechain';

describe('TokenFarm', async () => {
	let cgToken: CGToken;
	let mDaiToken: DaiToken;
	before(async () => {
		const cgTokenContract = await ethers.getContractFactory('CGToken');
		cgToken = await cgTokenContract.deploy();
		await cgToken.deployed();
		const mDaiTokenContract = await ethers.getContractFactory('DaiToken');
		mDaiToken = await mDaiTokenContract.deploy();
		await mDaiToken.deployed();
	});
	describe('TokenFarm', () => {
		it('Check if CG token contract has deployed', async () => {
			assert(cgToken.name, 'CG Token');
		});
		it('Check if Dai token contract has deployed', async () => {
			assert(mDaiToken.name, 'Mock Dai Token');
		});
	});
});
