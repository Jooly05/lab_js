fetch('http://localhost:3000/page-user',{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'authorization': `${sessionStorage.getItem('token')}`
    },
})
.then(response => response.json())
.then(data => {
    document.getElementById("massage").innerText = "Авторизация прошла успешно. " + data.name + " " + data.second_name + " добро пожаловать!"
})
.catch(error => {
    document.getElementById('message').innerText = "Ошибка " + error.message
})
