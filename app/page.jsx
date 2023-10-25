"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/context";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { choosenProduct, setChoosenProduct, cartNum, setCartNum } =
    useGlobalContext();
  const [serchItem, setSearchItem] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [skipNum, setSkipNum] = useState("");
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);

  const pages = [{ page: num }, { page: num + 1 }, { page: num + 2 }];

  useEffect(
    (url) => {
      const fetchFunction = async () => {
        setLoading(true);
        if (isSearching) {
          url = `https://dummyjson.com/products/search?q=${serchItem}`;
        } else {
          url = `https://dummyjson.com/products?limit=20${skipNum}`;
        }
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonData = await response.json();
        setProducts(jsonData.products);
        console.log(jsonData);
        setLoading(false);
      };
      fetchFunction();
    },
    [serchItem, skipNum]
  );

  const Next = () => {
    num < 1 && setNum(++num);
  };

  const back = () => {
    num > 1 && setNum(--num);
  };

  return (
    <div className="w-[1000px] mx-auto">
      <div className="flex flex-col items-center mt-5 ">
        <div className="flex justify-around w-full">
          <label htmlFor="" className="w-[200px]">
            Search Product
            <input
              type="search"
              className="border outline-none p-2"
              placeholder="Enter product name"
              onChange={(e) => {
                setSearchItem(e.target.value), setIsSearching(true);
              }}
            />
          </label>
          <div>
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
                className="bi bi-cart3"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <p className="ml-3">Cart ({cartNum})</p>
            </Link>
          </div>
        </div>
      </div>
      <div className=" mt-5 bg-white text-black  ">
        <h1 className="text-center ">Products</h1>
        <pre className="border mt-4"></pre>
      </div>
      <div className="flex justify-around w-[1000px] mx-auto flex-wrap bg-white">
        {products.map((item, index) => {
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

              <Link
                href="/product"
                rel="prefetch"
                className=" border px-3 py-2 rounded-sm text-center"
                onClick={() => setChoosenProduct(item)}
              >
                Buy now
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mb-5">
        <button
          onClick={back}
          className="h-12 border-2 p-3 rounded-l-lg border-indigo-600 w-12  border-r-0 hover:bg-indigo-600 hover:text-white "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
        {pages.map((p, i) => {
          return (
            <button
              onClick={() => {
                setCur(p.page);
                setSkipNum(`&skip=${i * 20}`);
              }}
              className={`h-12 border-2  border-indigo-600 w-12 border-r-0 ${
                cur === p.page && "bg-indigo-600 text-white"
              }`}
              key={i}
            >
              {p.page}
            </button>
          );
        })}
        <button
          onClick={Next}
          className="h-12 border-2 p-3 rounded-r-lg border-indigo-600 w-12 hover:bg-indigo-600 hover:text-white "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
