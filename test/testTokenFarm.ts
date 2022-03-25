import { assert, expect } from 'chai';
import { ethers } from 'hardhat';

describe('TokenFarm Contract', async () => {
	it('Starts the Token Farm Contract Test', async () => {
		const cgTokenContract = await ethers.getContractFactory('CGToken');
		const mDaiTokenContract = await ethers.getContractFactory('DaiToken');
		const tokenFarmContract = await ethers.getContractFactory('TokenFarm');
		const cgToken = await cgTokenContract.deploy();
		const mDaiToken = await mDaiTokenContract.deploy();
		const tokenFarm = await tokenFarmContract.deploy(
			cgToken.address,
			mDaiToken.address
		);
		const accounts = await ethers.getSigners();
		const testUser = accounts[0];
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
				await mDaiToken.transfer(testUser.address, '1000000000000000000');
				const mDaiBalance = await mDaiToken.balanceOf(testUser.address);
				expect(mDaiBalance.gt(0));
			});
		});
		describe('Stake Token', async () => {
			it('Approves mDAI token', async () => {
				const success = await mDaiToken.approve(
					tokenFarm.address,
					'10000000000000'
				);
				expect(success);
			});
			it('Staking Token into contract', async () => {
				await tokenFarm.stakeTokens('10000000000000');
				const balance = await tokenFarm.stakingBalanceOf(testUser.address);
				expect(balance.gt(0));
			});
			it('Check if user is staked.', async () => {
				const isStaked = await tokenFarm.isStaked(testUser.address);
				expect(isStaked);
			});
			it('Check if user has staked', async () => {
				const hasStaked = await tokenFarm.hasStaked(testUser.address);
				expect(hasStaked);
			});
		});
		describe('Unstake Token', async () => {
			it('Approves TokenFarm mDAI', async () => {
				const success = await mDaiToken.approve(
					testUser.address,
					'10000000000000'
				);
				expect(success);
			});
		});
	});
});
