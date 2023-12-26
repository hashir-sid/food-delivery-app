import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const { item } = props;
  let data = useCart();

  let navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();

  let options = item.options[0];
  let priceOptions = Object.keys(options);

  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    let food = [];

    for (const item_ of data) {
      if (item_.id === item._id) {
        food = item_;
        break;
      }
    }

    console.log(food);
    console.log(new Date());

    if (food.size === size) {
      await dispatch({
        type: "UPDATE",
        id: item._id,
        price: finalPrice,
        qty: qty,
      });

      return;
    } else if (food.size !== size) {
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: item.img,
      });

      console.log("Size different so simply ADD one more to the list");
      return;
    }

    await dispatch({
      type: "ADD",
      id: item._id,
      name: item.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]); //This is where Price is changing

  return (
    <div>
      <div
        className="card mt-3 mx-5"
        style={{ width: "18rem", maxHeight: "30rem" }}
      >
        <img
          src={item.img}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text"></p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success text-dark rounded"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success text-dark rounded"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <hr />
            <div className="d-inline fs-5">Total Price Rs. {finalPrice}/-</div>
            <hr />
            <button
              className={`btn btn-success justify-content-center`}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
