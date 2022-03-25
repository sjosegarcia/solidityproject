import { assert, expect } from 'chai';
import { ethers } from 'hardhat';
import { CGToken, DaiToken, TokenFarm } from '../typechain';

describe('TokenFarm Contract', async () => {
	let cgToken: CGToken;
	let mDaiToken: DaiToken;
	let tokenFarm: TokenFarm;
	const accounts = await ethers.getSigners();

	before(async () => {
		const cgTokenContract = await ethers.getContractFactory('CGToken');
		cgToken = await cgTokenContract.deploy();
		const mDaiTokenContract = await ethers.getContractFactory('DaiToken');
		mDaiToken = await mDaiTokenContract.deploy();
		await mDaiToken.deployed();
		const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
		tokenFarm = await tokenFarmContract.deploy(
			cgToken.address,
			mDaiToken.address
		);
	});
	describe('CG Token Deployment', async () => {
		it('Deploy CG Token', async () => {
			await cgToken.deployed();
			assert(cgToken.name, 'CG Token');
		});
	});
	describe('mDai Token Deployment', async () => {
		it('Deploy mDai Token', async () => {
			await mDaiToken.deployed();
			assert(mDaiToken.name, 'Mock Dai Token');
		});
	});
	describe('TokenFarm Deployment', () => {
		it('Check if TokenFarm contract has deployed', async () => {
			await tokenFarm.deployed();
			assert(tokenFarm.name, 'CG Token Farm');
		});
	});
	describe('TokenFarm Transfer', async () => {
		it('Funding TokenFarm Contract', async () => {
			await cgToken.transfer(tokenFarm.address, '1000000000000000000');
			const tokenFarmBalance = await cgToken.balanceOf(tokenFarm.address);
			expect(tokenFarmBalance.gt(0));
		});
	});
	describe('Fund mDAI to EOA', async () => {
		it('Funding EOA with mDAI', async () => {
			await mDaiToken.transfer(accounts[0].address, '1000000000000000000');
			const mDaiBalance = await mDaiToken.balanceOf(accounts[0].address);
			expect(mDaiBalance.gt(0));
		});
	});
});
