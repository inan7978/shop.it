import { useState, useEffect, useContext } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { _getItemDetails, _addToCart } from "../api/itemAPI";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ItemDetailsPage() {
  const { user } = useContext(UserContext);
  const [item, setItem] = useState();

  async function getItemDetails() {
    const id = window.location.href.split("/");
    const temp = id[id.length - 1];
    const details = await _getItemDetails(temp);
    console.log("Item id: ", temp);
    setItem(details[0]);
  }

  async function addToCart(id) {
    console.log(id, user._id);
    console.log("Adding to cart: ", id);
    const data = await _addToCart(user._id, id);
    console.log(data);
  }

  useEffect(() => {
    getItemDetails();
  }, []);

  // return <>{item ? <div>{item.title}</div> : <h2>Nothing</h2>}</>;
  return item ? (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {item.imgURL.map((image) => (
                  <Tab
                    key={image}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{image}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {item.imgURL.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image}
                    alt={image}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* item info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {item.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">item information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${item.price.$numberDecimal}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <p className="sr-only">{item.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                <Disclosure as="div" key={item.title}>
                  {({ open }) => (
                    <>
                      <h3>
                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left"></Disclosure.Button>
                      </h3>
                      <Disclosure.Panel
                        as="div"
                        className="prose prose-sm pb-6"
                      >
                        {/* <ul role="list">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul> */}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => {
                    addToCart(item._id);
                  }}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Null</h1>
  );
}
