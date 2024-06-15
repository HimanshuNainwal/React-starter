import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constans";

function ShowProject({ id }) {
  const [project, setProject] = useState({});

  const getProjectDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects/${id}`);
      if (response.status == 200) {
        setProject(response.data);
      }
    } catch (err){
        console.log('err',err);
    }
  };

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
          <button className="text-stone-600 hover:text-stone-950">
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{project?.date}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project?.description}
        </p>
      </header>
    </div>
  );
}

export default ShowProject;
