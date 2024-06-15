import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constans";

function ShowProject({ id,closeProject }) {
  const [project, setProject] = useState({});
  const [currentTask, setCurrentTask] = useState("");

  const getProjectDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects/${id}`);
      if (response.status == 200) {
        setProject(response.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const addTask = async () => {
    try {
      let task;

      if (project?.task?.length > 0) {
        task = [...project?.task, currentTask];
      } else {
        task = [currentTask];
      }

      const response = await axios.patch(`${BASE_URL}/projects/${id}`, {
        task,
      });
      if (response.status == 200) {
        setProject(response.data);
        setCurrentTask("")
      }
    } catch (err) {}
  };

  const handleClearTask = async (taskIndex) => {

    try {
      const filteredTask = project?.task?.filter((_,index) => index !== taskIndex)
      const response = await axios.patch(`${BASE_URL}/projects/${id}`, {
        task:filteredTask,
      });
      if (response.status == 200) {
        setProject(response.data);
      }
    } catch (err) {}

  }

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/projects/${id}`);
      console.log(response)
      closeProject()
    } catch (err) {}

  }



  useEffect(() => {
    getProjectDetail();
  }, [id]);
  return (
    <div>
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project?.title}
          </h1>
          <button className="text-stone-600 hover:text-stone-950" onClick={handleDeleteProject}>
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{project?.date}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project?.description}
        </p>
      </header>

      <section>
        <h2 class="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <div class="flex items-center gap-4">
          <input
            type="text"
            class="w-64 px-2 py-1 rounded-sm bg-stone-200"
            onChange={(e) => setCurrentTask(e?.target?.value)}
            value={currentTask}
          />
          <button class="text-stone-700 hover:text-stone-950" onClick={addTask}>
            Add Task
          </button>
        </div>

        {project?.task?.length > 0 ? (
          <ul class="p-4 mt-8 rounded-md bg-stone-100">
            {project?.task?.map((singleTask, taskIndex) => (
              <li class="flex justify-between my-4">
                <span>{singleTask}</span>
                <button
                  class="text-stone-700 hover:text-red-500"
                  onClick={() => handleClearTask(taskIndex)}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p class="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        )}
      </section>
    </div>
  );
}

export default ShowProject;
