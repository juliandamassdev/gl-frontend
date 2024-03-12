import { Icon } from "@iconify/react";
import Image from "next/image";
import ImageOn from "../images/ImageOn";

const CardCollection = ({ collection }: any) => {
  return (
    <div className="relative w-full p-3 rounded-2xl shadow-[2px_2px_16px_0px_#0000001A]">
      <button
        type="button"
        className="absolute top-5 left-5 flex items-center justify-center w-9 h-9 bg-white rounded-xl z-2"
      >
        <Icon icon="heroicons-outline:star" className="text-xl" />
      </button>
      <div className="mb-4">
        <div className="flex flex-col flex-wrap h-56 -m-1">
          {collection.tokenSetId.tokens &&
            collection.tokenSetId.tokens.slice(0, 4).map((token: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`p-1 ${index === 0 ? "w-[70%]" : "w-[30%] flex-1"} ${
                    collection.tokenSetId.tokens.length === 1 && "!w-full"
                  } h-full`}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute w-full h-full rounded-xl overflow-hidden">
                      <ImageOn
                        src={token.image}
                        width="256"
                        height="256"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          {collection.tokenSetId.metadata &&
            collection.tokenSetId.metadata.slice(0, 4).map((metadata: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`p-1 ${index === 0 ? "w-[70%]" : "w-[30%] flex-1"} ${
                    collection.tokenSetId.metadata.length === 1 && "!w-full"
                  } h-full`}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute w-full h-full rounded-xl overflow-hidden">
                      <ImageOn
                        src={metadata.imageURL}
                        width="256"
                        height="256"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 font-semibold">{collection.name}</p>
          <div className="flex items-center space-x-2">
            {collection.tokenSetId.metadata.length >= 0 && (
              <>
                <Image
                  src="/images/icon-drop-black.png"
                  width="24"
                  height="24"
                  alt="Icon"
                  className="w-4 h-4 grayscale"
                />
                <p className="text-xs text-c-3 font-medium">Drops</p>
              </>
            )}
          </div>
        </div>
        <button className="py-1">
          <Icon icon="heroicons-solid:dots-vertical" className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CardCollection;
