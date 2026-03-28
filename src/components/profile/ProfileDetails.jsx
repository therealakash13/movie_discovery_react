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
        <h2 className="text-xl font-bold mb-4 text-text-dark">Account Info</h2>

        <p className="dark:text-text-dark/70 text-gray-300 text-lg font-medium">
          User ID
        </p>
        <p className="mb-3 break-all text-md font-medium dark:bg-bg-dark bg-bg dark:text-text-dark text-text py-2 px-5 rounded-full">{uid}</p>

        <p className="dark:text-text-dark/70 text-gray-300 text-lg font-medium">
          Email Verified
        </p>
        <p className="mb-3 text-md font-medium dark:bg-bg-dark bg-bg dark:text-text-dark text-text py-2 px-5 rounded-full">{isVerified ? "Yes" : "No"}</p>

        <p className="dark:text-text-dark/70 text-gray-300 text-lg font-medium">
          Provider
        </p>
        <p className="text-md font-medium dark:bg-bg-dark bg-bg dark:text-text-dark text-text py-2 px-5 rounded-full">{provider}</p>
      </div>

      <div className="bg-secondary p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-text-dark">Activity</h2>

        <p className="dark:text-text-dark/70 text-gray-300 text-lg font-medium">
          Account Created
        </p>
        <p className="mb-3 text-md font-medium dark:bg-bg-dark bg-bg dark:text-text-dark text-text py-2 px-5 rounded-full">
          {formatDate(metaData.creationTime)}
        </p>

        <p className="dark:text-text-dark/70 text-gray-300 text-lg font-medium">
          Last Login
        </p>
        <p className="text-md font-medium dark:bg-bg-dark bg-bg dark:text-text-dark text-text py-2 px-5 rounded-full">
          {formatDate(metaData.lastSignInTime)}
        </p>
      </div>
    </div>
  );
}
