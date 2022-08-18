import actionPromise from "./ActionPromise";
import store from "./Store";
import { connect } from "react-redux";
import AdminOrdersTable from "./AdminOrdersTable";
import AdminOrderInfo from "./AdminOrderInfo";
 import { useLocation } from "react-router-dom";

function AdminOrders() {
  let gql = (url, query, variables) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());
  store.dispatch(
    actionPromise(
      "orders",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `query ordersFind($q: String) {
            OrderFind(query: $q) {
                orderGoods{good {
                _id
                createdAt
                name
                description
                price
                }},owner {
                _id
                createdAt
                login
                nick
                }
                total
                _id
            }
            }`,
        { q: JSON.stringify([{}]) }
      )
    )
  );
        const AdminOrdersList = connect((state) => ({
          orders: state.promise.orders.payload,
        }))(AdminOrdersTable);
        const CAdminOrderInfo = connect((state) => ({
          orders: state.promise.orders.payload,
        }))(AdminOrderInfo);
          const location = useLocation();
          if (
            location.pathname === "/editOrders" ||
            location.pathname === "/editOrders/"
          ) {
            return <AdminOrdersList />;
          } else {
            return <CAdminOrderInfo />;
          }
}
export default AdminOrders;
