<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой сайт</title>
    <style>
        /* Базовый стиль для всего сайта */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F5F5DC;
        }
        header {
            background-color: #333;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        nav {
            display: flex;
            justify-content: center;
            background-color: #444;
        }
        nav a {
            color: white;
            padding: 14px 20px;
            text-decoration: none;
            text-align: center;
        }
        nav a:hover {
            background-color: #555;
        }
        .content {
            padding: 20px;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px 0;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
        /* Стиль для вкладок */
        .tabs {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            border: none;
            background-color: #8FBC8F;
        }
        .tabs li {
            flex: 1;
            text-align: center;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            padding: 10px;
        }
        .tabs li.active {
            border-bottom: 2px solid #007bff;
        }
        /* Стиль для контента вкладок */
        .tab-content {
            display: none;
            padding: 20px;
        }
        .tab-content.active {
            display: block;
        }
        /* Vertical Tabs */
        .vertical-tabs {
            display: flex;
        }
        .tab {
            flex: 1;
            background-color: #f1f1f1;
            padding: 10px;
            border-right: 1px solid #ccc;
        }
        .tab button {
            display: block;
            background-color: inherit;
            color: black;
            padding: 10px 15px;
            width: 100%;
            border: none;
            outline: none;
            text-align: left;
            cursor: pointer;
            transition: 0.3s;
        }
        .tab button:hover {
            background-color: #ddd;
        }
        .tab button.active {
            background-color: #ccc;
        }
        .tabcontent {
            flex: 3;
            padding: 10px;
            border-left: 1px solid #ccc;
            display: none;
        }
        .tabcontent.show {
            display: block;
        }
    </style>
</head>
<body>
    <header>
        <!-- Заголовок сайта -->
        <h1>ГБУ ОО ЗО "Алексеевская СОШ"</h1>
        <img src="https://raw.githubusercontent.com/invertedhole/ooalexsosh/main/картинка2.PNG" alt="School Logo">
    </header>
    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
    </nav>
    <main>
        <!-- Основное содержимое сайта -->
        <ul class="tabs">
            <li class="active" data-tab="tab1">О нас</li>
            <li data-tab="tab2">Жизнь школы</li>
            <li data-tab="tab3">Новости</li>
        </ul>
        <div id="tab1" class="tab-content active">
            <p>Контактные данные</p>
            <p>Директор: +7 990 077 2103</p>
            <p>Отдел кадров: +7 990 058 1933</p>
        </div>
        <div id="tab2" class="tab-content">
            <h2>Жизнь школы</h2>
            <p>Content for the school life tab.</p>
            <!-- Vertical Tabs -->
            <div class="vertical-tabs">
                <div class="tab">
                    <button class="tablinks" onclick="openTab(event, 'Выпускной 2024')">Выпускной 2024</button>
                    <button class="tablinks" onclick="openTab(event, 'Мероприятия')">Мероприятия</button>
                    <button class="tablinks" onclick="openTab(event, 'Первый звонок')">Первый звонок</button>
                </div>
                <div id="Выпускной 2024" class="tabcontent">
                    <h3>"Выпускной 2024"</h3>
                    <p>....</p>
                </div>
                <div id="Мероприятия" class="tabcontent">
                    <h3>Мероприятия</h3>
                    <p>....</p>
                </div>
                <div id="'Первый звонок" class="tabcontent">
                    <h3>Первый звонок</h3>
                    <p>....</p>
                </div>
            </div>
        </div>
        <div id="tab3" class="tab-content">
            <h2>Новости</h2>
            <p>Контент вкладки 3</p>
        </div>
    </main>
    <footer>
        <!-- Нижняя часть сайта -->
        <p>&copy; 2024 сайт ГБУ ОО ЗО "Алексеевская СОШ"</p>
    </footer>
    <script>
        // JavaScript для управления вкладками
        const tabs = document.querySelectorAll('.tabs li');
        const tabContents = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                const targetContent = document.getElementById(targetTab);
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                });
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                tab.classList.add('active');
                targetContent.classList.add('active');
            });
        });
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
        // Show the first vertical tab by default
        document.addEventListener("DOMContentLoaded", function () {
            document.querySelector(".tablinks").click();
        });
    </script>
</body>
</html>
