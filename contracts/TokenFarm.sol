pragma solidity ^0.8.10;
import "./CGToken.sol";
import "./DaiToken.sol";

contract TokenFarm {

    string public name = "CG Token Farm";
    CGToken public cgToken;
    DaiToken public daiToken;
    mapping(address => uint256) public stakingBalanceOf;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;
    address[] public stakers;
    address public owner;

    constructor(CGToken _cgToken, DaiToken _daiToken) {
        owner = this;
        cgToken = _cgToken;
        daiToken = _daiToken;
    }

    modifier onlyOwner {
        require(owner == msg.sender, "You are not the owner");
    }

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Amount is not valid");
        stakingBalanceOf[msg.sender] += _amount;
        if (!hasStaked[msg.sender]) stakers.push(msg.sender);
        hasStaked[msg.sender] = true;
        isStaked[msg.sender] = true;
        daiToken.transferFrom(msg.sender, address(this), _amount);
    }

    function unStakeTokens(uint256 _amount) public {
        require(isStaked[msg.sender], "User not staked");
        require(_amount > 0, "Amount is not valid");
        uint256 balance = stakingBalanceOf[msg.sender];
        require(balance - _amount > 0, "You do not have enough staked");
        stakingBalanceOf[msg.sender] -= _amount;
        isStaked[msg.sender] = false;
        daiToken.transfer(msg.sender, _amount);
    }

    function issueTokens() public onlyOwner {
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalanceOf[msg.sender];
            if (balance > 0) cgToken.transfer(recipient, balance);
        }
    }
}