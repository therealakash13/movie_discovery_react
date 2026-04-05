import { LoginButton, LogoutButton } from "../components/auth/AuthButton";
import { SignupForm } from "../components/auth/SignupForm";
import Profile from "../components/profile/Profile";
import { useAuth } from "../hooks/useAuth";

export default function Auth() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <LoginButton />
        <span>OR</span>
        <SignupForm />
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
