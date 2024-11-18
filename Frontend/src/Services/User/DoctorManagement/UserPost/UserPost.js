import { api } from "../../../api.js";

export const getAllDoctorPosts = async () => {
  try {
    const response = await api.get("/api/user/doctor-post", {
      withCredentials: true,
    });
    const userId = response.data.userId;

    const res =
      response.data.posts.length > 0 &&
      response.data.posts.map((post) => {
        const milliseconds = new Date() - new Date(post.createdAt);
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        let timeAgo = "";

        if (years > 0) {
          timeAgo = `${years} year${years > 1 ? "s" : ""} ago`;
        } else if (months > 0) {
          timeAgo = `${months} month${months > 1 ? "s" : ""} ago`;
        } else if (days > 0) {
          timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
          timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (minutes > 0) {
          timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else {
          timeAgo = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
        }

        return {
          ...post,
          timeAgo,
        };
      });
    return { res, userId };
  } catch (error) {
    throw error;
  }
};

export const likeDoctorPost = async (postId) => {
  try {
    const response = await api.post(
      "/api/user/doctor-post/like-post",
      {
        postId,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const dislikeDoctorPost = async (postId) => {
  try {
    const response = await api.post(
      "/api/user/doctor-post/unlike-post",
      {
        postId,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFavPosts = async () => {
  try {
    const response = await api.get("/api/user/doctor-post/get-fav-posts", {
      withCredentials: true,
    });
    const userId = response.data.userId;
    return { res: response, userId };
  } catch (error) {
    throw error;
  }
};
