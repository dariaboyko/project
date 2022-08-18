import { Route, Routes} from "react-router-dom";
function Info(){
    return <>hello</>
}
function AdminOrderInfo({ orders }) {
  return (
    <Routes>
      {orders&&orders.data.OrderFind.map((order) => {
        return (
          <Route
            path={order._id}
            element={<Info/>}
            key={"route" + order._id}
          />
        );
      })}
    </Routes>
  );
}
export default AdminOrderInfo;
