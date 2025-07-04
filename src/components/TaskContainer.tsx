import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../Redux/store";
import { NotFound } from "./NotFound";
import { Accordion } from "./Accordion";
import { TaskList } from "../modal/modal";
import { Grid } from "./Grid";

export const TaskContainer = () => {
  const { singleTask } = useSelector((state: RootState) => state.task);
  const { list } = useSelector((state: RootState) => state.layout);

  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768); // Detect initial view

  const todoTasks = singleTask.filter((task: TaskList) => task.status === "Todo");
  const onProgressTasks = singleTask.filter((task: TaskList) => task.status === "Onprogress");
  const completedTasks = singleTask.filter((task: TaskList) => task.status === "Completed");

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Mobile view for screens <= 768px
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
  }, []);

  return (
    <div className="cont my-5 px-3">
      {singleTask.length > 0 ? (
        isMobileView ? ( // Show Accordion for mobile view
          <div>
            <Accordion singleTask={todoTasks} title="Todo" />
            <Accordion singleTask={onProgressTasks} title="Onprogress" />
            <Accordion singleTask={completedTasks} title="Completed" />
          </div>
        ) : (
          // Show both layouts for larger screens
          <div>
            {list && (
              <div>
                <Accordion singleTask={todoTasks} title="Todo" />
                <Accordion singleTask={onProgressTasks} title="Onprogress" />
                <Accordion singleTask={completedTasks} title="Completed" />
              </div>
            )}
            {!list && (
              <div className="flex flex-wrap gap-3 justify-between items-start">
                <Grid singleTask={todoTasks} title="Todo" />
                <Grid singleTask={onProgressTasks} title="Onprogress" />
                <Grid singleTask={completedTasks} title="Completed" />
              </div>
            )}
          </div>
        )
      ) : (
        <NotFound />
      )}
    </div>
  );
};
