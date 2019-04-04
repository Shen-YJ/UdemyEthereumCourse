pragma solidity ~0.4.21;

contract Inbox {
    string public message;
    function Inbox(string initialMessage, int initialN) public {
        message = initialMessage;
        testN = initialN;
    }

    function setMessage(string newMessage) public payable{
        // require(msg.value >= 10000000000000000);
        message = newMessage;
    }
    
    function checkMessage() public view returns(string) {
        return message;

    }

}