// Weather API (OpenWeatherMap)
async function fetchWeather() {
  const apiKey = 'c5b75a51f249b03998c4a917d0a95438';
  const lat = 11.39;
  const lon = 79.69;
  const weatherElement = document.getElementById('weather');

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;

    weatherElement.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" width="80" height="80"><br>
      <strong>Temperature:</strong> ${temp}°C (Feels like ${feelsLike}°C)<br>
      <strong>Condition:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}<br>
      <strong>Humidity:</strong> ${humidity}%<br>
      <strong>Location:</strong> Chidambaram, Tamil Nadu
    `;
  } catch (error) {
    console.error('Weather fetch error:', error);
    weatherElement.innerHTML = `
      ⚠️ Unable to load weather data.<br>
      <small>Error: ${error.message}</small>
    `;
  }
}

// To-Do List
let tasks = [];

function loadTasks() {
  const stored = localStorage.getItem('monthlyTasks');
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('monthlyTasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

// Initialize
fetchWeather();
loadTasks();
