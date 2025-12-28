import { useParams } from "react-router-dom";

function PropertyPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Property Details Page</h1>
      <p>Property ID from URL: {id}</p>
    </div>
  );
}

export default PropertyPage;
