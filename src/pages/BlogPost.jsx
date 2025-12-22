import { useParams } from "react-router-dom";
import Background from "../components/Background";
import Navbar from "../components/Navbar";

function BlogPost() {
  const { id } = useParams();

  return (
    <>
      <Background />
      <Navbar />
    </>
  );
}

export default BlogPost;
