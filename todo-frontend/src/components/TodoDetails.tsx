import { Button } from "primereact/button";

type TodoDetailsProps = {
  dueDate?: string;
  completed: boolean;
  title: string;
  description?: string;
  handleToggleComplete: (id: string) => void;
  id: string;
  handleDelete: (id: string) => void;
  handleEdit: (todoId: string, title: string, description: string, dueDate: string) => void;
};
//*could also send todo object in and destruct it here
//*could also use hooks for handlers however the current implementation is more flexible and is very clear about what it is using / what state is affected
export const TodoDetails = ({
  id,
  title,
  completed,
  dueDate,
  description,
  handleToggleComplete,
  handleDelete,
  handleEdit,
}: TodoDetailsProps) => {
  const IsCompleteToggle = () =>
    completed ? (
      <div className="flex flex-wrap align-items-center gap-1">
        <i className="pi pi-check" />
        <p>
          <b>COMPLETED</b>
        </p>
      </div>
    ) : (
      <div className="flex flex-wrap align-items-center gap-1">
        <i className="pi pi-times" />
        <p>
          <b>INCOMPLETE</b>
        </p>
      </div>
    );
  return (
    <>
      <strong>{title}</strong> <IsCompleteToggle />
      {dueDate ? ` (Due: ${dueDate})` : ""}
      {description ? <p>{description}</p> : null}
      <Button
        onClick={() => handleToggleComplete(id)}
        label={completed ? "Undo" : "Complete"}
        icon={completed ? "pi pi-undo" : "pi pi-check"}
        style={{ backgroundColor: completed ? "lightgrey" : "green" }}
      />
      <Button
        onClick={() => handleEdit(id, title, description ? description : "", dueDate || "")}
        icon="pi pi-pencil"
        label="Edit"
      />
      <Button
        onClick={() => handleDelete(id)}
        label="Delete"
        icon="pi pi-trash"
        style={{ backgroundColor: "red", color: "white" }}
      />
    </>
  );
};
