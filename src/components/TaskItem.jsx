import { useDraggable } from '@dnd-kit/core';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="card p-3 mb-3 shadow-sm"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
      }}
    >
      {/* Drag handle only on the title */}
      <h5
        {...listeners}
        {...attributes}
        style={{ cursor: 'grab' }}
      >
        {task.title}
      </h5>

      <p {...listeners}
        {...attributes}
        style={{ cursor: 'grab' }}
        >
        {task.description}</p>

      <div className="d-flex justify-content-between">
        <div>
          <button
            className="btn btn-sm btn-secondary me-2"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
          >
            Delete
          </button>
        </div>
        <button
          className={`btn btn-sm ${task.status === 'incomplete' ? 'btn-success' : 'btn-warning'}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(task.id);
          }}
        >
          {task.status === 'incomplete' ? 'Mark as Complete' : 'Mark as Incomplete'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
