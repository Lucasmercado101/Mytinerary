import { useParams } from "react-router-dom";

interface urlParams {
  id: string;
}

function City() {
  const { id } = useParams<urlParams>();

  return (
    <div>
      <pre>{JSON.stringify(id, null, 2)}</pre>
    </div>
  );
}

export default City;
