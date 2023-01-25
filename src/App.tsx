import { Component, createSignal, For, Show } from 'solid-js';

const App: Component = () => {
  type Task = {
    id: number,
    text: string,
    completed: Boolean
  }

  const [taskList, setTaskList] = createSignal([] as Task[]);
  let task_name: any;
  
  function addTaskToList(e: Event) {
    e.preventDefault();

    function _buildTask() {
      const currentTask = {
        id: Math.floor(Math.random() * Date.now()),
        text: task_name.value,
        completed: false
      }
  
      return currentTask;
    }

    setTaskList([_buildTask(), ...taskList()])
    task_name.value = '';
  }

  function deleteTaskFromList(task_id: number) {
    const filteredList = taskList().filter((task: Task) => task.id !== task_id);
    setTaskList(filteredList);
  }

  function setCompletition(task_id: number) {
    const updatedList = taskList().map((task: Task) => {
      if(task.id === task_id) {
        task.completed = true;
      }
      return task;
    });
    setTaskList(updatedList);
  }


  return (
    <div class="container mt-5 text-center">
      <h1 class="mb-4">What todo!</h1>

      <form class="mb-5 row row-cols-2 justify-content-center">
        <input type="text" class="input-group-text p-1 w-25" placeholder="Add task here..." ref={task_name} id="taskInput" required />

        <button class="btn btn-primary ms-3 w-auto" type="submit" onClick={(e) => addTaskToList(e)}>
          Add task
        </button>
      </form>
      <Show when={taskList().length} fallback={'No tasks yet'}>
        <div>
          <h4 class="text-muted mb-4">Tasks</h4>
          <For each={taskList()}>
            {(task: Task) => (
              <div class="row row-cols-3 mb-3 justify-content-center">
              <button class="btn btn-danger w-auto" onClick={() => deleteTaskFromList(task.id)}>X</button>
              <div class="bg-light p-2 mx-2">{task.text}</div>
              <input type="checkbox" role="button" class="form-check-input h-auto px-3" onChange={() => setCompletition(task.id)} />
            </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default App;
