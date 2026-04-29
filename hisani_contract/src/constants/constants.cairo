use starknet::ContractAddress;

pub fn usdc_contract_address() -> ContractAddress {
    let address: felt252 = 0x0512feac6339ff7889822cb5aa2a86c848e9d392bb0e3e237c008674feed8343;
    address.try_into().unwrap()
}