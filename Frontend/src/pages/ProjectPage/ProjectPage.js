import React from "react";
import { useParams } from "react-router-dom"; // Correct import

function ProjectPage() {
  const { code } = useParams(); // Access the project code from the route parameter
  console.log(code);
  // Fetch project details based on the project code and display them

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project Code: {code}</p>
    </div>
  );
}

export default ProjectPage;
