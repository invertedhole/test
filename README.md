<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Электронный дневник</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        header {
            text-align: center;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        form {
            display: flex;
            flex-direction: column;
            width: 300px;
        }
        input[type="text"], input[type="number"], input[type="email"], input[type="password"] {
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        #addStudentForm {
            display: none; /* Изначально скрыто */
        }
    </style>
</head>
<body>
    <header>
        <h1>Электронный дневник</h1>
    </header>
    <main>
        <div id="authForms">
            <h2>Регистрация</h2>
            <form id="registerForm">
                <label for="regUsername">Имя пользователя:</label>
                <input type="text" id="regUsername" name="username" required>
                <label for="regEmail">Email:</label>
                <input type="email" id="regEmail" name="email" required>
                <label for="regPassword">Пароль:</label>
                <input type="password" id="regPassword" name="password" required>
                <input type="submit" value="Зарегистрироваться">
            </form>
            <h2>Вход</h2>
            <form id="loginForm">
                <label for="loginUsername">Имя пользователя:</label>
                <input type="text" id="loginUsername" name="username" required>
                <label for="loginPassword">Пароль:</label>
                <input type="password" id="loginPassword" name="password" required>
                <input type="submit" value="Войти">
            </form>
        </div>
        <table id="studentsTable">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Оценки</th>
                </tr>
            </thead>
            <tbody>
                <!-- Данные учеников будут добавлены здесь -->
            </tbody>
        </table>
        <h2>Добавить оценку</h2>
        <form id="addStudentForm">
            <label for="name">Имя ученика:</label>
            <input type="text" id="name" name="name" required>
            <label for="grade">Оценка:</label>
            <input type="number" id="grade" name="grade" required min="1" max="5">
            <input type="submit" value="Добавить">
        </form>
    </main>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
            const addStudentForm = document.getElementById('addStudentForm');
            const registerForm = document.getElementById('registerForm');
            const loginForm = document.getElementById('loginForm');
            const authForms = document.getElementById('authForms');
            let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
            const students = JSON.parse(localStorage.getItem('students')) || {};
            const users = JSON.parse(localStorage.getItem('users')) || {};
            function updateTable() {
                studentsTable.innerHTML = '';
                for (const [name, grades] of Object.entries(students)) {
                    const row = studentsTable.insertRow();
                    const cellName = row.insertCell(0);
                    const cellGrades = row.insertCell(1);
                    cellName.textContent = name;
                    cellGrades.textContent = grades.join(', ');
                }
            }
            function updateUI() {
                if (currentUser) {
                    authForms.style.display = 'none';
                    addStudentForm.style.display = currentUser.role === 'admin' ? 'flex' : 'none';
                } else {
                    authForms.style.display = 'block';
                    addStudentForm.style.display = 'none';
                }
            }
            registerForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const username = event.target.username.value.trim();
                const email = event.target.email.value.trim();
                const password = event.target.password.value.trim();
                if (users[username]) {
                    alert('Пользователь с таким именем уже существует');
                    return;
                }
                const isFirstUser = Object.keys(users).length === 0;
                users[username] = { email: email, password: password, role: isFirstUser ? 'admin' : 'user' };
                localStorage.setItem('users', JSON.stringify(users));
                alert('Регистрация успешна');
                event.target.reset();
            });
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const username = event.target.username.value.trim();
                const password = event.target.password.value.trim();
                if (!users[username] || users[username].password !== password) {
                    alert('Неверное имя пользователя или пароль');
                    return;
                }
                currentUser = { username: username, role: users[username].role };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateUI();
                alert('Вход выполнен');
            });
            addStudentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                if (!currentUser || currentUser.role !== 'admin') {
                    alert('У вас нет прав для добавления оценки');
                    return;
                }
                const name = event.target.name.value.trim();
                const grade = parseInt(event.target.grade.value.trim(), 10);
                if (!students[name]) {
                    students[name] = [];
                }
                students[name].push(grade);
                localStorage.setItem('students', JSON.stringify(students));
                event.target.reset
       </script>
    </body>
</html>
