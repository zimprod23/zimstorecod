import React from "react";
import { IconButton } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";

function UserCardBlock(props) {
  const renderItems = () =>
    props.products &&
    props.products.map((product) => (
      <tr key={product._id}>
        <td>
          <img style={{ width: "70px" }} alt="product" src={product.overview} />
        </td>
        <td>
          {product.quantity} EA
          <div style={{ float: "right" }}>
            <IconButton
              color="primary"
              aria-label="increment product Quantity"
              onClick={() => props.incrementQ(product._id)}
              disabled={
                product.stock - (product.sold + product.quantity) <= 0
                  ? true
                  : false
              }
            >
              <AddCircle fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() =>
                product.quantity > 1
                  ? props.decrementQ(product._id)
                  : props.removeItem(product._id)
              }
            >
              <RemoveCircle fontSize="small" />
            </IconButton>
          </div>
        </td>
        <td> {product.price} MAD</td>
        <td>
          <button onClick={() => props.removeItem(product._id)}>إزالة </button>{" "}
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>صورة المنتج</th>
            <th>كمية المنتج</th>
            <th>سعر المنتج</th>
            <th>إزالة من عربة التسوق</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
/**
 * <IconButton color="primary" aria-label="add to shopping cart">
  <AddShoppingCartIcon />
</IconButton>
 */
