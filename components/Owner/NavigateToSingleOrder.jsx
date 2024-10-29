"use client";

import { useRouter } from "next/navigation";
import { useSingleOrderContext } from "../context/SingleOrderContext";

export default function NavigateToSingleOrder({ order, menuId }) {
  const router = useRouter();
  const { setSelectCustomerOrder } = useSingleOrderContext();
  const handleNavigateToSingleOrder = () => {
    console.log("Click on view - could add waiting spinner here");

    setSelectCustomerOrder(order);
    router.push(`/${menuId}/customer-order/${order._id}`);
  };
  return (
    <div onClick={handleNavigateToSingleOrder} className="cursor-pointer">
      <span className="text-brand-red">View</span>
    </div>
  );
}
