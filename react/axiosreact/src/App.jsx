import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import api from "./api/posts";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts/");
      setPosts(response.data);
      console.log(response.data);
      ///axios automatically creates json  and catches errors
    } catch (err) {
      if (err.response) {
        ////not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      } else {
        console.log(err.message);
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const newPost = {
    title: "great title",
    datetime: "dateeee",
    body: "this is a body",
  };

  const updatedPost = {
    body: "still a body",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", newPost);
      fetchPosts();
    } catch (error) {
      
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`,updatedPost);
      fetchPosts();
    } catch (error) {}
  };

  const handleEdit = async (id) => {
    try {
    await api.patch(`/posts/${id}`,updatedPost)
    fetchPosts()
    } catch (error) {
      
    }
  }
  return (
    <div className="App">
      {posts.map((x) => (
        <div key={x.id}>
          <h1>{x.title}</h1>
          <h1>{x.datetime}</h1>
          <h1>{x.body}</h1>
          <button onClick={() => handleDelete(x.id)}>delete this post</button>
                <button onClick={() => handleEdit(x.id)}>edit</button>
          <hr />
        </div>
      ))}
      <button onClick={(e) => handleSubmit(e)}>post</button>
    </div>
  );
}

export default App;
