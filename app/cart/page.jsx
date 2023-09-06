"use client";
import React from "react";
import { useGlobalContext } from "@/context";
import Link from "next/link";
import Image from "next/image";
function Cart() {
  const { cart, setCart, cartNum, removeFromCart } = useGlobalContext();
  console.log(cart);
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };
  return (
    <div>
      <div className="flex flex-col items-center mt-5 ">
        <div className="flex justify-around w-full">
          <h1>Cart</h1>
          <Link href="/">Go Home</Link>
          <div>
            <button className="flex border items-center p-2 rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart3"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <p className="ml-3">Cart ({cartNum})</p>
            </button>
          </div>
        </div>
      </div>

      <div className="body flex w-[1000px] justify-between mx-auto">
        {cart.map((item, index) => {
          return (
            <div
              key={item.id}
              className=" border w-[300px]  my-3 px-3 py-5 rounded-md justify-center flex flex-col"
            >
              <Image
                width={100}
                height={100}
                alt={item.title}
                src={item.images[0]}
                className="w-full  h-[150px]"
              ></Image>
              <h3 className="text-center mt-2">{item.title}</h3>
              <p className="text-center my-3"> ${item.price}</p>
              <button
                className="w-full justify-center flex border px-3 py-2 rounded-sm"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove from Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
