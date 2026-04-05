// Signup.jsx

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);
      dispatch(setCredentials({ token: data.token, user: data.user }));
      localStorage.setItem("token", data.token);
      navigate("/analyze");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Create your account</h2>
        <p className="text-gray-500 mb-6 text-sm">Start optimizing your resume today</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <input type="text" placeholder="Full Name"
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email"
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password"
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <button onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            Create Account
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}