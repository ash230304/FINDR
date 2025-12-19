import axios from "axios";

const API = "http://localhost:5000/api/auth"; // change if needed

export const deleteUser = async (userId, token) => {
  try {
    const res = await axios.delete(`${API}/delete/${userId}`, {
      headers: {
        "x-auth-token": token,         // OR Authorization: Bearer
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { msg: "Something went wrong" };
  }
};
