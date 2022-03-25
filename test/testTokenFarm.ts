import { assert, expect } from 'chai';
import { ethers } from 'hardhat';
import { CGToken, DaiToken, TokenFarm } from '../typechain';

describe('TokenFarm', async () => {
	let cgToken: CGToken;
	let mDaiToken: DaiToken;
	let tokenFarm: TokenFarm;

	before(async () => {
		const cgTokenContract = await ethers.getContractFactory('CGToken');
		cgToken = await cgTokenContract.deploy();
		await cgToken.deployed();
		const mDaiTokenContract = await ethers.getContractFactory('DaiToken');
		mDaiToken = await mDaiTokenContract.deploy();
		await mDaiToken.deployed();
		const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
		tokenFarm = await tokenFarmContract.deploy(
			cgToken.address,
			mDaiToken.address
		);
		await tokenFarm.deployed();
	});
	describe('TokenFarm', () => {
		it('Check if CG token contract has deployed', async () => {
			assert(cgToken.name, 'CG Token');
		});
		it('Check if Dai token contract has deployed', async () => {
			assert(mDaiToken.name, 'Mock Dai Token');
		});
		it('Check if TokenFarm contract has deployed', async () => {
			assert(tokenFarm.name, 'CG Token Farm');
		});
		it('Transfer money around and fund accounts', async () => {
			await cgToken.transfer(tokenFarm.address, '1000000000000000000');
			const tokenFarmBalance = await cgToken.balanceOf(tokenFarm.address);
			assert(tokenFarmBalance.gt(0));
			const accounts = await ethers.getSigners();
			await mDaiToken.transfer(accounts[0].address, '1000000000000000000');
			const eoaDaiBalance = await mDaiToken.balanceOf(accounts[0].address);
			assert(eoaDaiBalance.gt(0));
		});
	});
});
