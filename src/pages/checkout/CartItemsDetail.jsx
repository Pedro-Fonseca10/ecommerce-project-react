import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";
import { DeliveryOptions } from "./DeliveryOptions";

export function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (update) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };

  const cancelUpdateQuantity = async () => {
    await loadCart();
    setUpdate(false);
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {(cartItem.product.priceCents / 100).toFixed(2)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:
              {update && (
                <input
                  className="quantity-input"
                  type="text"
                  value={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      updateQuantity();
                    }
                    if (event.key === "Escape") {
                      cancelUpdateQuantity();
                    }
                  }}
                />
              )}
              {!update && (
                <span className="quantity-label">{cartItem.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateQuantity}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>
        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}
