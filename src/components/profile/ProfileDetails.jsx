function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export default function ProfileDetails({
  uid,
  metaData,
  isVerified,
  provider,
}) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 text-text-dark dark:text-text">
      <div className="bg-secondary p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Account Info</h2>

        <p className="dark:text-gray-800 text-gray-300 text-lg font-medium">
          User ID
        </p>
        <p className="mb-3 break-all text-md font-medium">{uid}</p>

        <p className="dark:text-gray-800 text-gray-300 text-lg font-medium">
          Email Verified
        </p>
        <p className="mb-3 text-md font-medium">{isVerified ? "Yes" : "No"}</p>

        <p className="dark:text-gray-800 text-gray-300 text-lg font-medium">
          Provider
        </p>
        <p className="text-md font-medium">{provider}</p>
      </div>

      <div className="bg-secondary p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Activity</h2>

        <p className="dark:text-gray-800 text-gray-300 text-lg font-medium">
          Account Created
        </p>
        <p className="mb-3 text-md font-medium">
          {formatDate(metaData.creationTime)}
        </p>

        <p className="dark:text-gray-800 text-gray-300 text-lg font-medium">
          Last Login
        </p>
        <p className="text-md font-medium">
          {formatDate(metaData.lastSignInTime)}
        </p>
      </div>
    </div>
  );
}
