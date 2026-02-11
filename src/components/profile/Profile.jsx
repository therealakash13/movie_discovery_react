import { useAuth } from "../../hooks/useAuth";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <div className="text-white p-10">Not logged in</div>;

  return (
    <div className="dark:bg-bg-dark dark:text-text-dark p-10">
      <ProfileHeader user={user.providerData[0]} />
      <ProfileDetails
        user={user}
        uid={user.uid}
        isVerified={user.emailVerified}
        metaData={user.metadata}
        provider={user.providerData[0]?.providerId}
      />
    </div>
  );
}
