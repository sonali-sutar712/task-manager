import TaskItem from "./TaskItem";
import { useDroppable } from '@dnd-kit/core';

const TaskList = ({ tasks, title, status, onEdit, onDelete, onToggleStatus,droppableId }) => {
    const { setNodeRef } = useDroppable({ id: droppableId });
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="col-md-6">
      <h4 className="mb-3">{title}</h4>
      <div
  ref={setNodeRef}
  style={{
    background: '#f9f9f9',
    padding: '1rem',
    minHeight: '200px',
    border: '2px solid #ccc',
    borderRadius: '10px',
  }}
>
  {filteredTasks.length === 0 ? (
    <p className="text-muted">No tasks here.</p>
  ) : (
    filteredTasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
    ))
  )}
</div>

    </div>
  );
};

export default TaskList;
