import { auth, currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();
  console.log(userId, user);

  return <div></div>;
};

export default page;
