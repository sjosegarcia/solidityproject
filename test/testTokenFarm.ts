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
				expect(tokenFarmBalance.toString() == '1000000000000000000');
			});
		});
		describe('Fund mDAI to EOA', async () => {
			it('Funding EOA with mDAI', async () => {
				await mDaiToken.transfer(testUser.address, '1000000000000000000');
				const mDaiBalance = await mDaiToken.balanceOf(testUser.address);
				expect(mDaiBalance.toString() == '1000000000000000000');
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
				expect(balance.toString() == '10000000000000');
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
			it('Unstaking Tokens from contract', async () => {
				await tokenFarm.unStakeTokens('10000000000000');
				const balance = await tokenFarm.stakingBalanceOf(testUser.address);
				expect(balance.eq(0));
			});
		});
		describe('Run partial Unstake', async () => {
			it('Approves mDAI token', async () => {
				const success = await mDaiToken.approve(
					tokenFarm.address,
					'10000000000000'
				);
				expect(success);
			});
			it('Stake Token to contract', async () => {
				await tokenFarm.stakeTokens('10000000000000');
				const balance = await tokenFarm.stakingBalanceOf(testUser.address);
				expect(balance.toString() == '10000000000000');
			});
			it('Approves TokenFarm mDAI', async () => {
				const success = await mDaiToken.approve(testUser.address, '100000000');
				expect(success);
			});
			it('Unstakes Partial from contract', async () => {
				await tokenFarm.unStakeTokens('100000000');
				const balance = await tokenFarm.stakingBalanceOf(testUser.address);
				expect(balance.toString() == '9999900000000');
			});
		});
		describe('Issue Staking Tokens', async () => {
			it('Approves CG token', async () => {
				const success = await cgToken.approve(
					tokenFarm.address,
					'10000000000000'
				);
				expect(success);
			});
			it('Issues Token rewards', async () => {
				await tokenFarm.issueTokens();
				const balance = await cgToken.balanceOf(testUser.address);
				expect(balance.toString() == '10000000000000');
			});
		});
	});
});
