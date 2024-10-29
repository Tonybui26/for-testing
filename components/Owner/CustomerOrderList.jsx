import { CustomerListView } from "@/app/[menuId]/customer-order/clientComponents";

const getCustomerOrders = async (menuId, status) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(
      `${baseUrl}/api/menu/get-orders?menuId=${menuId}&status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
        // next: { revalidate: 0 }, // Disable any caching at the framework level
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data orders");
    }
    const orders_data = await res.json();
    return orders_data.orders;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export default async function CustomerOrderList({ menuId }) {
  const orders = await getCustomerOrders(menuId);
  console.log("check orders", orders);
  return (
    <div className="h-[31.25rem] overflow-y-scroll rounded-xl bg-[#F7F7F7]">
      <div className="h-full overflow-x-auto">
        <table className="table table-zebra table-pin-rows">
          {/* head */}
          <thead>
            <tr className="bg-gray-200 text-sm text-black-neutral">
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
            </tr>
          </thead>
          <CustomerListView orders={orders} menuId={menuId} />
        </table>
      </div>
    </div>
  );
}
