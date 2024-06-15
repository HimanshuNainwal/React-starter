import { useEffect, useState } from "react";
import AddProject from "./component/AddProject";
import NoProject from "./component/NoProject";
import axios from "axios";
import { BASE_URL } from "../lib/constans";
import ShowProject from "./component/ShowProject";

function App() {
  const [projects, setProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [currentProject, setCurrentProject] = useState("");

  const getAllProjects = async () => {
    try {
      const response = await axios(`${BASE_URL}/projects`); // fetch krke laya hai data server
      // const data = await response.json() // javascript object notation // data ko convert kia hai

      if (response?.status == 200) {
        setProjects(response?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleRefresh = async () => {
    setCurrentProject("");
    await getAllProjects();
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
          <h1 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
            {" "}
            Your Projects
          </h1>

          <button
            onClick={() => setShowAddProject(true)}
            className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          >
            + Add Project
          </button>

          <div className="mt-4">
            {projects?.length > 0 &&
              projects.map((singleProject) => {
                return (
                  <p
                    className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400"
                    onClick={() => setCurrentProject(singleProject?.id)}
                  >
                    {singleProject.title}
                  </p>
                );
              })}
          </div>
        </aside>
        {/* {!showAddProject ? <NoProject /> :<AddProject />} */}
        {!showAddProject && !currentProject && (
          <NoProject onOpen={() => setShowAddProject(true)} />
        )}
        {currentProject && !showAddProject && (
          <div className="w-[35rem] mt-16">
            <ShowProject id={currentProject} closeProject={handleRefresh} />
          </div>
        )}

        {showAddProject && (
          <AddProject
            formClose={() => setShowAddProject(false)}
            fetchData={getAllProjects}
          />
        )}
      </main>
    </>
  );
}

export default App;
