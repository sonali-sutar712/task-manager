import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, id: editTask?.id || Date.now(), status: editTask?.status || "incomplete" });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 border-0 ">
      <div className="mb-3">
        <input
          type="text"
          className="form-control border-2"
          placeholder="Task Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control border-2"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
