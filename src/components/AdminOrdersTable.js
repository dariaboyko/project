import { Link, useLocation } from "react-router-dom";
import AdminOrderInfo from "./AdminOrderInfo";
import actionPromise from "./ActionPromise";
import store from "./Store";
function AdminOrdersTable({ orders }) {
  const location = useLocation()
  let gql = (url, query, variables) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => console.log(res.json()));
  return orders && orders.data.OrderFind ? (
    <>
      <table>
        <tbody>
          <tr>
            <th>order id</th>
            <th>owner</th>
            <th>goods amount</th>
            <th>order total</th>
            <th>delete</th>
          </tr>
          {orders.data.OrderFind.map((order) => {
            return (
              <tr key={"order" + order._id}>
                <td>{order._id}</td>
                <td>{order.owner ? order.owner.login : "----"}</td>
                <td>
                  {order.orderGoods.length > 0 ? (
                    <Link to={location.pathname + "/" + order._id}>
                      {order.orderGoods.length}
                    </Link>
                  ) : (
                    order.orderGoods.length
                  )}
                </td>
                <td>{order.total}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log(order.orderGoods);
                      store.dispatch(
                        actionPromise(
                          "delete",
                          gql(
                            "http://shop-roles.node.ed.asmer.org.ua/graphql",
                            `mutation delete($order: OrderInput) {
                              OrderDelete(order: $order) {
                                owner{login}
                              }
                            }`,
                            {
                              order: {
                                _id: order._id,
                                orderGoods: order.orderGoods.map((g)=>{return { _id: g._id, count: g.count, good: {_id:g.good._id}};}),
                              },
                            }
                          )
                        )
                      );
                    }}
                  >
                    X
                  </button>
                </td>
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
