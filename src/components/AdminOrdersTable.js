import { Link, useLocation } from "react-router-dom";
import AdminOrderInfo from "./AdminOrderInfo";
function AdminOrdersTable({ orders }) {
  const location = useLocation()
  return orders ? (
    <>
      <table>
        <tbody>
          <tr>
            <th>order id</th>
            <th>owner</th>
            <th>goods amount</th>
            <th>order total</th>
          </tr>
          {orders.data.OrderFind.map((order) => {
            return (
              <tr key={"order" + order._id}>
                <td>{order._id}</td>
                <td>{order.owner ? order.owner.login : "----"}</td>
                <td>
                  {order.orderGoods.length > 0 ? (
                    <Link to={location.pathname + "/"+order._id}>
                      {order.orderGoods.length}
                    </Link>
                  ) : (
                    order.orderGoods.length
                  )}
                </td>
                <td>{order.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AdminOrderInfo orders={orders} />
    </>
  ) : (
    <>Wait...</>
  );
}
export default AdminOrdersTable;
