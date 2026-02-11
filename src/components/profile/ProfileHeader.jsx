export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-6 border-b-2 border-gray-700 pb-6">
      <img
        src={user.photoURL}
        alt="profile"
        className="w-24 h-24 rounded-full outline-4 border-2 border-transparent dark:outline-primary-dark outline-primary"
      />

      <div>
        <h1 className="text-4xl font-bold">{user.displayName}</h1>
        <p className="text-gray-400 font-semibold">{user.email}</p>
      </div>
    </div>
  );
}
