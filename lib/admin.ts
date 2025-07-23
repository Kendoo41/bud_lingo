import { auth } from "@clerk/nextjs/server";

const allowedIds = [
    "user_2zS4iliiCh9HbaY2H5d0uhACu34",
];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};
