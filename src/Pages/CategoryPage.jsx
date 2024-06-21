import React from "react";
import { useNavigate, useParams } from "react-router";

function CategoryPage() {
  const { mohit } = useParams();

  console.log('mohit',mohit);
  return (
    <div>
      CategoryPage {mohit}
      <button
        className="bg-black text-white border rounded"
        onClick={() => navigate("/")}
      >
        back to home
      </button>
    </div>
  );
}

export default CategoryPage;
