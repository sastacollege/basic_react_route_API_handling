//IMPORT
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, NavLink, useParams } from "react-router-dom";
import "./App.css";

//ALL POST
function AllPost() {
  //STORE DATA
  let [posts, setPosts] = useState(null);

  //GET ALL THE POST
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => setPosts(response.data));
  }, []);

  //IF POST DOES NOT EXIST
  if (!posts) return <h1 style={{ fontSize: "62px", fontFamily: "arial", margin: "0 auto" }}>Loading.........</h1>;

  //RENDER ALL THE POST WITH THE TITLE

  return (
    <div className="mainContainer">
      {posts.map((post) => {
        return (
          <NavLink to={`/posts/${post.id}`} key={post.id} className={"navLink"}>
            {post.title}
          </NavLink>
        );
      })}
    </div>
  );
}

//SINGLE POST
function OnePost() {
  let [post, setPost] = useState(null);

  let params = useParams();
  let postId = params.id;

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((response) => setPost(response.data));
  }, []);

  if (!post) return <h1 style={{ fontSize: "62px", fontFamily: "arial", margin: "0 auto" }}>Loading.........</h1>;

  return (
    <div className="postMain">
      <div className="postContainer">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPost />} />
        <Route path="/posts/:id" element={<OnePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
