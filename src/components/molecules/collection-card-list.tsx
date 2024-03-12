import { Icon } from "@iconify/react";
import Image from "next/image";
import ImageOn from "../images/ImageOn";

const CollectionCardList = ({ collection }: any) => {
  return (
    <div className="relative flex items-center justify-between w-full p-3 rounded-2xl shadow-[2px_2px_16px_0px_#0000001A]">
      <div className="flex items-center space-x-8">
        {collection.tokenSetId.tokens && (
          <ImageOn
            src={collection.tokenSetId.tokens[0].image}
            width="256"
            height="256"
            alt=""
            className="w-18 h-18 object-cover rounded-xl"
          />
        )}
        <div>
          <p className="mb-2 font-semibold">{collection.name}</p>
          <div className="flex items-center space-x-2">
            <Image src="/images/icon-drop-black.png" width="24" height="24" alt="Icon" className="w-4 h-4 grayscale" />
            <p className="text-xs text-c-3 font-medium">Drops</p>
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-3 pr-3">
        <button
          type="button"
          className="top-5 left-5 flex items-center justify-center w-9 h-9 bg-white rounded-xl z-2 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)]"
        >
          <Icon icon="heroicons-outline:star" className="text-xl" />
        </button>
        <button
          type="button"
          className="top-5 left-5 flex items-center justify-center w-9 h-9 bg-white rounded-xl z-2 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.1)]"
        >
          <Icon icon="heroicons-solid:dots-vertical" className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CollectionCardList;
