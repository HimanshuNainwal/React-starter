import { useEffect, useState } from "react";
import AddProject from "./component/AddProject";
import NoProject from "./component/NoProject";
import axios from "axios";

const baseUrl = "http://localhost:3000";
function App() {
  const [projects, setProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);

  const getAllProjects = async () => {
    try {
      const response = await axios(`${baseUrl}/projects`); // fetch krke laya hai data server
      // const data = await response.json() // javascript object notation // data ko convert kia hai
      if (response?.data) {
        console.log("response?.data", response?.data);
        setProjects(response?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
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
          <button onClick={() => setShowAddProject(true)} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
            + Add Project
          </button>
        </aside>

        {/* {!showAddProject ? <NoProject /> :<AddProject />} */}
        {!showAddProject && <NoProject  onOpen={() => setShowAddProject(true)} />}

        {showAddProject && <AddProject onClose={() => setShowAddProject(false)} />}
      </main>
    </>
  );
}

export default App;
