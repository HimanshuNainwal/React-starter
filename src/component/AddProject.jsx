import React, { useState } from "react";
import ErrorModal from "./ErrorModal";
import { useDispatch } from "react-redux";
import { setAddProject } from "../store/projectSlice";



// 1 rem = 16px
// 35 * 16 = 560
function AddProject({ formClose}) {
  const [modal, setModal] = useState(false);
  const [loader,setLoader] = useState(false)
  
  const [formField, setFormField] = useState({
    title: "",
    description: "",
    date: "",
  });




  const dispatch  = useDispatch()

  

  const handleSave = async () => {
    if (!formField.title || !formField.description || !formField.date) {
      setModal(true);
      return;
    }
    setLoader(true)
    try{
      dispatch(setAddProject(formField))


    }catch(err){

    }finally{
      formClose()
      setTimeout(() => setLoader(false),2000)
    }


  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="w-[35rem] mt-16">
      {modal && <ErrorModal handleClose={closeModal} hi={"daskndma ksjnd "} />}

      <div className="flex justify-end gap-4 my-4">
        <button
          className="text-stone-800 hover:text-rose-700"
          onClick={formClose}
        >
          {" "}
          Cancel
        </button>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={handleSave}
        >
          {" "}
          {loader?"Saving ...":"Save"}
        </button>
      </div>

      {/* form area */}
      <div>
        <div>
          <label
            className="text-sm font-bold uppercase text-stone-500"
            htmlFor="title"
          >
            title
          </label>
          <input
            id="title"
            name="title"
            onChange={(e) =>
              setFormField((state) => ({ ...state, title: e?.target?.value }))
            }
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
        <div>
          <label
            className="text-sm font-bold uppercase text-stone-500"
            htmlFor="DESCRIPTION"
          >
            DESCRIPTION
          </label>
          <textarea
            id="DESCRIPTION"
            name="DESCRIPTION"
            onChange={(e) =>
              setFormField((state) => ({
                ...state,
                description: e?.target?.value,
              }))
            }
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
        <div>
          <label
            className="text-sm font-bold uppercase text-stone-500"
            htmlFor="date"
          >
            title
          </label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={(e) =>
              setFormField((state) => ({ ...state, date: e?.target?.value }))
            }
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
      </div>
    </div>
  );
}

// state -> {title:"",description:"",date:""}
// {title:"",description:"",date:"",date:"20-02-2024"}
export default AddProject;
