import Layout from "@/layouts/z/Layout";
import { getMarketplacesListing } from "@/services/Marketplace";
import { shrinkAddress } from "@/utils/common";
import { Disclosure, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  collectionToken: any;
  collection: any;
}

const CollectionDetails = ({ collectionId, collectionToken, collection }: ICollectionDetails) => {
  return (
    <Layout>
      <div className="relative w-full h-[490px] rounded-br-2xl rounded-bl-2xl overflow-hidden">
        <Image
          src={collection.collectibleId.imgURL}
          width="3000"
          height="3000"
          alt="User Hero"
          className="w-full h-full object-cover blur-3xl"
        />
      </div>

      <div className="container-gl pb-10 relative">
        <div className="flex justify-center space-x-6 mb-14">
          <div className="flex-shrink-0 flex w-[560px] h-[560px] bg-c-1 rounded-2xl -mt-[350px] overflow-hidden">
            <Link href={`/collection/${collectionId}`}>
              <button className="absolute left-0 flex items-center justify-center w-14 h-14 rounded-full bg-white">
                <Icon icon="heroicons:chevron-left" className="text-2xl" />
              </button>
            </Link>
            <Image
              src={collection.collectibleId.imgURL}
              width="3000"
              height="3000"
              alt="User Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-14">
          <div className="col-span-6">
            <h3 className="mb-3 text-5xl font-bold">Lucid Tales #13</h3>

            <div className="flex items-center space-x-16 mb-16">
              <div className="space-y-1">
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
              <div className="space-y-1">
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
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icon icon="heroicons:bars-4-16-solid" />
                  <h3 className="text-2xl font-semibold">Description</h3>
                </div>
                <p>{collection.collectibleId.description}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icon icon="flowbite:ticket-solid" />
                  <h3 className="text-2xl font-semibold">Traits</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {collection.collectibleId.properties.map((property: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="space-y-1 p-4 bg-c-7 shadow-[0px_0.5px_5px_0px_#0000001A] rounded-xl text-center"
                      >
                        <p className="text-c-3">{property.name}</p>
                        <p className="font-medium">{property.value}</p>
                        <p className="text-c-3">Rarity: -</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Icon icon="heroicons:cpu-chip-16-solid" />
                  <h3 className="text-2xl font-semibold">Details</h3>
                </div>
                <table className="w-80">
                  <tr>
                    <td>
                      <span className="text-c-3">Image</span>
                    </td>
                    <td>
                      <span className="font-medium">photo (JPEG)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-c-3">Dimensions</span>
                    </td>
                    <td>
                      <span className="font-medium">250x250</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-c-3">File Size</span>
                    </td>
                    <td>
                      <span className="font-medium">10 MB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-c-3">Contract Address</span>
                    </td>
                    <td>
                      <span className="font-medium">{shrinkAddress(collection.collectibleId.txHash)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-c-3">Token Standard</span>
                    </td>
                    <td>
                      <span className="font-medium">ERC-721</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-c-3">Blockchain</span>
                    </td>
                    <td>
                      <span className="font-medium">Ethereum</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div className="flex items-center justify-between mb-20 p-6 border border-c-5 rounded-2xl">
              <div>
                <p className="text-c-3">Price</p>
                <div className="flex items-center space-x-2">
                  <Icon icon="logos:ethereum" className="text-xl" />
                  <p className="text-2xl font-semibold">{collection.price} ETH</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="group-hover:bottom-0 flex rounded-xl transition-all overflow-hidden">
                  <button className="flex items-center justify-center px-10 py-3 bg-c-2 text-white font-medium">
                    <span>Buy now</span>
                  </button>
                  <button
                    className="bg-c-2 px-4 border-l border-white text-white"
                    onClick={() => {
                      // const products = {
                      //   id: collection._id,
                      //   name: collection.collectibleId.name,
                      //   creator: "Generate Labs",
                      //   price: collection.price,
                      // };
                      // addItem(products);
                    }}
                  >
                    <Icon icon="heroicons-solid:shopping-cart" className="text-xl" />
                  </button>
                </div>
                <button className="flex items-center justify-center space-x-2 px-10 py-3 bg-c-1 rounded-xl text-white font-medium">
                  <Icon icon="heroicons:tag-16-solid" className="text-xl" />
                  <span>Make offer</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-semibold">Item Activity</h3>
              <div className="divide-y divide-c-5">
                {/* <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/images/placeholder.jpg"
                      alt=""
                      width={200}
                      height={200}
                      className="w-10 h-10 bg-c-5 rounded-full"
                    />
                    <div>
                      <p>
                        0xcb80...761f <span>listed for</span>
                      </p>
                      <p>2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xl font-medium">65.2 EH</p>
                    <button>
                      <Icon icon="heroicons:arrow-top-right-on-square-16-solid" className="text-2xl text-c-5" />
                    </button>
                  </div>
                </div> */}
                <div className="text-center">No Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const token = params?.token as string;

  try {
    const responseGetMarketplacesListing = await getMarketplacesListing({ id: id });

    const collection = responseGetMarketplacesListing.data.data.find((item: any) => item._id === token);

    return {
      props: {
        collectionId: id,
        collectionToken: token,
        collection: collection,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default CollectionDetails;
