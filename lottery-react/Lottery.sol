pragma solidity ~0.4.25;

contract Lottery {
    address public manager;
    address[] public players;
    address winner;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable{
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256){
        return uint(keccak256(
            abi.encodePacked(
                msg.sender, now, players)));
    }
    
    
    function pickWinner() public restricted{
        winner = players[random()%players.length];
        winner.transfer(address(this).balance);
        players = new address[](0);
    }
    
    function checkBlance() public view returns(uint){
        return (address(this).balance/1000000000000000);
    }
    
    function getPlayers() public view returns (address[]){
        return players;
    }
}