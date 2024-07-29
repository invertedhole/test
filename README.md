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
                <input type="text" id="regUsername" name="username" required>
                <label for="regEmail">Email:</label>
                <input type="email" id="regEmail" name="email" required>
                <label for="regPassword">Пароль:</label>
                <input type="password" id="regPassword" name="password" required>
                <input type="submit" value="Зарегистрироваться">
            </form>
            <h2>Вход</h2>
            <form id="loginForm">
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
      <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
 apiKey: "AIzaSyAVy1BVdsVnRkIQB6xRG00f6pmd9WNo97U",
 authDomain: "alexsosh-7c608.firebaseapp.com",
 databaseURL: "https://alexsosh-7c608-default-rtdb.firebaseio.com",
 projectId: "alexsosh-7c608",
 storageBucket: "alexsosh-7c608.appspot.com",
 messagingSenderId: "540899168475",
 appId: "1:540899168475:web:dc5caf50b717ea5fdcbcfe",
 measurementId: "G-B603CWP3RT"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
// Обработчик событий для формы добавления оценки
addStudentForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') {
    alert('У вас нет прав для добавления оценки');
    return;
  }
  const name = event.target.name.value.trim();
  const grade = parseInt(event.target.grade.value.trim(), 10);
  const studentsRef = database.ref('students');
  const newStudentRef = studentsRef.push();
  newStudentRef.set({
    name: name,
    grade: grade
  });
});
// Обработчик событий для формы регистрации
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
  const usersRef = database.ref('users');
  const newUserRef = usersRef.push();
  newUserRef.set({
    username: username,
    email: email,
    password: password,
    role: users[username].role
  });
});
// Обработчик событий для формы входа
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = event.target.username.value.trim();
  const password = event.target.password.value.trim();
  if (!users[username] || users[username].password !== password) {
    alert('Неверное имя пользователя или пароль');
    return;
  }
  currentUser = { username: username, role: users[username].role };
  const usersRef = database.ref('users');
  const userRef = usersRef.orderByChild('username').equalTo(username).limitToFirst(1);
  userRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      const userData = childSnapshot.val();
      currentUser = { username: userData.username, role: userData.role };
    });
    updateUI();
    alert('Вход выполнен');
  });
});
// Обновление таблицы с использованием данных students из Firebase Realtime Database
const studentsRef = database.ref('students');
studentsRef.on('value', function(snapshot) {
  const students = snapshot.val();
  let tableHtml = '';
  for (let key in students) {
    const student = students[key];
    tableHtml += `<tr><td>${student.name}</td><td>${student.grade}</td></tr>`;
  }
  studentsTable.innerHTML = tableHtml;
});
// Обновление UI с использованием данных users из Firebase Realtime Database
const usersRef = database.ref('users');
usersRef.on('value', function(snapshot) {
  const users = snapshot.val();
  for (let key in users) {
    const user = users[key];
    if (user.username === currentUser.username) {
      currentUser = { username: user.username, role: user.role };
      break;
    }
  }
  updateUI();
});
function updateUI() {
  if (currentUser) {
    authForms.style.display = 'none';
    addStudentForm.style.display = currentUser.role === 'admin' ? 'flex' : 'none';
  } else {
    authForms.style.display = 'block';
    addStudentForm.style.display = 'none';
  }
}
       </script>
    </body>
</html>
