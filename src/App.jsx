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
    <>
      <div>
      </div>
    </>
  )
}

export default App
