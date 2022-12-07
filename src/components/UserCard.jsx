import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PaperPlane from "./widgets/PlanePaper";
import SppinerLoading from "./widgets/SppinerLoading";
import { ApiProductContext } from "../helper/ContainerContext";
import CartItem from "./CartItem";
import UserCardCloseWidget from "./UserCardCloseWidget";
function UserCard({ Usuario }) {
  const { User } = useContext(ApiProductContext);
  const { name, user, phone, img, dni } = Usuario[0];
  const [Buys, SetBuys] = useState(null);
  const [Flip, SetFlip] = useState(false);
  useEffect(() => {
    if (User) {
      SetBuys(User[0].checkout);
    }
  }, [User]);
  const RenderOrdersId = () => {
    if (Buys) {
      return Buys.map((ele) => {
        return (
          <li className="list_orders" key={ele.OrderId}>
            <div>{ele.Date}</div>
            <div>{ele.OrderId}</div>
            <button
              id={ele.OrderId}
              onClick={() => {
                SetFlip([!Flip, ele.OrderId]);
              }}
            >
              Front
            </button>
          </li>
        );
      });
    } else {
      return <div>Cargando..</div>;
    }
  };
  const RenderOrderBack = (e) => {
    if (Flip[1]) {
      const FilterProductsOrder = Buys.find((ele) => ele.OrderId === Flip[1]);
      return (
        <ItemsHistory>
          <div className="Details">Detalles</div>
          <CartItem items={FilterProductsOrder.Produtcs} />
        </ItemsHistory>
      );
    } else {
      return (
        <div className="Charge">
          <SppinerLoading />
        </div>
      );
    }
  };

  return (
    <ContUser>
      <div className="ContCard">
        <div className={Flip[0] ? `FlipCard Flip` : "FlipCard"}>
          <div className="Front">
            <div className="ContUser__profile">
              <div className="ContUser__profile_img">
                {img ? (
                  <img src={img} alt="product" />
                ) : (
                  <img src="https://i.imgur.com/9zz7ubU.jpg" alt="noimage" />
                )}
              </div>
              <div className="ContUser__profile_nombre">
                <h2>{name}</h2>
                <p className="">Nombre</p>
              </div>
            </div>
            <ul className="ContUser__description">
              <li>
                <div>Phone</div>
                <i>{phone}</i>
              </li>
              <li>
                <div>DNI</div>
                <i>{dni}</i>
              </li>
              <li>
                <div>Email</div>
                <i>alexisjrojas</i>
              </li>
              <li>
                <div>Usuario</div>
                <i>{user}</i>
                <i></i>
              </li>
            </ul>
            <nav className="ContUser__orders">
              <ul className="CountUser__orders-lista">
                <RenderOrdersId />
              </ul>
            </nav>
            <div className="buttons_info">
              <div>
                <span>
                  <PaperPlane />
                </span>
              </div>
              <div>
                <span>Buys</span>
              </div>
              <div>
                <span>span</span>
              </div>
            </div>
          </div>
          <div className="Back">
            <div className="UserCardCloseWidget" onClick={() => SetFlip(!Flip)}>
              <UserCardCloseWidget />
            </div>
            <RenderOrderBack />
          </div>
        </div>
      </div>
    </ContUser>
  );
}
const ContUser = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .Flip {
    transform: rotateY(-180deg);
  }
  .ContCard {
    height: 100%;
    width: 100%;
    display: Flex;
    justify-content: center;
    align-items: center;
    display: flex;
    .FlipCard {
      height: 95%;
      width: 95%;
      position: relative;
      transition: all 0.7s ease-in-out;
      transform-style: preserve-3d;
      .Front,
      .Back {
        backface-visibility: hidden;
        position: absolute;
        height: 100%;
        width: 100%;
        -webkit-backdrop-filter: blur(15px);
        backdrop-filter: blur(15px);
        border-radius: 10px;
      }
      .Front {
        background-color: rgba(243, 243, 243, 0.1);
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-columns: 1fr;
        grid-template-rows: 0.7fr 0.4fr 2fr 0.3fr;
        gap: 5px 0px;
        color: black;
        .ContUser__profile {
          padding: 10px;
          display: grid;
          grid-auto-columns: 1fr;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          gap: 0px 0px;
          border-bottom: 1px solid black;
          .ContUser__profile_img {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              height: 150px;
              width: 150px;
              border-radius: 50%;
              border: 4px outset #f3efe0;
              box-shadow: -1px 1px 10px 3px black;
            }
          }
          .ContUser__profile_nombre {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding-left: 5px;
            p {
              display: inline;
              color: #222222;
            }
            h2 {
              font-weight: 500;
              color: #434242;
              border-bottom: 1px solid;
            }
          }
        }
        .ContUser__description {
          height: 80%;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-column-gap: 0px;
          grid-row-gap: 2px;
          li {
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            width: 100%;
            color: transparent;
            -webkit-text-stroke: 0.8px #222222;
            gap: 2px;
            i {
              font-size: 16px;
              font-weight: 500;
              letter-spacing: 1px;
              color: white;
            }
          }
        }
        .ContUser__orders {
          height: 100%;
          .CountUser__orders-lista {
            display: flex;
            height: 100%;
            flex-direction: column;
            gap: 10px;
            .list_orders {
              flex-grow: 1;
              display: flex;
              padding: 2px;
              -webkit-backdrop-filter: blur(15px);
              backdrop-filter: blur(2px);
              background-color: rgba(207, 245, 231, 0.4);
              div {
                display: flex;
                flex-grow: 1;
              }
            }
          }
        }
        .buttons_info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 1fr;
          grid-column-gap: 0px;
          grid-row-gap: 0px;

          div {
            flex-grow: 1;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;
          }
        }
      }
      .Back {
        background-color: rgba(243, 243, 243, 0.3);
        transform: rotateY(-180deg);
        .UserCardCloseWidget {
          position: absolute;
          right: 0;
          font-size: 1.6em;
          padding: 10px;
        }
      }
    }
  }
`;

const ItemsHistory = styled.ul`
  display: flex;
  height: 100%;
  padding: 10px;
  list-style: none;
  flex-direction: column;
  .Details {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    font-size: 1.5em;
    font-weight: 200;
  }
  .Charge {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  li {
    color: black;
    margin-bottom: 1em;
    gap: 1em;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(2px);
    background-color: rgba(207, 245, 231, 0.7);
    border-radius: 5px;
    div {
      gap: 10px;
      font-size: 0.7em;
      text-align: center;
      figure {
        img {
          margin-top: 5px;
          border-radius: 10%;
          height: 70px;
          width: 70px;
        }
      }
      p {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .counts {
    display: none;
  }
`;
export default UserCard;
