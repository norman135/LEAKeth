//SPDX-License-Identifier: MIT
pragma solidity^0.8.12;

contract Leaks {
    string public leak;
    
    constructor () {
        leak = "||Welcome to LEAKS.eth|Here is where any individual can feel free to post information knowing it can never be taken down. Fully immutable when deployed. With great power comes great responsibility.";
    }

    function makeLeak(string memory madeLeak) public{
        leak = string.concat(leak, string.concat("||", madeLeak));
    }
}