import { privy } from "./instance";

let user;

try {
    user = await privy.user.get()
} catch (error) {
    user = false
}

function is_user_authenticated() {
    if (user) {
        return true
    } else {
        return false
    }
}

export { is_user_authenticated }