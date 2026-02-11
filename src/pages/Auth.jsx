import { LoginButton, LogoutButton } from "../components/AuthButton";
import Profile from "../components/profile/Profile";
import { useAuth } from "../hooks/useAuth";

export default function Auth() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center gap-3">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-evenly py-5">
      <Profile />
      <LogoutButton />
    </div>
  );
}
