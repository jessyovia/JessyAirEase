let form_operation = 'login'

document.querySelector(".signup-login").addEventListener("click", e => {
    if (e.target !== document.querySelector(".signup-login")) return

    close_login()
})

function open_login() {
    document.querySelector(".signup-login").classList.add("active")
}

function close_login() {
    document.querySelector(".signup-login").classList.remove("active")
}

function toggle_signup_login(e) {
    if (form_operation === 'signup') form_operation = 'login'
    else if (form_operation === 'login') form_operation = 'signup'

    // make name field off display (disappear)
    document.getElementById("name-input").classList.toggle("none")

    // toggle all logins or signup text
    if (form_operation === 'signup') {
        document.querySelector(".note").innerHTML = "<span onclick='toggle_signup_login(this)'>Login</span> if you have an account"

        document.querySelector(".title").textContent = "Login into your account"

        document.getElementById("name_field").setAttribute("required", '')
    } else {
        document.querySelector(".note").innerHTML = "<span onclick='toggle_signup_login(this)'>Sign up</span> if you dont have an account"

        document.querySelector(".title").textContent = "Create an account"

        document.getElementById("name_field").removeAttribute("required", '')
    }
}

function invalid_input(field) {
    if(field === 'email') document.getElementById("email_field").classList.add("invalid")
    else if (field === 'password') document.getElementById("password_field").classList.add("invalid")
}

function close_form() {
    document.querySelector(".signup-login").classList.add("none")
}

function successful_login() {
    sessionStorage.setItem("email", data_to_be_submitted.email)

    close_form()
    // sessionStorage.setItem("email", data_to_be_submitted.email)
}

let data_to_be_submitted = {}
document.forms["signup-login-form"].addEventListener("submit", e => {
    e.preventDefault()

    const form_data = new FormData(e.target)
    form_data.forEach((value, key) => {
        data_to_be_submitted[key] = value
    })

    if (!data_to_be_submitted.email.endsWith(".com")) return invalid_input('email')

    if (form_operation === 'signup') {
        for (const key in data_to_be_submitted) {
            localStorage.setItem(key, data_to_be_submitted[key])
        }

        close_form()
        alert('kindly login with your created details')
    } else {       
        // if email doesnt exist
        if (localStorage.getItem("email") === null) return alert("Kindly sign up, your data doesnt exist!")
        // if email doesnt tally with backend data
        else if(data_to_be_submitted.email !== localStorage.getItem("email")) return invalid_input('email')
        // if password is not right
        else if (data_to_be_submitted.password !== localStorage.getItem("password")) return invalid_input('password')
        
        successful_login()
    }
})

function togggle_nav_bar() {
    document.querySelector(".side-nav-bar ").classList.toggle("out-of-view")
}

document.getElementById("toggle-nav-bar").addEventListener("click", e => {
    togggle_nav_bar()
})

document.querySelector(".side-nav-bar").addEventListener("click", e => {
    if(e.target !== document.querySelector(".side-nav-bar")) return

    togggle_nav_bar()
})
addEventListener("DOMContentLoaded", () => prefill_ui_with_data())