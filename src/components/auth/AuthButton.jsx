import { Google, Logout } from "../../assets/SVGComponents";
import { useAuth } from "../../hooks/useAuth";

export const LoginButton = () => {
  const { googleLogin, loading } = useAuth();

  if (loading) return null;

  return (
    <button
      onClick={googleLogin}
      className="flex gap-3 items-center dark:bg-text-dark dark:text-text px-5 py-3 rounded font-bold cursor-pointer bg-bg-dark text-text-dark"
    >
      <Google />
      Sign in with Google
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex gap-3 items-center px-5 py-3 rounded font-bold bg-red-500 text-text-dark cursor-pointer"
    >
      <Logout />
      Logout
    </button>
  );
};
