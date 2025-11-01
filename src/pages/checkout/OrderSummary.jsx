import { CartItemDetails } from "./CartItemsDetail";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <CartItemDetails
              key={cartItem.productId}
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          );
        })}
    </div>
  );
}
