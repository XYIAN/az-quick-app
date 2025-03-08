type TodoDetailsProps = {
  dueDate?: string;
  completed: boolean;
  title: string;
  description?: string;
};
export const TodoDetails = ({ title, completed, dueDate, description }: TodoDetailsProps) => {
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
    </>
  );
};
