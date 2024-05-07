import UserContext from "../context/UserContext";
import { useContext, useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { _loadDetails, _setQuantity, _deleteItem } from "../api/myCartPageAPI";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
function MyCartPage() {
  const { loggedIn, user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
  }, []);

  function subTotal() {
    let subTotal = 0;
    products.forEach((product) => {
      subTotal = subTotal + product.quantity * product.price.$numberDecimal;
    });
    return subTotal;
  }

  function shipping() {
    return 5.49;
  }

  function taxEstimate() {
    return subTotal() * 0.0725;
  }

  function grandTotal() {
    return subTotal() + shipping() + taxEstimate();
  }

  async function deleteItem(user, item) {
    console.log(user, item);
    const deleteItem = await _deleteItem(user, item);
    console.log(deleteItem);
    loadDetails();
  }

  async function setQuantity(user, item, newQuantity) {
    let checkNum = newQuantity;
    console.log(user, item, newQuantity);
    if (newQuantity < 1) {
      checkNum = 1;
    }
    const update = await _setQuantity(user, item, checkNum);
    console.log(update);
    loadDetails();
  }

  async function loadDetails() {
    if (!loggedIn) {
      navigate("../login");
      return 0;
    }

    const items = await _loadDetails(user._id);

    console.log(items.data);
    setLoaded(true);
    setProducts(items.data);
  }

  // load status must be true to run this. This keeps it from trying to map before the values from loadDetails, which is async, arrive.
  return loaded ? (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <ul
            role="list"
            className="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {products.map((product, productIdx) => (
              <li key={product._id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={product.imgURL[0]}
                    alt={product.imageAlt}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <a
                            href={product.href}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product.title}
                          </a>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{product.color}</p>
                        {product.size ? (
                          <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                            {product.size}
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${product.price.$numberDecimal}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <label
                        htmlFor={`quantity-${product.quantity}`}
                        className="sr-only"
                      >
                        Quantity, {product.quantity}
                      </label>
                      <input
                        className="max-w-12 rounded-md border border-gray-300 p-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        type="number"
                        min="1"
                        max="99"
                        defaultValue={product.quantity}
                        onChange={(e) => {
                          setQuantity(
                            user._id,
                            product._id.toString(),
                            e.target.value
                          );
                        }}
                      ></input>

                      <div className="absolute right-0 top-0">
                        <button
                          type="button"
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => {
                            deleteItem(user._id, product._id);
                          }}
                        >
                          <span className="sr-only">Remove</span>
                          <XMarkIconMini
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                    {true ? (
                      <CheckIcon
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClockIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-300"
                        aria-hidden="true"
                      />
                    )}

                    <span>
                      {true ? "In stock" : `Ships in ${product.leadTime}`}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                {subTotal().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">
                    Learn more about how shipping is calculated
                  </span>
                  <QuestionMarkCircleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {shipping().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  href="#"
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">
                    Learn more about how tax is calculated
                  </span>
                  <QuestionMarkCircleIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {taxEstimate().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {grandTotal().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </main>
  ) : (
    <>Nothing loaded</>
  );
}

export default MyCartPage;
