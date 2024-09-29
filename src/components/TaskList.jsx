import { useEffect, useReducer, useRef, useState } from "react";
import { reducer } from "../utils/TaskReducer";
import "../App.css";
const TaskList = () => {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedTask, setCompletedtask] = useState(0);
  const [totalTask, setTotalTasks] = useState(0);
  const [priorityPref, setPriorityPref] = useState("");

  const initialState = [
    {
      id: 0,
      content: content || " ",
      isCompleted: false,
      dueDate: dueDate || " ",
      priority: priority || " ",
    },
  ];

  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = () => {
    if (content && dueDate && priority) {
      dispatch({
        type: "ADD_TASK",
        payload: { id: Date.now(), content, dueDate, priority, isCompleted },
      });
      localStorage.setItem("tasks", JSON.stringify(state));
      setTotalTasks(totalTask + 1);
    }
    setDueDate("");
    setContent("");
    setPriority("");
  };

  const updateTask = (id) => {
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: { id, isCompleted: true },
    });
    setCompletedtask(completedTask + 1);
  };

  const deleteTask = (id, isCompleted) => {
    dispatch({ type: "DELETE_TASK", payload: id });
    if (isCompleted === true) setCompletedtask(completedTask - 1);
    setTotalTasks(totalTask - 1);
  };

  const priorityOrder = {
    low: 1,
    medium: 2,
    high: 3,
  };

  function sortTasksList(e) {
    if (e?.target?.value === undefined) return;
    const value = e.target.value;
    if (value === "low_to_high" || value === "high_to_low") {
      setPriorityPref(value);
      if (state) {
        state.sort((a, b) => {
          const priorityA = priorityOrder[a.priority.toLowerCase()];
          const priorityB = priorityOrder[b.priority.toLowerCase()];
          if (value === "low_to_high") {
            return priorityA - priorityB;
          } else if (value === "high_to_low") {
            return priorityB - priorityA;
          }
        });
      }
    }
  }

  return (
    <>
      <div className="flex md:flex-row flex-col items-end  gap-2 space-y-2 md:space-y-0 ">
        <div className="w-full space-y-3">
          <label htmlFor="addTask" className="text-cyan-700">
            Add a task
          </label>
          <input
            type="text"
            id="addTask"
            placeholder="Add a new task here..."
            className="bg-transparent  border text-xs md:text-base border-cyan-900 p-2 rounded-lg w-full "
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="space-y-3 w-full md:w-1/4">
          <label htmlFor="dueDate" className="text-cyan-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent  text-white border text-xs md:text-base p-2 rounded-lg border-cyan-900 w-full md:w-full "
          />
        </div>

        <div className="space-y-3 w-full md:w-1/4">
          <label htmlFor="priority" className="text-cyan-700">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-transparent border text-xs md:text-base border-cyan-900 p-2 rounded-lg text-white w-full md:w-full"
          >
            <option value="" disabled className="bg-black">
              Priority
            </option>
            <option value="Low" className="bg-black">
              Low
            </option>
            <option value="Medium" className="bg-black">
              Medium
            </option>
            <option value="High" className="bg-black ">
              High
            </option>
          </select>
        </div>
        <button
          className="bg-cyan-900 p-2 rounded-lg font-semibold w-full md:w-1/5"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <div>
        {state.length > 1 && (
          <div className="md:text-right md:mt-4 mt-12  flex items-center justify-between px-4 text-xs md:text-sm ">
            <div className="flex md:flex-row flex-col items-center md:gap-2 mr-5">
              <span>Completed Tasks</span>
              <p className="h-5 w-12 bg-green-500 text-green-300 bg-opacity-15 border border-green-500 rounded-lg mt-1 flex items-center justify-center">
                {completedTask}/{totalTask}
              </p>
            </div>
            <div>
              <select
                name=""
                id="sort"
                value={priorityPref}
                onChange={(e) => sortTasksList(e)}
                className="bg-transparent border border-cyan-900 p-2 rounded-lg text-white"
              >
                <option value="" disabled className="bg-black">
                  Sort priority
                </option>
                <option value="low_to_high" className="bg-black text-white">
                  Low to high
                </option>
                <option value="high_to_low" className="bg-black text-white">
                  High to Low
                </option>
              </select>
            </div>
          </div>
        )}
        <div className={`w-full p-4  rounded-md mt-5  `}>
          {state.length > 0 ? (
            state.map((s) => {
              if (s.content != " ") {
                return (
                  <div
                    className={`${
                      s.isCompleted === true
                        ? "bg-green-500 opacity-[0.6] bg-opacity-15 border border-green-700 hover:bg-green-500 hover:bg-opacity-25 transition-colors duration-800 "
                        : ""
                    } text-xs md:text-base  flex md:flex-row flex-col py-2 items-center justify-between gap-3 my-2 border border-cyan-900 md:p-2  hover:bg-cyan-800 transition-colors `}
                    key={s.id}
                  >
                    <span className="w-full text-left px-5 md:px-2 text-base">
                      {s.content}
                    </span>
                    <p className="flex w-full gap-20 text-xs md:text-base md:w-1/2 justify-between md:mr-20 px-5 md:px-0">
                      <span
                        className={`${
                          s.priority === "Medium" || "-" ? "text-center" : ""
                        } w-1/4 text-nowrap `}
                      >
                        {s.dueDate || "-"}
                      </span>
                      <span>{s.priority || "-"}</span>
                    </p>
                    <div className="md:w-20 w-full flex justify-between px-5 md:px-0 md:justify-end gap-1">
                      <span
                        className="hover:cursor-pointer "
                        onClick={() => updateTask(s.id)}
                      >
                        {s.isCompleted === true ? "" : "✔"}
                      </span>
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => deleteTask(s.id, s.isCompleted)}
                      >
                        ❌
                      </span>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <span className="text-white">No tasks to do</span>
          )}
        </div>
      </div>
    </>
  );
};
export default TaskList;
