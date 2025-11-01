import "./OrdersPage.css";
import { Header } from "../../components/Header";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{(order.totalCostCents / 100).toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    const product = orderProduct.product ?? {};
                    const productId = product.id ?? orderProduct.productId;
                    const addToCart = async () => {
                      await axios.post("/api/cart-items", {
                        productId: product.id,
                        quantity: orderProduct.quantity,
                      });
                      await loadCart();
                    };
                    return (
                      <Fragment key={`${order.id}-${productId}`}>
                        <div className="product-image-container">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-details">
                          <div className="product-name">{product.name}</div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span
                              className="buy-again-message"
                              onClick={addToCart}
                            >
                              Add to Cart
                            </span>
                          </button>
                        </div>
                        <div className="product-actions">
                          <Link
                            to={`/tracking/${order.id}/${productId}`}
                            className="track-package-button button-secondary"
                          >
                            Track package
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
