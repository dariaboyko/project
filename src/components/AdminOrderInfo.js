import { Route, Routes} from "react-router-dom";
import actionPromise from "./ActionPromise";
import store from "./Store";
function Info({ order }) {
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
  const goods = order.orderGoods;
  return (
    <table>
      <tbody>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>amount</th>
          <th>price</th>
          <th>delete</th>
        </tr>
        {goods.map((good) => {
          console.log(good)
          return (
            good.good && (
              <tr key={"goodOrder" + Math.random()}>
                <td>{good.good._id && good.good._id}</td>
                <td>{good.good.name}</td>
                <td>{good.count}</td>
                <td>{good.good.price}</td>
                <td>
                  <button
                    onClick={() => {
                      store.dispatch(
                        actionPromise(
                          "delete",
                          gql(
                            "http://shop-roles.node.ed.asmer.org.ua/graphql",
                            `mutation delete($orderGood: OrderGoodInput) {
                              OrderGoodDelete(orderGood: $orderGood) {
                                _id
                              }
                            }`,
                            {
                              orderGood: {
                                _id: good._id,
                                count: good.count,
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
            )
          );
        })}
      </tbody>
    </table>
  );
}
function AdminOrderInfo({ orders }) {
  return (
    <Routes>
      {orders&&orders.data.OrderFind.map((order) => {
        return (
          <Route
            path={order._id}
            element={<Info order={order}/>}
            key={"route" + order._id}
          />
        );
      })}
    </Routes>
  );
}
export default AdminOrderInfo;
