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
        }
        /* Стиль для вкладок */
        .tabs {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
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
    </style>
</head>
<body>
   <main>
        <!-- Основное содержимое сайта -->
        <ul class="tabs">
            <li class="active" data-tab="tab1">О нас</li>
            <li data-tab="tab2">Жизнь школы</li>
            <li data-tab="tab3">Новости</li>
        </ul
      <div id="tab1" class="tab-content active">
          <p>(=</p>
          </div>
          <div id="tab2" class="tab-content">
       <div class="tab-container">
        <div class="tab-links">
            <button class="tab-link active" onclick="openTab(event, 'Home')">Home</button>
            <button class="tab-link" onclick="openTab(event, 'About')">About</button>
            <button class="tab-link" onclick="openTab(event, 'Projects')">Projects</button>
            <button class="tab-link" onclick="openTab(event, 'Contact')">Contact</button>
        </div>
        <div class="tab-content" id="Home">
            <h2>Home</h2>
            <p>Welcome to my GitHub page!</p>
            <img src="images/home.jpg" alt="Home Image">
        </div>
        <div class="tab-content" id="About" style="display:none;">
            <h2>About</h2>
            <p>This is the about section.</p>
            <img src="images/about.jpg" alt="About Image">
        </div>
        <div class="tab-content" id="Projects" style="display:none;">
            <h2>Projects</h2>
            <p>These are my projects.</p>
            <img src="images/projects.jpg" alt="Projects Image">
        </div>
        <div class="tab-content" id="Contact" style="display:none;">
            <h2>Contact</h2>
            <p>Get in touch with me.</p>
            <img src="images/contact.jpg" alt="Contact Image">
        </div>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
<style>
/* styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    padding: 20px;
}
.tab-container {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.tab-links {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
}
.tab-link {
    padding: 15px;
    background-color: #f1f1f1;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 18px;
}
.tab-link:hover {
    background-color: #ddd;
}
.tab-link.active {
    background-color: #ccc;
}
.tab-content {
    flex: 3;
    padding: 20px;
    border-left: 1px solid #ccc;
}
.tab-content h2 {
    margin-top: 0;
}
.tab-content img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
}
@media screen and (max-width: 600px) {
    .tab-container {
        flex-direction: column;
    }
    .tab-links {
        flex: none;
        width: 100%;
    }
    .tab-content {
        flex: none;
        width: 100%;
        border-left: none;
        border-top: 1px solid #ccc;
    }
}
    </style>
<script>
// scripts.js
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
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Remove the 'active' class from all tab links
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add 'active' class to the clicked tab link
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>
</body>
</html>
