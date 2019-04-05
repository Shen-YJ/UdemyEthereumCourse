pragma solidity ~0.4.21;

contract Inbox {
    string public message;
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public payable{
        // require(msg.value >= 10000000000000000);
        message = newMessage;
    }
    
    function checkMessage() public view returns(string) {
        return message;

    }

}