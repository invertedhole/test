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
        input[type="text"], input[type="number"] {
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
    </style>
</head>
<body>
    <header>
        <h1>Электронный дневник</h1>
    </header>
    <main>
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
            // Загрузка данных из локального хранилища
            const students = JSON.parse(localStorage.getItem('students')) || {};
            // Функция для обновления таблицы
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
            // Обработчик формы добавления ученика
            addStudentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const name = event.target.name.value.trim();
                const grade = parseInt(event.target.grade.value.trim(), 10);
                if (!students[name]) {
                    students[name] = [];
                }
                students[name].push(grade);
                // Сохранение данных в локальное хранилище
                localStorage.setItem('students', JSON.stringify(students));
                // Очистка формы
                event.target.name.value = '';
                event.target.grade.value = '';
                updateTable();
            });
            // Инициализация таблицы
            updateTable();
        });
    </script>
</body>
</html>
