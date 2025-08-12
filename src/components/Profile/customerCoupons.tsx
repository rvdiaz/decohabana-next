import { ICustomer } from "@/interfaces/customer";

export const CustomerCoupons = ({ customer }: { customer: ICustomer }) => {
  const { welcomeCoupon } = customer;

  if (!welcomeCoupon) {
    return <div className="text-gray-400 p-4 max-w-md">No active coupons</div>;
  }

  return (
    <div className="customer-coupons p-4 border border-gray-700 rounded max-w-md bg-gray-800">
      <h2 className="text-lg font-semibold mb-2 text-white">Active Coupons</h2>
      <div className="coupon border border-yellow-600 p-3 rounded mb-3 ">
        <p className="font-medium text-yellow-400">
          {welcomeCoupon.description}
        </p>
        <p className="text-yellow-300">
          Code:{" "}
          <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300 font-mono">
            {welcomeCoupon.code}
          </code>
        </p>
      </div>
    </div>
  );
};
