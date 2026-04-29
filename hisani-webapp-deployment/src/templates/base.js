const base_template = `
<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/pico.pumpkin.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <script type="module" crossorigin src="js-dist/bundle.js" defer></script>
    <script src="js/hyperscript.min.js"></script>

    <title>{{PageTitle}}</title>
</head>

<body class="container">
    <nav>
        <ul>
            <li>
               <a href="/">
                <b>HISANI</b>
               </a> (Sepolia)
            </li>
        </ul>
        <ul>
            <li>
                <a href="/">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9z"/></svg>
                        Projects
                    </button>
                </a>
            </li>

            <span style="opacity: 0%;">gap</span>

            <li>
                <a href="/dashboard">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M19 11a2 2 0 0 1 1.995 1.85L21 13v6a2 2 0 0 1-1.85 1.995L19 21h-4a2 2 0 0 1-1.995-1.85L13 19v-6a2 2 0 0 1 1.85-1.995L15 11zm0-8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" class="duoicon-secondary-layer" opacity="0.3"/><path fill="#000" fill-rule="evenodd" d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" class="duoicon-primary-layer"/><path fill="#000" fill-rule="evenodd" d="M9 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" class="duoicon-secondary-layer" opacity="0.3"/></svg>
                        Dashboard
                    </button>
                </a>
            </li>
        </ul>
    </nav>

    <center>
    <article id="auth-panel">
    <header>Account Details</header>
        <div id="login-panel">
            <fieldset role="group" id="email-form">
                <input type="email" name="email" placeholder="satoshi@gmail.com" id="privy-login-data">
                <button id="privy-login-btn" class="contrast">
                    Login
                </button>
            </fieldset>

            <fieldset role="group" id="otp-form" style="display:none">
                <input type="number" name="otp" placeholder="123456" id="verify-otp-data">
                <button id="verify-otp-btn" class="contrast">
                    Verify
                </button>
            </fieldset>

            <fieldset role="group" id="account-form" style="display:none">
                <input type="email" name="email" placeholder="satoshi@gmail.com" id="privy-account-data" value="" disabled>
                <button id="privy-logout-btn" class="contrast">
                    Logout
                </button>
            </fieldset>
        <div>
    </article>
    </center>

    <dialog id="notification-modal" closed>
        <article>
            <header>
                <p>
                    <strong id="notification-title">Notification</strong>
                </p>
            </header>

            <p id="notification-content">
                Notification Content
            </p>

            <footer>
                <button id="close-notification-modal">Close</button>
            </footer>
        </article>
    </dialog>

    <dialog id="downloading-data-modal" closed>
        <article>
            <header>
            </header>

            <p id="notification-content">
                Downloading data from Starknet ...
                <progress></progress>
            </p>
        </article>
    </dialog>

    {{> BasePartial }}

</body>

</html>
`
export { base_template }