import API from "../api/axios";

export async function logoutUser() {
  try {
    await API.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  }
}
