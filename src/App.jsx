import AddProject from "./component/AddProject";
import ErrorModal from "./component/ErrorModal.jsx";
import NoProject from "./component/NoProject";

function App() {
  return (
    <>
     <main className="h-screen my-8 flex gap-8" >
      
          <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h1 className="mb-8 font-bold uppercase md:text-xl text-stone-200"> Your Projects</h1>


          </aside>

          {/* <NoProject/> */}


      <AddProject/>

      {/* <ErrorModal/> */}





       </main>
    </>
  );
}

export default App;
