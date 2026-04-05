import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export const SignupForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(form.email, form.password, form.username);

      // ✅ redirect after success
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto p-6 dark:bg-text-dark dark:text-text bg-bg-dark text-text-dark rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Create Account</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-3 rounded bg-background border border-gray-600"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 rounded bg-background border border-gray-600"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 rounded bg-background border border-gray-600"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !form.email || !form.password || !form.username}
        className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
};
