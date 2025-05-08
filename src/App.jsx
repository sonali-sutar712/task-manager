import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './components/TaskForm';
import { loadTasks, saveTasks } from './utils/LocalStorage';
import TaskList from './components/TaskList';
import { DndContext } from '@dnd-kit/core';
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const isFirstLoad = useRef(true);
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    saveTasks(tasks);
  }, [tasks]);

  const handleToggleStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === 'incomplete' ? 'completed' : 'incomplete' } : task
    );
    setTasks(updatedTasks);

    // Toast for task status change
    const task = updatedTasks.find((task) => task.id === id);
    if (task.status === 'completed') {
      toast.success(" Task Moved to Completed");
    } else {
      toast.success(" Task Moved to Incomplete");
    }
  };

  const handleAddOrUpdateTask = (task) => {
    if (editTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, title: task.title, description: task.description } : t
      );
      setTasks(updatedTasks);
      setEditTask(null);
      toast.info(" Task Updated");
    } else {
      setTasks([...tasks, task]);
      toast.success(" Task Created");
    }
    setIsModalOpen(false); // Close the modal after submitting
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task Deleted");
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsModalOpen(true); 
  };

  const handleOpenModal = () => {
    setEditTask(null); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTask = tasks.find(task => task.id === Number(active.id));
    if (draggedTask && draggedTask.status !== over.id) {
      const updatedTasks = tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status: over.id } : task
      );
      setTasks(updatedTasks);
      toast.success(" Task Moved to " + (over.id === 'completed' ? 'Completed' : 'Incomplete'));
    }
  };

  return (

    <div className="container py-4">
      <ToastContainer />

      {/* Blur wrapper */}
      <div className={isModalOpen ? 'blur-background' : ''}>
        <h2 className="mb-4 text-center"> Task Management</h2>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mb-4 " onClick={handleOpenModal}>
            Add Task
          </button>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="row mt-4">
            <TaskList
              title=" Incomplete Tasks"
              droppableId="incomplete"
              tasks={tasks}
              status="incomplete"
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
            <TaskList
              title=" Completed Tasks"
              droppableId="completed"
              tasks={tasks}
              status="completed"
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          </div>
        </DndContext>
      </div>

      {/* Modal (no change) */}
      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden={!isModalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskModalLabel">
                {editTask ? 'Edit Task' : 'Add Task'}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <TaskForm onSubmit={handleAddOrUpdateTask} editTask={editTask} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

