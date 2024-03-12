import { ICollection } from "@/types/ICollection";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import Image from "next/image";
import Link from "next/link";

import "@egjs/react-flicking/dist/flicking.css";

interface ICollectionsFeatured {
  collections: ICollection[];
}

/**
 * Marketplace Collections
 */
const CollectionsFeatured = ({ collections }: ICollectionsFeatured) => {
  const featuredCarouselRef = useRef<any>(null);

  return (
    <div className="container-gl">
      <h2 className="mb-14 text-[32px] font-bold">Featured Collections</h2>
      <div className="relative">
        <Flicking
          ref={featuredCarouselRef}
          align={"prev"}
          panelsPerView={2}
          noPanelStyleOverride={false}
          circular={true}
          circularFallback={"bound"}
        >
          {collections.map((collection, index: number) => {
            if (collection.collectibleId) {
              return (
                <div key={index} className="w-full mr-6">
                  <Link href={`/collection/${collection._id}`}>
                    <div className="w-full p-3 border border-c-5 rounded-3xl">
                      <div className="flex flex-col flex-wrap h-96 -m-2">
                        {new Array(1).fill("").map((token: any, index: number) => (
                          <div
                            key={index}
                            className={`p-2 ${index === 0 ? "w-[70%]" : "w-[30%] flex-1"} ${
                              new Array(1).fill("").length === 1 && "!w-full"
                            } h-full`}
                          >
                            <div className="relative w-full h-full">
                              <div
                                className={`absolute w-full h-full rounded-xl ${
                                  (index === 0 || index === 3) && "!rounded-br-none !rounded-bl-none"
                                } overflow-hidden`}
                              >
                                <Image
                                  src={collection.collectibleId.imgURL}
                                  width="1080"
                                  height="1080"
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start justify-between px-5 pt-7 pb-3">
                        <div>
                          <p className="mb-2 text-2xl font-bold">{collection.collectibleId.name}</p>
                          <p>by {collection.collectibleId.createdBy}</p>
                        </div>
                        <div className="flex items-center space-x-10">
                          <div>
                            <p className="mb-1 text-c-3">Collectibles</p>
                            <p className="text-2xl font-bold">
                              {collection.collectibleId.amountMinted} / {collection.collectibleId.supply}
                            </p>
                          </div>
                          {/* <div>
                                <p className="mb-1 text-c-3">Total Sales</p>
                                <p className="text-2xl font-bold">1 / 902</p>
                              </div> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          })}
        </Flicking>
        <button
          type="button"
          className="absolute z-2 top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center w-[42px] h-[42px] bg-white border border-white rounded-full shadow-md"
          onClick={() => featuredCarouselRef.current.next()}
        >
          <Icon icon="heroicons-solid:arrow-narrow-right" className="text-xl" />
        </button>
        <button
          type="button"
          className="absolute z-2 top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center w-[42px] h-[42px] bg-white border border-white rounded-full shadow-md"
          onClick={() => featuredCarouselRef.current.prev()}
        >
          <Icon icon="heroicons-solid:arrow-narrow-left" className="text-xl" />
        </button>
      </div>

      {/*
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <div className="w-full p-3 border border-c-5 rounded-3xl">
            <div className="flex flex-col flex-wrap h-96 -m-2">
              {new Array(1).fill("").map((token: any, index: number) => (
                <div
                  key={index}
                  className={`p-2 ${index === 0 ? "w-[70%]" : "w-[30%] flex-1"} ${
                    new Array(1).fill("").length === 1 && "!w-full"
                  } h-full`}
                >
                  <div className="relative w-full h-full">
                    <div
                      className={`absolute w-full h-full rounded-xl ${
                        (index === 0 || index === 3) && "!rounded-br-none !rounded-bl-none"
                      } overflow-hidden`}
                    >
                      <Image
                        src="/images/dev/1.png"
                        width="256"
                        height="256"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start justify-between px-5 pt-7 pb-3">
              <div>
                <p className="mb-2 text-2xl font-bold">Tiger tail</p>
                <p>by Cardo</p>
              </div>
              <div className="flex items-center space-x-10">
                <div>
                  <p className="mb-1 text-c-3">Collectibles</p>
                  <p className="text-2xl font-bold">1 / 902</p>
                </div>
                <div>
                  <p className="mb-1 text-c-3">Collectibles</p>
                  <p className="text-2xl font-bold">1 / 902</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="w-full p-3 border border-c-5 rounded-3xl">
            <div className="flex flex-col flex-wrap h-96 -m-2">
              {new Array(4).fill("").map((token: any, index: number) => (
                <div
                  key={index}
                  className={`p-2 ${index === 0 ? "w-[70%]" : "w-[30%] flex-1"} ${
                    new Array(4).fill("").length === 1 && "!w-full"
                  } h-full`}
                >
                  <div className="relative w-full h-full">
                    <div
                      className={`absolute w-full h-full rounded-xl ${
                        (index === 0 || index === 3) && "!rounded-br-none !rounded-bl-none"
                      } overflow-hidden`}
                    >
                      <Image
                        src="/images/dev/1.png"
                        width="256"
                        height="256"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start justify-between px-5 pt-7 pb-3">
              <div>
                <p className="mb-2 text-2xl font-bold">Tiger tail</p>
                <p>by Cardo</p>
              </div>
              <div className="flex items-center space-x-10">
                <div>
                  <p className="mb-1 text-c-3">Collectibles</p>
                  <p className="text-2xl font-bold">1 / 902</p>
                </div>
                <div>
                  <p className="mb-1 text-c-3">Collectibles</p>
                  <p className="text-2xl font-bold">1 / 902</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default CollectionsFeatured;
