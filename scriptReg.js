const registrationUser = document.getElementById('reg')
registrationUser.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value
    const second_name = document.getElementById('secname').value
    const patronymic = document.getElementById('patronymic').value
    const email = document.getElementById('email').value
    const birthday = document.getElementById('bday').value
    const current_balance = document.getElementById('current_balance').value
    const password = document.getElementById('password').value
    console.log("Запрос: ", { name, second_name, patronymic, email, birthday, current_balance })
    fetch('http://localhost:3000/register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({ name, second_name, patronymic, email, birthday, current_balance, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = "Пользователь добавлен"
        console.log("Ответ: ", data)
        document.getElementById('regForm').reset()
    })
    .catch(error => {
        document.getElementById('message').innerText = "Ошибка " + error.message
    });
})
