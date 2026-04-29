import { show_notification } from "../ui/onload";
import { is_user_authenticated } from "./auth";
import { privy } from "./instance";

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function privy_login() {
    const loginButton = document.querySelector('#privy-login-btn');
    const loginEmail = document.querySelector('#privy-login-data');

    loginButton.addEventListener('click', async () => {
        try {
            const login = await privy.auth.email.sendCode(loginEmail.value);


            if (login.success) {
                // hide email-form
                const emailForm = document.querySelector('#email-form');
                emailForm.style.display = 'none';

                // hide opt-form
                const otpForm = document.querySelector('#otp-form');
                otpForm.style.display = 'flex';

                //location.reload()
            }


        } catch (error) {
            console.error('Login failed:', error);
        }
    });
}

async function verify_otp() {
    const loginEmail = document.querySelector('#privy-login-data');
    const otpButton = document.querySelector('#verify-otp-btn');
    const otpValue = document.querySelector('#verify-otp-data');

    otpButton.addEventListener('click', async () => {
        try {

            console.log('email val', loginEmail.value)
            console.log('otp value', otpValue.value)

            const sessionObject = await privy.auth.email.loginWithCode(loginEmail.value, otpValue.value);
            console.log('session.user', sessionObject.user)
            console.log('await privy.user.get()', await privy.user.get())

            const userObject = await privy.user.get();
            const userEmail = userObject.user.linked_accounts[0]['address']

            console.log('userEmail', userEmail)

            if (is_user_authenticated()) {

                show_notification({
                    title: 'Sucessfully Logged In!',
                    content: 'You can now fund & create campaigns'
                })

            }

            // add email to dashboard
            await show_linked_account()

        } catch (error) {
            console.error('Login failed:', error);

            const err = `${error}`.match(/\baddEventListener\b/g)

            if (!(err == 'addEventListener')) {
                show_notification({
                    title: 'Login failed',
                    content: 'Make sure OTP code is correct, Try Again'
                })
            }

            await delay(3000)
            location.reload()
        }
    })

}

async function privy_logout() {
    try {
        const logoutButton = document.querySelector('#privy-logout-btn');

        logoutButton.addEventListener('click', async () => {
            try {
                await privy.auth.logout()

                // hide account panel
                const logoutPanel = document.querySelector('#account-form');
                logoutPanel.style.display = 'none';

                // show login form
                const loginPanel = document.querySelector('#email-form');
                loginPanel.style.display = 'flex';

                show_notification({
                    title: 'Sucessfully Logged Out!',
                    content: 'You can now close this tab'
                })

            } catch (error) {
                console.log('privy_logout', error)
            }
        })
    } catch (error) {
        console.log('privy_logout', error)
    }

}

async function show_linked_account() {
    try {
        const accountData = document.querySelector('#privy-account-data');

        const userObject = await privy.user.get();
        const userEmail = userObject.user.linked_accounts[0]['address']

        // console.log('userObject.user.linked_accounts.length', userObject.user.linked_accounts.length )

        console.log('userObject', userObject.user.id)

        if (userObject.user.linked_accounts.length >= 0) {
            // const html_code = `
            // <fieldset role="group" id="account-form">
            //     <input type="email" name="email" placeholder="satoshi@gmail.com" id="privy-account-data" value="${userEmail}" disabled>
            //     <button id="privy-logout-btn">
            //         Logout
            //     </button>
            // </fieldset>
            // `
            //loginPanel.innerHTML = html_code

            const logoutPanel = document.querySelector('#account-form');
            logoutPanel.style.display = 'flex';
            accountData.value = userEmail

            // hide email panel
            const emailPanel = document.querySelector('#email-form');
            emailPanel.style.display = 'none';

            // hide verify panel
            const otpForm = document.querySelector('#otp-form');
            otpForm.style.display = 'none';

        }
    } catch (error) {
        console.log('show_linked_account', error)
    }
}

export { privy_login, verify_otp, show_linked_account, privy_logout }