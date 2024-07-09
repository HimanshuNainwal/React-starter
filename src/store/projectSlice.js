import { createSlice } from "@reduxjs/toolkit";

// "title": "",
//     "description": "kjdnasjkdnjkasdnjas",
//     "date": "2024-07-09",
//     "task": [
//       "dasdas"
//     ]
const initialState = {
  projectList: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setAddProject: (state, action) => {
      const data = action.payload;
      const id = state.projectList.length + 1;

      state.projectList = [...state.projectList, { ...data, id }];
    },
    setTaskAdd: (state, action) => {
      const { id, task } = action.payload;
      const projects = state.projectList;

      const updatedList = projects.map((el) => {
        if (el?.id == id) {
          let updatedTask = [];

          if (el.task) {
            updatedTask = [...el.task, task];
          } else {
            updatedTask = [task];
          }
          return { ...el, task: updatedTask };
        }
        return el;
      });

      state.projectList = updatedList;
    },

    removeTask: (state, action) => {
      const { id, taskIndex } = action.payload;
      const projects = state.projectList;

      const updatedList = projects.map((el) => {
        if (el?.id == id) {
          const task = el.task;
          const newTask = task.filter((_, index) => index != taskIndex);

          return { ...el, task: newTask };
        }
        return el;
      });

      state.projectList = updatedList;
    },
    removeProject: (state, action) => {
      const projects = state.projectList?.filter(
        (project) => project?.id != action?.payload
      );
      state.projectList = projects;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddProject, setTaskAdd, removeTask, removeProject } =
  projectSlice.actions;

export default projectSlice.reducer;
