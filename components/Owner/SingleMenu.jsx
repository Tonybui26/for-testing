const getMenuById = async (menuId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Access the environment variable
    // const res = await fetch(`${baseUrl}/api/get-menu/${menuId}`, {
    //   cache: "no-store",
    // });
    const res = await fetch(`${baseUrl}/api/get-menu-only/${menuId}`);
    if (!res.ok) throw new Error("Failed to fetch menu");
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const NotFoundPage = () => (
  <div className="flex h-screen items-center justify-center">
    <h1>404 - Menu Not Found</h1>
  </div>
);

export default async function SingleMenu({ menuId }) {
  // const session = await getServerSession(NextAuthOptions);
  const menuData = await getMenuById(menuId);
  const menu = menuData?.menu;
  // create sample delay await
  // await new Promise((resolve) => setTimeout(resolve, 7000));
  // let role = "customer";
  // // Check menu ownership
  // if (menu && menu.owner._id == session?.user.id) {
  //   console.log("Menu owner");
  //   role = "owner";
  // }

  if (!menu) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>PageMenuContent</h1>
    </>
  );
}
