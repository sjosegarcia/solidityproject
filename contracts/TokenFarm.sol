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

    constructor(CGToken _cgToken, DaiToken _daiToken) {
        cgToken = _cgToken;
        daiToken = _daiToken;
    }

    function stakeTokens(uint256 _amount) public {
        daiToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalanceOf[msg.sender] += _amount;
        if (!hasStaked[msg.sender]) stakers.push(msg.sender);
        hasStaked[msg.sender] = true;
        isStaked[msg.sender] = true;
    }
}