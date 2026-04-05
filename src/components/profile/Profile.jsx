import { useAuth } from "../../hooks/useAuth";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <div className="text-white p-10">Not logged in</div>;

  return (
    <div className="dark:bg-bg-dark dark:text-text-dark p-10">
      <ProfileHeader
        username={user.username}
        photoURL={user.photoURL}
        email={user.email}
      />
      {/* <ProfileDetails user={user} /> */}
      {/* instead of profile details show watch list an more */}
    </div>
  );
}
