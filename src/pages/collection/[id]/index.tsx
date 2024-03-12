import Layout from "@/layouts/Layout";
import { getMarketplacesListing } from "@/services/Marketplace";
import { Disclosure, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "react-use-cart";

const SortList = [
  {
    label: "Recently reviewed",
    value: "recently-reviewed",
  },
  {
    label: "Price high to low",
    value: "price-high-to-low,",
  },
  {
    label: "Price low to high",
    value: "price-low-to-high,",
  },
  {
    label: "Highest floor",
    value: "highest-floor,",
  },
  {
    label: "Oldest",
    value: "oldest,",
  },
  {
    label: "Recently listed",
    value: "recently-listed,",
  },
  {
    label: "Recently created",
    value: "recently-created,",
  },
  {
    label: "Highest last sale",
    value: "highest-last-sale,",
  },
];

interface ICollectionDetails {
  collectionId: any;
  listingData: any;
}

const CollectionDetails = ({ collectionId, listingData: listingDataProps }: ICollectionDetails) => {
  const { addItem } = useCart();

  const [listing, setListing] = useState<any>(listingDataProps);
  const [selectedCollections, setSelectedCollections] = useState<string>("item");
  const [view, setView] = useState<string>("grid");

  if (listing.length < 0) {
    return <></>;
  }

  return (
    <Layout>
      <div className="relative w-full h-[490px] rounded-br-2xl rounded-bl-2xl overflow-hidden">
        <Image
          src={listing[0].collectibleId.imgURL}
          width="3000"
          height="3000"
          alt="User Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-gl pb-10">
        <div className="flex space-x-6 mb-14">
          <div className="flex-shrink-0 w-[150px] h-[150px] bg-c-1 border-4 border-white rounded-full transform -translate-y-1/2 text-center overflow-hidden">
            <Image
              src={listing[0].collectibleId.imgURL}
              width="3000"
              height="3000"
              alt="User Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 py-6 space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-[32px] font-bold">{listing[0].collectibleId.name}</h3>
              {/* <p className="text-2xl text-c-5 font-bold">LCT</p>
              <Icon icon="mdi:check-decagram" className="text-2xl text-c-9" /> */}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-c-5">Created by</p>
              <div className="flex items-center space-x-2 p-2 bg-white rounded-full shadow text-sm">
                <Image
                  src="/images/placeholder.jpg"
                  width="64"
                  height="64"
                  alt="User Hero"
                  className="w-5 h-5 object-cover rounded-full"
                />
                <p className="font-medium">GenerateLabs</p>
              </div>
            </div>
            <div className="max-w-xl text-sm">
              <p>{listing[0].collectibleId.description}</p>
            </div>
          </div>
          {/* <div className="flex-shrink-0 py-6">
            <div className="w-80 p-6 border border-c-5 rounded-2xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-c-3 font-medium">Floor Price</p>
                  <p className="font-medium">0 ETH</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-c-3 font-medium">Volume</p>
                  <p className="font-medium">0 ETH</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-c-3 font-medium">Items</p>
                  <p className="font-medium">0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-c-3 font-medium">Owners</p>
                  <p className="font-medium">0</p>
                </div>
              </div>
              <hr className="my-6" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-c-3 font-medium">Royalties</p>
                  <p className="font-medium">0 %</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-c-3 font-medium">Blockchain</p>
                  <p className="font-medium">Ethereum</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="flex items-center space-x-4 p-2.5 mb-6 border border-c-5 rounded-2xl">
          <div className={`group ${selectedCollections === "item" && "active"}`}>
            <button
              className="px-6 py-3 bg-white group-[.active]:bg-c-1 border border-white group-[.active]:border-c-1 text-c-1 group-[.active]:text-white rounded-xl transition-all"
              onClick={() => setSelectedCollections("item")}
            >
              Item
            </button>
          </div>
          <div className={`group ${selectedCollections === "activity" && "active"}`}>
            <button
              className="px-6 py-3 bg-white group-[.active]:bg-c-1 border border-white group-[.active]:border-c-1 text-c-1 group-[.active]:text-white rounded-xl transition-all"
              onClick={() => setSelectedCollections("activity")}
            >
              Activity
            </button>
          </div>
        </div> */}

        <div className="flex items-center space-x-4 mb-8">
          <button className="flex items-center space-x-2 px-4 py-3.5 bg-white border border-c-5 rounded-2xl">
            <Icon icon="heroicons-outline:arrow-narrow-left" className="text-xl" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3.5 bg-white border border-c-5 rounded-2xl">
            <span>Chains</span>
            <Icon icon="heroicons-outline:chevron-down" className="text-xl" />
          </button>
          <div className="flex-1 relative">
            <Icon
              icon="heroicons-outline:search"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-c-5"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-3.5 pl-12 border border-c-5 rounded-2xl outline-none"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3.5 bg-white border border-c-5 rounded-2xl">
            <span>Sort:</span>
            <Icon icon="heroicons-solid:clock" className="text-xl" />
            <select>
              {SortList.map((nav, index: number) => (
                <option key={index} value={nav.value}>
                  {nav.label}
                </option>
              ))}
            </select>
          </button>
          <div className="flex items-center p-2 border border-c-5 rounded-2xl">
            <div className={`group ${view === "grid" && "active"}`}>
              <button
                className="flex items-center justify-center p-[7px] bg-white group-[.active]:bg-c-1 border border-white rounded-lg text-c-1 group-[.active]:text-white transition-all"
                onClick={() => setView("grid")}
              >
                <Icon icon="heroicons-solid:view-grid" className="text-xl" />
              </button>
            </div>
            <div className={`group ${view === "list" && "active"}`}>
              <button
                className="flex items-center justify-center p-[7px] bg-white group-[.active]:bg-c-1 border border-white rounded-lg text-c-1 group-[.active]:text-white transition-all"
                onClick={() => setView("list")}
              >
                <Icon icon="heroicons-solid:view-list" className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-64 divide-y divide-c-5">
            <div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3">
                      <span className="font-semibold">Status</span>
                      <Icon
                        icon="heroicons-solid:chevron-down"
                        className={`text-xl ${open ? "rotate-180 transform" : ""}`}
                      />
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="pb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <button className="w-full px-4 py-3 bg-c-1 border border-c-1 rounded-xl text-white">
                            All
                          </button>
                          {/* <button className="w-full px-4 py-3 bg-white border border-c-5 rounded-xl text-c-1">
                            Buy now
                          </button>
                          <button className="w-full px-4 py-3 bg-white border border-c-5 rounded-xl text-c-1">
                            On auction
                          </button>
                          <button className="w-full px-4 py-3 bg-white border border-c-5 rounded-xl text-c-1">
                            Not for sale
                          </button> */}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3">
                      <span className="font-semibold">Price</span>
                      <Icon
                        icon="heroicons-solid:chevron-down"
                        className={`text-xl ${open ? "rotate-180 transform" : ""}`}
                      />
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="pb-6">
                        <select className="w-full px-4 py-3 mb-3 border border-c-5 rounded-xl">
                          <option value="">ETH</option>
                        </select>
                        <div className="flex items-center mb-6">
                          <input
                            type="text"
                            placeholder="Min"
                            className="w-full px-4 py-2.5 border border-c-5 rounded-xl text-center"
                          />
                          <p className="mx-2">to</p>
                          <input
                            type="text"
                            placeholder="Min"
                            className="w-full px-4 py-2.5 border border-c-5 rounded-xl text-center"
                          />
                        </div>
                        <button className="w-full px-4 py-3 bg-c-1 border border-c-1 rounded-xl text-white">
                          Apply
                        </button>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3">
                      <span className="font-semibold">Properties</span>
                      <Icon
                        icon="heroicons-solid:chevron-down"
                        className={`text-xl ${open ? "rotate-180 transform" : ""}`}
                      />
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="pb-6">
                        <div className="flex-1 relative mb-4">
                          <Icon
                            icon="heroicons-outline:search"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-c-5"
                          />
                          <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-3 pl-12 bg-c-7 border border-c-7 rounded-2xl outline-none"
                          />
                        </div>

                        <div className="divide-y divide-c-5">
                          {listing[0].collectibleId.properties.map((collectionsProperty: any, index: number) => {
                            return (
                              <div key={index}>
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3">
                                        <span className="font-semibold">{collectionsProperty.name}</span>
                                        <Icon
                                          icon="heroicons-solid:chevron-down"
                                          className={`text-xl ${open ? "rotate-180 transform" : ""}`}
                                        />
                                      </Disclosure.Button>
                                      <Transition
                                        show={open}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                      >
                                        <Disclosure.Panel className="pb-6">
                                          <label className="relative inline-flex items-center cursor-pointer space-x-4">
                                            <input type="checkbox" className="peer" />
                                            <span>{collectionsProperty.value}</span>
                                          </label>
                                        </Disclosure.Panel>
                                      </Transition>
                                    </>
                                  )}
                                </Disclosure>
                              </div>
                            );
                          })}
                        </div>

                        {/* <p className="mb-4 text-xs font-semibold uppercase">Collections</p>
                        <div className="space-y-1">
                          {new Array(3).fill("x").map((data, index: number) => (
                            <div key={index} className="flex items-center space-x-3 p-3">
                              <Image
                                src="/images/placeholder.jpg"
                                width="64"
                                height="64"
                                alt="Collection"
                                className="flex-shrink-0 w-10 h-10 object-cover rounded-xl"
                              />
                              <p className="font-semibold">Zain Curtis</p>
                            </div>
                          ))}
                        </div> */}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-6">0 items</p>
            {/* <div className="w-full px-4 py-25 border border-c-5 rounded-2xl text-center">
              <p className="mb-3 text-2xl font-medium">No items found</p>
              <p className="text-c-3">We couldn&apos;t find anything with this criteria</p>
            </div> */}
            <div className="grid grid-cols-12 gap-5">
              {listing.map((collection: any, index: number) => {
                if (view === "grid") {
                  return (
                    <div key={index} className="col-span-3">
                      <div className="group relative w-full rounded-2xl shadow-md overflow-hidden">
                        <Link href={`/collection/${collectionId}/${collection._id}`}>
                          <Image
                            src={collection.collectibleId.imgURL}
                            width="512"
                            height="512"
                            alt=""
                            className="w-full h-64 object-cover"
                          />
                        </Link>
                        <div className="p-4">
                          <p className="mb-2 text-c-5">{collection.collectibleId.name}</p>
                          <p className="font-medium">- #{index + 1}</p>
                        </div>
                        <div className="absolute left-0 -bottom-12 group-hover:bottom-0 flex w-full h-10 transition-all">
                          <button className="flex items-center justify-center w-full space-x-2 px-4 bg-c-2 text-white">
                            <Icon icon="heroicons-solid:credit-card" />
                            <span>Buy Now</span>
                          </button>
                          <button
                            className="bg-c-2 px-4 border-l border-white text-white"
                            onClick={() => {
                              const products = {
                                id: collection._id,
                                name: collection.collectibleId.name,
                                creator: "Generate Labs",
                                price: collection.price,
                              };
                              addItem(products);
                            }}
                          >
                            <Icon icon="heroicons-solid:shopping-cart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="col-span-12">
                      <Link href={`/collection/${collectionId}/${collection._id}`}>
                        <div className="flex items-center w-full px-4 py-3 rounded-2xl shadow-md overflow-hidden">
                          <Image
                            src={collection.collectibleId.imgURL}
                            width="512"
                            height="512"
                            alt=""
                            className="w-18 h-18 object-cover rounded-xl"
                          />
                          <div className="px-4">
                            <p className="mb-2 text-c-5">{collection.collectibleId.name}</p>
                            <p className="font-medium">- #{index + 1}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  try {
    const responseGetMarketplacesListing = await getMarketplacesListing({ id: id });

    return {
      props: {
        collectionId: id,
        listingData: responseGetMarketplacesListing.data.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default CollectionDetails;
