import { Navbar } from "../components/Navbar";
import { TaskContainer } from "../components/TaskContainer";

export const TaskPage = () => {
  return (
    <>
      <div className="relative">
        <Navbar />
        <TaskContainer />
      </div>
    </>
  );
};
