import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import { getPost } from "../../../Services/Doctor/Post/PostRoute";
import toast from "react-hot-toast";

const HomeDoctor = () => {
  const [posts, setPosts] = useState([]);
  const [doctor, setDoctor] = useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPost();
        setDoctor(res.data.doctor);
        setPosts(res.data.posts);
      } catch (error) {
        console.log("Error in fetchPosts: ", error);
        toast.error(error.response.data.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Dashboard posts={posts} doctor={doctor} />
    </div>
  );
};

export default HomeDoctor;
