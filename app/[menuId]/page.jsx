import SingleMenu from "@/components/Owner/SingleMenu";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default async function MenuPage({ params }) {
  const { menuId } = params;
  return (
    <>
      <div>MenuPage</div>
      <Suspense fallback={<Loading />}>
        <SingleMenu menuId={menuId} />
      </Suspense>
    </>
  );
}
