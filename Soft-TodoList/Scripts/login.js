function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.getElementById("login_username")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            Login();
        }
    });

document.getElementById("login_password")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            Login();
        }
    });

document.getElementById("login_captcha")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            Login();
        }
    });

function togglePassword() {
    const pass = document.getElementById("login_password").value;
    const type = pass.getAttribute('type');
    if (type === 'password')
        pass.setAttribute('type', 'text');
    else
        pass.setAttribute('type', 'password');
}

function GenCaptcha(text) {
    var tCtx = document.getElementById('textCaptcha').getContext('2d');
    tCtx.canvas.width = 40;
    tCtx.font = '16px serif';
    tCtx.fillText(text, 0, 14);
}

function Login() {
    let user = document.getElementById("login_username");
    let pass = document.getElementById("login_password");
    let capt = document.getElementById("login_captcha");
    let msg = document.getElementById("msglogin");
    if (user.value === '') {
        msg.innerHTML = 'Please enter your username !';
        user.focus();
    }
    else if (pass.value === '') {
        msg.innerHTML = 'Please enter your password!';
        pass.focus();
    }
    else if (capt.value === '') {
        msg.innerHTML = 'Please enter your captcha!';
        capt.focus();
    }
    else {
        msg.innerHTML = '<img src="/Images/loading_min.gif" />';
        $.ajax({
            type: "POST",
            url: "/Login/API_Login",
            data: { username: user.value, password: pass.value, captcha: capt.value },
            dataType: "json",
            success: function (res) {
                if (res.status === 1) {
                    const returnUrl = getParameterByName('ReturnUrl');
                    if (returnUrl === null)
                        returnUrl = '/';
                    location.href = returnUrl;
                } else {
                    capt.value = '';
                    GenCaptcha(res.captcha);
                    if (res.status === 2)
                        msg.innerHTML = 'Please enter your username, password, captchat !';
                    else if (res.status === 3)
                        msg.innerHTML = 'Captcha code incorrectly!';
                    else if (res.status === 4)
                        msg.innerHTML = 'Username or Password incorrectly!';
                }
            }
        });
    }
}