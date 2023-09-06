"use client";
import React from "react";
import { useGlobalContext } from "@/context";
import Image from "next/image";
import Link from "next/link";

function Product() {
  const {
    choosenProduct,
    setChoosenProduct,
    cartNum,
    setCartNum,
    cart,
    seTCart,
    addToCart,
  } = useGlobalContext();
  return (
    <div className="w-[1000px]  mx-auto">
      <div className=" mt-5 bg-white text-black   ">
        <div className="flex justify-around items-center">
          <h1 className="text-center ">Product</h1>
          <Link href="/">Go Home</Link>
          <Link
            href="/cart"
            rel="prefetch"
            className="flex border items-center p-2 rounded-sm"
          >
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
          </Link>
        </div>
        <pre className="border mt-4"></pre>
      </div>
      <div className="flex justify-around w-[1000px] mx-auto flex-wrap bg-white">
        <div className=" border   flex w-full my-3 px-3 py-5 rounded-md">
          <Image
            width={400}
            height={400}
            alt={choosenProduct.title}
            src={choosenProduct.images ? choosenProduct?.images[0] : ""}
            className="w-full  "
          ></Image>
          <div>
            <h3 className=" mt-2">{choosenProduct.title}</h3>
            <p className=" my-3">
              price ${choosenProduct.price} rate {choosenProduct.rating}
            </p>
            <p className=" my-3">{choosenProduct.description}</p>

            <button
              className="w-full justify-center flex border px-3 py-2 rounded-sm"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
