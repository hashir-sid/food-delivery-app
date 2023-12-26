import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItems(response[0]);
    setFoodCat(response[1]);
    console.log("res0: ", foodItems);
    console.log("res1: ", foodCat);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.map((data) => {
          return (
            <div className="row mb-3">
              <div
                key={data.id}
                className="fs-3 m-3 text-white d-flex justify-content-center"
              >
                {data.category}
              </div>
              <hr
                id="hr-success"
                style={{
                  height: "4px",
                  backgroundImage:
                    "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                }}
              />
              {foodItems
                .filter(
                  (items) =>
                    items.category === data.category &&
                    items.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filterItem) => {
                  return (
                    <div
                      key={filterItem.id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card item={filterItem} />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
