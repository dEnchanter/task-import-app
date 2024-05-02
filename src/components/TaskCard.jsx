export const TaskCard = ({ task }) => {

  if (!task) return null;

  return (
      <div className="bg-white shadow-md rounded-lg p-4 m-2 my-auto">
          <div className={`border-l-4 pl-2 ${task.completed ? 'border-green-500' : 'border-red-500'}`}>
              <h3 className="text-md font-medium">{task.title}</h3>
              <p className="text-sm">Task ID: {task.id}</p>
              <p className="text-sm">User ID: {task.userId}</p>
              <p className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
              </p>
          </div>
      </div>
  );
};