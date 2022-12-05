//@ts-check
import React, { useContext } from "react";
import styled from "styled-components";
import { ApiProductContext } from "../helper/ContainerContext";
import Swal from "sweetalert2";
import AOS from "aos";
import SpinnerLoading from "./widgets/SppinerLoading";
import "aos/dist/aos.css";
AOS.init();

function Cart() {
  const { ArrayCart } = useContext(ApiProductContext);
  const RenderProductCard = () => {
    if (ArrayCart) {
      return ArrayCart.map((ele) => {
        return (
          <li key={ele.id} data-aos="fade-right" data-aos-duration="1000">
            <div>
              <figure>
                <img src={ele.img} alt="" height={"100"} width={"100"} />
              </figure>
            </div>
            <div>
              <p>{ele.title}</p>
            </div>
            <div>
              <p>Precio: $ {ele.price * ele.count}</p>
            </div>
            <div>Cant: ({ele.count})</div>
          </li>
        );
      });
    } else {
      return <SpinnerLoading />;
    }
  };

  const AlertBuyComplete = () => {
    Swal.fire({
      icon: "success",
      title: "Gracias por tu compra",
      backdrop: "white",
      text: "Se enviara a tu hotmail mas informacion",
    });
  };
  return (
    <ContCart>
      <div className="cart">
        <div className="cart__products">
          <nav>
            <ul className="cart__products_list">{RenderProductCard()}</ul>
          </nav>
        </div>
        <div className="cart__button">
          <div>
            <button onClick={() => AlertBuyComplete()}>Finalizar compra</button>
          </div>
          <div>
            <p>$ 20.000</p>
          </div>
        </div>
      </div>
    </ContCart>
  );
}
const ContCart = styled.div`
  height: 85vh;
  width: 100%;
  .cart {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .cart__products {
      display: flex;
      flex-grow: 5;
      justify-content: center;
      overflow: scroll;
      nav {
        width: 100%;
        .cart__products_list {
          overflow: hidden;
          display: flex;
          padding: 10px;
          gap: 15px;
          flex-direction: column;
          li {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            div {
              flex-grow: 1;
              min-width: 25%;
              display: flex;
              align-items: center;
              font-size: 12px;
              p {
                text-align: center;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
              }
              figure {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 3px;
                img {
                  border-radius: 20%;
                  border: 1px solid black;
                }
              }
            }
          }
        }
      }
    }
    .cart__button {
      min-height: 10%;
      flex-grow: 1;
      border-radius: 5%;
      background-color: #2c3333;
      display: flex;
      div {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          justify-content: center;
          height: 100%;
          width: 100%;
          display: flex;
          color: White;
          align-items: center;
        }
        button {
          padding: 4px;
          background-color: white;
          border: none;
          min-width: 140px;
        }
      }
    }
  }
`;
export default Cart;
