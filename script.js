const button = document.getElementById('fetchDataButton')
const responseParagraph = document.getElementById('response')
const word = document.getElementById('selectionСondition')

button.addEventListener('click', () => {
    if (word.value != ''){
        fetch('http://localhost:3000/api/list_users_by_condition?email=' + word.value)
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('listUser');
        userList.innerHTML = '';
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.second_name} ${user.name} ${user.patronymic} email: 
                    ${user.email} день рождения: ${user.birthday} баланс на счету: ${user.current_balance} рублей`;
                    userList.appendChild(li);
                })
                if (userList.innerHTML == ''){
                    const p = document.createElement('p');
                    p.textContent = `Данные не найдены`;
                    userList.appendChild(p);
                }
            });
        return;
    }
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('listUser');
        userList.innerHTML = '';
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.second_name} ${user.name} ${user.patronymic} email: 
                    ${user.email} день рождения: ${user.birthday} баланс на счету: ${user.current_balance} рублей`;
                    userList.appendChild(li);
                })
            })
    .catch(error => {
        console.error('Error feaching data: ', error)});
        })     
    

const addUserBtn = document.getElementById('add')
addUserBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value
    console.log(name)
    const second_name = document.getElementById('second_name').value
    const patronymic = document.getElementById('patronymic').value
    const email = document.getElementById('email').value
    const birthday = document.getElementById('birthday').value
    const current_balance = document.getElementById('current_balance').value
    console.log({ name, second_name, patronymic, email, birthday, current_balance })
    fetch('http://localhost:3000/api/add-user',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({ name, second_name, patronymic, email, birthday, current_balance })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = `Пользователь добавлен с ID: ${data.id}`
        console.log("Ответ: ", data)
        getAllUsers()
        document.getElementById('userForm').reset()
    })
    .catch(error => {
        document.getElementById('message').innerText = "Ошибка " + error.message
    });
});
const getAllUsers = () => {
    console.log("Идет запрос пользователей...")
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const userList = document.getElementById('listUser');
        userList.innerHTML = '';
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.second_name} ${user.name} ${user.patronymic} email: 
                    ${user.email} день рождения: ${user.birthday} баланс на счету: ${user.current_balance} рублей`;
                    userList.appendChild(li);
                })
            })
    .catch(error => {
        console.error('Error feaching data: ', error)});
}

getAllUsers()
          