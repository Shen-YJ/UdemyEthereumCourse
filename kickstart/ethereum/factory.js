import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xd0b10FB9581711f110Cc012953ecf23A2B2FD0aA'
);

export default instance;