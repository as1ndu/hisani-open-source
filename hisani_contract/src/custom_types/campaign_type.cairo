use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
pub struct Campaign {
    pub title: ByteArray,
    pub category: felt252,
    pub description: ByteArray,
    pub funding_goal: u256,
    pub amount_collected: u256,
    pub status: felt252,
    pub beneficiary: ContractAddress,
    pub website: ByteArray,
    pub count: u64,
    pub approved: felt252
}

// - title
// - number
// - category
// - description
// - usdc funding goal
// - amount collected
// - status (ongoing, ended, claimed)
// - beneficiary