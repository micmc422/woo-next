import { useMutation } from "@apollo/client";
import { FaTrashAlt } from "react-icons/fa";
import REMOVE_COUPON from "../../../mutations/remove-coupon";

const CouponsList = ({ coupons, getCart }) => {
  return (
    <div className={`flex flex-row flex-wrap`}>
      {coupons.length &&
        coupons.map((coupon) => (
          <CouponItem coupon={coupon} getCart={getCart} />
        ))}
    </div>
  );
};

const CouponItem = ({ coupon, getCart }) => {
  const [
    removeCoupon,
    { data: removeResponse, loading: removeLoading },
  ] = useMutation(REMOVE_COUPON, {
    variables: {
      input: { codes: coupon.code },
    },
    onCompleted: async () => {
      await getCart();
    },
    onError: (error) => {
      if (error) {
        console.log(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });

  return (
    <div
      className="flex items-center px-2 py-1 space-x-1 text-white bg-green-500 rounded-full"
      onClick={removeCoupon}
    >
      <span>{coupon.code}</span> <FaTrashAlt />
    </div>
  );
};
export default CouponsList;
