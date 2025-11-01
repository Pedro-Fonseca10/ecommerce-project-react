import "./TrackingPage.css";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getTranckingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    getTranckingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const matchingProduct = order.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs =
    matchingProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  // const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const timePassedMs = 0.3 * totalDeliveryTimeMs;
  let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 100;
  deliveryProgress = deliveryProgress > 100 ? 100 : deliveryProgress;

  const isPreparing = deliveryProgress < 33;
  const isShipped = deliveryProgress < 100 && deliveryProgress >= 33;
  const isDelivered = deliveryProgress === 100;

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            {(deliveryProgress === 100 && "Delivery on ") || "Arriving on "}
            {dayjs(matchingProduct.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D"
            )}
          </div>

          <div className="product-info">{matchingProduct.product.name}</div>

          <div className="product-info">
            Quantity: {matchingProduct.quantity}
          </div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                isPreparing ? "current-status" : ""
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${isShipped ? "current-status" : ""}`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                isDelivered ? "current-status" : ""
              }`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
