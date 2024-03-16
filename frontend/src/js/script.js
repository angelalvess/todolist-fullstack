<<<<<<< HEAD
console.log('Hello from the frontend! - staging');
=======
const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  response = await fetch('http://localhost:3333/tasks');
  const tasks = await response.json();
  return tasks;
};

const addTask = async (e) => {
  e.preventDefault();

  const task = { title: inputTask.value };

  await fetch('http://localhost:3333/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  renderTasks();
  inputTask.value = '';
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete',
  });

  renderTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });

  renderTasks();
};

const formatDate = (dateUTC) => {
  const options = {
    dateStyle: 'long',
    timeStyle: 'short',
  };

  const date = new Date(dateUTC).toLocaleString('en-US', options);
  return date;
};

const createSelect = (value) => {
  const options = `
    <option value="pendent">Pendent</option>
    <option value="in-progress">In Progress</option>
    <option value="finished">Finished</option>
    `;

  const select = createElement('select', '', options);

  select.value = value;

  return select;
};

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);
  if (innerText) element.innerText = innerText;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
};

const createRow = (task) => {
  const { id, title, status, created_at } = task;
  const tr = createElement('tr');

  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);
  select.classList.add('select');
  select.addEventListener('change', ({ target }) =>
    updateTask({ ...task, status: target.value })
  );
  tdStatus.appendChild(select);

  const editButton = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined">edit</span>'
  );

  const deleteButton = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined">delete</span>'
  );

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.classList.add('input-task');

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateTask({ ...task, title: editInput.value });
  });

  editButton.classList.add('btn-action');
  editButton.addEventListener('click', () => {
    tdTitle.innerHTML = '';
    tdTitle.appendChild(editForm);
  });

  deleteButton.classList.add('btn-action');
  deleteButton.addEventListener('click', () => deleteTask(id));

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const renderTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener('submit', addTask);

renderTasks();
>>>>>>> 529ff5af571def1fcaa54ef1be7cf232fd1dfff4
