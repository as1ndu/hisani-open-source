import Privy, {LocalStorage} from '@privy-io/js-sdk-core';
import { privy_app_id, privy_client_id } from '../constants';

// Replace 'your-app-id' with your actual Privy App ID
const privy = new Privy({
  appId: privy_app_id, 
  clientId: privy_client_id,
  storage: new LocalStorage()
});

export { privy }