pragma solidity ^0.8.10;
import "./CGToken.sol";
import "./DaiToken.sol";

contract TokenFarm {

    string public name = "CG Token Farm";
    CGToken public cgToken;
    DaiToken public daiToken;

    constructor(CGToken _cgToken, DaiToken _daiToken) {
        cgToken = _cgToken;
        daiToken = _daiToken;
    }
}