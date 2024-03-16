// usando taskModels para fazer as operações no banco de dados

const connection = require('./connection');

// function to get all tasks from the database
const getAll = async () => {
  const tasks = await connection.execute('SELECT * FROM tasks');
  return tasks[0];
};

// function to create a new task in the database
const createTasks = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();
  const query =
    'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';

  const [createdTask] = await connection.execute(query, [
    title,
    'pendent',
    dateUTC,
  ]);

  return { insertId: createdTask.insertId };
};

// function to delete a task from the database

const deleteTask = async (id) => {
  const removeTask = await connection.execute(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  );
  return removeTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
  const updateTask = await connection.execute(query, [title, status, id]);
  return updateTask;
};

module.exports = {
  getAll,
  createTasks,
  deleteTask,
  updateTask,
};
