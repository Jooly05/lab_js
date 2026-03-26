const logForm = document.getElementById('entrance')
logForm.addEventListener("click", (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('token', data.token);       
        document.getElementById('logForm').reset();
        window.location.href = 'page.html';       
    })
    .catch(error => {
        document.getElementById('message').innerText = "Ошибка " + error.message
    });
})
