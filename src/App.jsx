import { useState, useEffect } from 'react'
import api from './api'

const App = () => {
  const [tasks, setTasks] = useState([]); // For task list
  const [formData, setFormData] = useState({ // For setting form values/data
    name: "",
    description: "",
    is_complete: false,
    date: "",
  })
  const [taskEditId, setTaskEditId] = useState(null); // For task editing - by task_id

  // Method to fetch tasks from backend
  const fetchTasks = async () => {
    const response = await api.get("/tasks/");
    setTasks(response.data)
  };

  // Runs one time at the beginning - because it depends on empty array []
  useEffect(() => {
    fetchTasks();
  }, []);

  // To update the form field value during change in the field
  const handleInputChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData({
      ...formData, // Property spread notation - enumerates the items
      [event.target.name]: value,
    });
  };

  // To set task_id for updating form
  const handleEditClick = (task) => {
    setTaskEditId(task.id);
    setFormData({
      name: task.name,
      description: task.description,
      is_complete: task.is_complete,
      date: task.date,
    }); // Prefilling the forms with the details of selected task to edit
  };

  // Handling form submission to api
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (taskEditId) {
      await api.put(`/tasks/${taskEditId}/`, formData); // Put request through backend - update task
    } else {
      await api.post("/tasks/", formData); // Post request through backend
    }
    fetchTasks();
    resetForm();
  };

  // To delete task based on taskId
  const handleDeleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}/`);
    fetchTasks();
  };

  // To be called after form submission for creating/updating task
  const resetForm = () => {
    setTaskEditId(null);
    setFormData({
      name: "",
      description: "",
      is_complete: false,
      date: "",
    }); // Resetting form field values
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href="#">
            Task App (Frontend)
          </a>
        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='name' className='form-label'>
              Task Name
            </label>
            <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} value={formData.name} />
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Task Description
            </label>
            <input type="text" className="form-control" id="description" name="description" onChange={handleInputChange} value={formData.description} />
          </div>

          <div className='mb-3'>
            <label htmlFor='is_complete' className='form-label'>
              Completed?
            </label>
            <input type='checkbox' id='is_complete' name='is_complete' onChange={handleInputChange} value={formData.is_complete} />
          </div>

          <div className='mb-3'>
            <label htmlFor='date' className='form-label'>
              Due Date
            </label>
            <input type="text" className="form-control" id="date" name="date" onChange={handleInputChange} value={formData.date} />
          </div>

          <button type='submit' className='btn btn-primary mb-3'>
            {taskEditId ? "Edit Task" : "Add Task"}
          </button>
          {taskEditId && (
            <button type='button' onClick={resetForm} className='btn btn-secondary'>
              Cancel
            </button>
          )}
        </form>

        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Completed?</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.is_complete ? "Yes" : "No"}</td>
                <td>{task.date}</td>
                <td>
                  <button onClick={() => handleEditClick(task)} className='btn btn-secondary mx-2'>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className='btn btn-danger mx-2'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default App
