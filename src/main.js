function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        fetch_login()
        window.location.href = "movies.html";
        // Perform your AJAX/Fetch login
        //setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch register
        fetch_register();
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
    //login
    async function fetch_login(){
        const user = document.getElementById("mi_user_login").value
        const pwd = document.getElementById("mi_user_pwd").value

        const response = await fetch('http://localhost:3011/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pwd
            })
        });

        const data = await response.json()
        console.log(data)
    }
    //register
    async function fetch_register(){
        const user = document.getElementById("signupUsername").value
        const pwd = document.getElementById("mipass").value

        const response = await fetch('http://localhost:3011/users/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pwd
            })
        });
        
        const data = await response.json()
        console.log(data)
    }
    //API
    
});
async function myFunction1(){
    const response = await fetch("http://localhost:3011/movies/2")
    const data = await response.json()
    $("#mitemplate").html(template(data));
    console.log(data)
}
async function myFunction2(){
    var html =""
    const response = await fetch("http://localhost:3011/movies/")
    const data = await response.json()
    data.forEach(e => html+=(template(e)))
    $("#mitemplate").html(html)
    console.log(data)
}
async function myFunction3(){
    var html =""
    const response = await fetch("http://localhost:3011/movies/search",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "key": "year",
            "value": 1994
        })
    })

    const data = await response.json()
    data.forEach(e => html+=(template(e)))
    $("#mitemplate").html(html);
    console.log(data)
}
function template(data){
    return `<ul><li>Id:${data.id}</li><li>Title:${data.title}</li><li>Year:${data.year}</li><li>Year:${data.director}</li><li>Year:${data.actors}</li></ul>`
}