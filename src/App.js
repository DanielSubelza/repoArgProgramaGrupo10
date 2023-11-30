import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TextField, Button, Paper, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = () => {
    if (newTaskTitle.trim() !== '' && newTaskDescription.trim() !== '') {
      if (editingIndex !== null) {
        // Editar el task
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = {
          title: newTaskTitle,
          description: newTaskDescription,
        };
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        // nuevo task
        setTasks([...tasks, { title: newTaskTitle, description: newTaskDescription }]);
      }
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  const editTask = (index) => {
    const task = tasks[index];
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <AppBar position="static" color="secondary">
        <Toolbar>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="imagenes/UTN logo.png" alt="Logo" style={{ height: '50px', marginRight: '10px' }} /> 
            <Button color="inherit">INICIO</Button>
          </Typography>  
        </Toolbar>
      </AppBar>
      <div className="app-container">
        <div className="calendar-container">
          <h2>CALENDARIO</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
        <div className="task-form">
          <h2>MIS TAREAS</h2>
          <TextField 
            label="Título"
            variant="outlined"
            fullWidth
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <div style={{ marginBottom: '10px' }}></div>
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}

          />
          <div style={{ marginBottom: '10px' }}></div>

          <Button variant="contained" color="secondary" onClick={addTask}>
            {editingIndex !== null ? 'Editar Tarea' : 'Agregar Tarea'}
          </Button>
        </div>
        <Paper elevation={3} className="task-list">
          <List>
            {tasks.map((task, index) => (
              <ListItem key={index} className="task-item">
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                />
                <div className="task-actions">
                  <Button color="secondary" onClick={() => editTask(index)}>
                    Editar
                  </Button>
                  <Button color="secondary" onClick={() => deleteTask(index)}>
                    Eliminar
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </div>
  );
}

export default App;
