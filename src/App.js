import React, { useState } from 'react';
import './App.css';
import { v4 } from 'uuid';
const initialValues = {
  id: '',
  title: '',
  description: '',
  createdAt: ''
}

function App() {
  const [taskData, setTaskData] = useState(initialValues);
  const [tasks, setTasks] = useState([]);
  const [editabletaskData, setEditabletaskData] = useState({
    isEdit: false,
    id: null
  });
  
  const isFilledFields =  taskData.title && taskData.description && taskData.createdAt
  const idCheck = (element) => {
    if (element.id == editabletaskData.id)
    {
      return true
    }
    return false
  }
  const handleSubmittask = (e) => {
    e.preventDefault();
    if (isFilledFields) {
      if (editabletaskData.isEdit) {
        const editedData = tasks;
        editedData.splice(editedData.indexOf(editedData.find(idCheck)), 1, taskData);
        
        setTasks(editedData);

        setEditabletaskData({
          isEdit: false,
          id: null
        })
      } else {
        setTasks((prevState) => [ taskData,...prevState]);
      }
    }
    setTaskData(initialValues);
  };
  const handleCleanClick = () => setTaskData(initialValues)
  const handleRemoveClick = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleEditClick = (task) => {
    setTaskData(task);
    setEditabletaskData({
      isEdit: true,
      id: task.id
    })
  }

  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div className="table-data">
          <table>

            
            <th>title</th>
            <th>description</th>
            <th>createdAt</th>
            <th>action</th>


            <tbody>
              {tasks.map((task, index) => (
                <tr>
                  
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.createdAt}</td>
                  <td>
                    <div>
                      <button className='edit-action' onClick={() => handleEditClick(task)}>edit</button>
                      <button className='remove-action' onClick={() => handleRemoveClick(task.id)}>remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='form-data'>
          <form onSubmit={handleSubmittask} onReset={handleCleanClick}>
            <input placeholder="title"
              onChange={(e) => setTaskData((prevState) => ({
                ...prevState,
                title: e.target.value,
                createdAt: new Date().toLocaleDateString('en-US'),
                id: v4()
              }))}
              value={taskData.title} />
            <input placeholder="description"
              onChange={(e) => setTaskData((prevState) => ({
                ...prevState,
                description: e.target.value,
                createdAt: new Date().toLocaleDateString('en-US'),
                id: v4()
              }))}
              value={taskData.description} />


            <div className='buttons-wrapper'>
              <button type="reset">Clean</button>
              <button disabled={!isFilledFields} type="submit">{editabletaskData.isEdit ? 'Edit' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
