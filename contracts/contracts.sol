// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ElectricityTrading {
    // The Market place stores the count of all the buyers, sellers who sent bids
    uint8 private buyerCount;
    uint8 private sellerCount;
    // The market place stores (with a hash) the bid (price and quantity, we also need the weights (or Beta) and other informations to be added), and the type of the agent (Buyer (1) or Seller (0))
    mapping (address => uint) private bidPrice;
    mapping (address => uint) private bidQuantity;
    mapping (address => uint) private bidWeight;
    mapping (address => uint) public agentType;
    // The market place is owned by the DSO Agent:
    address payable public dsoAgent;
    // We store all agent's addresses in a list
    address[] public agentsList;
    // We also need to add a time: Times are either absolute unix timestamps (seconds since 1970-01-01) or time periods in seconds.
    uint public marketEndTime; // not used yet

    // Log the event about a bid being made by an address (Agent) and its amount
    event LogBidMade(address indexed accountAddress, uint price, uint quantity, uint Weight); // Notice that weights are uint for now, as fixed point are not yet fully implemented (=> the DSO will divide by 10)

    // We need  a boolean to state the stage of the market place (open or not for receiving new offers/bids) Set to true at the end, disallows any change. By default initialized to false.
    bool ended;

    //  We create a modifier that could be used later to restrict some functions to only the operator. not needed for simple use
    modifier onlyOperator() {
        require(
            msg.sender == dsoAgent,
            "Only DSO/Operator can call this."
        );
        _;
    }

    // Constructor function to initialize the MarketPlace. It is "payable" so it can receive initial funding to cover up some mispayment
    constructor() public payable {
       // require(msg.value == 10 ether, "10 ether initial funding required");
        /* Set the owner to the creator of this contract */
        dsoAgent = payable(msg.sender);
        // initialization of variables
        buyerCount = 0;
        sellerCount = 0;
    }

    /// Creation of a bid from an agent return The type of the agent (1 or 0)
    function submitBid(uint _bidprice, uint _bidquantity, uint _bidweight, uint _agenttype) public returns (uint) {
        if (_agenttype == 1) {
            buyerCount++;
        } else {
            sellerCount++;
        }
        // We update all values of this agent
        bidPrice[msg.sender] = _bidprice;
        bidQuantity[msg.sender] = _bidquantity;
        bidWeight[msg.sender] = _bidweight;
        agentType[msg.sender] = _agenttype;

        return agentType[msg.sender];
    }

    // Function for buyers to place bids on available offers
    function placeBid(address _seller, uint _bidprice, uint _bidquantity) public returns (bool) {
        require(agentType[msg.sender] == 1, "Only buyers can place bids");
        require(bidPrice[_seller] != 0, "Seller does not have an active offer");
        require(bidPrice[_seller] == _bidprice && bidQuantity[_seller] >= _bidquantity, "Invalid bid price or quantity");

        // Perform the bid
        // You may want to implement further logic here, like deducting funds from buyer's wallet
        emit LogBidMade(msg.sender, _bidprice, _bidquantity, bidWeight[_seller]);

        return true;
    }

    // After negotiations, the DSO/operator wants to activate payment between agents, while specifying the amount
    function finalizeTransaction(address _buyer, address _seller, uint _amount) onlyOperator public {
        require(agentType[_buyer] == 1 && agentType[_seller] == 0, "Invalid buyer or seller address");
        require(bidPrice[_seller] != 0, "Seller does not have an active offer");
        require(_amount <= bidPrice[_seller] * bidQuantity[_seller], "Invalid transaction amount");

        // Perform the transaction
        // You may want to implement further logic here, like transferring funds from buyer to seller
    }

    // Function to retrieve bid details for a specific agent
    function retrieveBid(address agentaddress) onlyOperator public view returns(uint[4] memory) {
        uint[4] memory array;
        if (bidPrice[agentaddress] != 0) {
            array = [bidPrice[agentaddress], bidQuantity[agentaddress], bidWeight[agentaddress], agentType[agentaddress]];
        }
        return array;
    }
}