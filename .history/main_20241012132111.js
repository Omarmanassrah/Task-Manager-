
// Task class to represent individual tasks
class Task {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}

// TaskManager class to handle task operations
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // Add a task
  addTask(description) {
    const id = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    const newTask = new Task(id, description);
    this.tasks.push(newTask);
    console.log(`Task added: "${description}" with ID: ${id}`);
  }

  // Display all tasks
  viewTasks() {
    if (this.tasks.length === 0) {
      console.log("No tasks available.");
    } else {
      console.log("\nTasks:");
      this.tasks.forEach((task) => {
        const status = task.completed ? 'Completed' : 'Not Completed';
        console.log(`ID: ${task.id} | ${task.description} | Status: ${status}`);
      });
    }
  }

  // Toggle task completion by ID
  toggleCompletion(taskId) {
    const task = this._findTaskById(taskId);
    if (task) {
      task.toggleCompletion();
      const status = task.completed ? 'Completed' : 'Not Completed';
      console.log(`Task ID ${taskId} is now ${status}.`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  // Remove a task by ID
  removeTask(taskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const removedTask = this.tasks.splice(taskIndex, 1)[0];
      console.log(`Removed task: "${removedTask.description}"`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  // Update a task's description by ID
  updateTask(taskId, newDescription) {
    const task = this._findTaskById(taskId);
    if (task) {
      task.description = newDescription;
      console.log(`Task ID ${taskId} updated to: "${newDescription}"`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  // Search tasks by name (case-insensitive)
  searchTask(name) {
    const foundTasks = this.tasks.filter((task) =>
      task.description.toLowerCase().includes(name.toLowerCase())
    );
    if (foundTasks.length > 0) {
      console.log("\nSearch results:");
      foundTasks.forEach((task) => {
        const status = task.completed ? 'Completed' : 'Not Completed';
        console.log(`ID: ${task.id} | ${task.description} | Status: ${status}`);
      });
    } else {
      console.log(`No tasks found matching "${name}".`);
    }
  }

  // Helper method to find a task by ID
  _findTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }
}

// Create readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main function to interact with the user
function main() {
  const taskManager = new TaskManager();

  function showMenu() {
    console.log(`
1. Add Task
2. View Tasks
3. Toggle Task Completion
4. Remove Task
5. Update Task
6. Search Task
7. Exit
    `);
    
    rl.question('Choose an option: ', (choice) => {
      switch (choice.trim()) {
        case '1':
          rl.question('Enter task description: ', (description) => {
            taskManager.addTask(description);
            showMenu();
          });
          break;
        case '2':
          taskManager.viewTasks();
          showMenu();
          break;
        case '3':
          rl.question('Enter task ID to toggle completion: ', (taskId) => {
            taskManager.toggleCompletion(parseInt(taskId));
            showMenu();
          });
          break;
        case '4':
          rl.question('Enter task ID to remove: ', (taskId) => {
            taskManager.removeTask(parseInt(taskId));
            showMenu();
          });
          break;
        case '5':
          rl.question('Enter task ID to update: ', (taskId) => {
            rl.question('Enter new task description: ', (newDescription) => {
              taskManager.updateTask(parseInt(taskId), newDescription);
              showMenu();
            });
          });
          break;
        case '6':
          rl.question('Enter task name to search: ', (name) => {
            taskManager.searchTask(name);
            showMenu();
          });
          break;
        case '7':
          console.log("Exiting...");
          rl.close();
          break;
        default:
          console.log("Invalid choice. Please try again.");
          showMenu();
      }
    });
  }

  showMenu();
}

main();
