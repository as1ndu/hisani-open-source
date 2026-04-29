mod custom_types;
mod constants;

use custom_types::campaign_type::Campaign;
use openzeppelin_interfaces::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};

#[starknet::interface]
pub trait IHisani<TContractState> {
    /// Write Operations
    fn write_campaign(ref self: TContractState, campaign: Campaign);
    fn fund_campaign(ref  self: TContractState, campaigns_counter: u64, deposit_amount: u256);
    fn end_campaign(ref   self: TContractState, campaigns_counter: u64);
    fn claim_funds(ref    self: TContractState, campaigns_counter: u64);
    // edit campaign

    /// Read Operations
    fn read_campaign(self: @TContractState, campaigns_counter: u64) -> Campaign;
    fn read_campaign_counter(self: @TContractState) -> u64;
    fn list_all_campaigns(self: @TContractState) -> Array<Campaign>;
}

/// Simple contract for managing balance.
#[starknet::contract]
mod Hisani {

use crate::constants::constants::usdc_contract_address;
use crate::IERC20DispatcherTrait;
use crate::IERC20Dispatcher;

use starknet::get_contract_address;
use starknet::get_caller_address;
use starknet::ContractAddress;
use starknet::storage::StoragePathEntry;
use crate::custom_types::campaign_type::Campaign;
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, Map};

    #[storage]
    struct Storage {
        campaigns_counter: u64,
        campaigns: Map<u64, Campaign>,

        // contract_admin: ContractAddress
    }

    #[abi(embed_v0)]
    impl HisaniImpl of super::IHisani<ContractState> {

        fn write_campaign(ref self: ContractState, mut campaign: Campaign) {
            let current_counter: u64 = self.campaigns_counter.read();
            let account_owner: ContractAddress   = get_caller_address();

            campaign.beneficiary = account_owner;
            campaign.count       = current_counter + 1;
            self.campaigns.entry(current_counter + 1).write(campaign);

            // update counter 
            self.campaigns_counter.write(current_counter + 1)
        }

        fn fund_campaign(ref self: ContractState, campaigns_counter: u64, deposit_amount: u256) {
           let mut campaign: Campaign = self.campaigns.entry(campaigns_counter).read();

           let account_owner: ContractAddress   = get_caller_address();
           let hisani_contract_address: ContractAddress = get_contract_address();

            // User must have called erc20.approve(this_contract, amount) via front end
           let usdc_token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: usdc_contract_address(),
            };

            // deposit usdc if campaign 'status' is ongoing
            if (campaign.status == 'ongoing') {
                usdc_token.transfer_from(account_owner, hisani_contract_address, deposit_amount);

                // increase campaign balance
                let current_balance: u256 = campaign.amount_collected;
                campaign.amount_collected = current_balance + deposit_amount;

                self.campaigns.entry(campaigns_counter).write(campaign);
            }
        }

        fn end_campaign(ref self: ContractState, campaigns_counter: u64) {
           let mut campaign: Campaign = self.campaigns.entry(campaigns_counter).read();
           let caller_address: ContractAddress   = get_caller_address();

           // end campaign caller if equal to beneficiary or admin
           if (campaign.beneficiary == caller_address) {
               campaign.status = 'ended';
               self.campaigns.entry(campaigns_counter).write(campaign);            
            }
        }

        fn claim_funds(ref self: ContractState,  campaigns_counter: u64) {
           let mut campaign: Campaign = self.campaigns.entry(campaigns_counter).read();
           let caller_address: ContractAddress   = get_caller_address();

           let usdc_token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: usdc_contract_address(),
            };

           // transfer to wallet of caller if equal to beneficiary
           if (campaign.beneficiary == caller_address) {

                let already_claimed: bool = campaign.status == 'claimed';

                if (already_claimed) {
                    // balance already claimed
                } else {
                    usdc_token.transfer(caller_address, campaign.amount_collected);

                    campaign.status = 'claimed';
                    self.campaigns.entry(campaigns_counter).write(campaign)
                }

               
           }
         
        }


        fn read_campaign(self: @ContractState, campaigns_counter: u64) -> Campaign {
            let campaign: Campaign = self.campaigns.entry(campaigns_counter).read();
            campaign
        }

        fn read_campaign_counter(self: @ContractState) -> u64 {
            self.campaigns_counter.read()
        }

        fn list_all_campaigns(self: @ContractState) -> Array<Campaign> {
           let current_counter: u64 = self.campaigns_counter.read();
           let mut campaign_list: Array<Campaign> = ArrayTrait::new();
           let mut index: u64 = 0;

           while index <= current_counter {
            let campaign_at_index: Campaign = self.campaigns.entry(index).read();

            campaign_list.append(campaign_at_index);
            index = index + 1
           } 

           campaign_list
        }
    }
}
