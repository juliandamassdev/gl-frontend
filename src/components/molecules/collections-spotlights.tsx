import { ICollection } from "@/types/ICollection";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import Image from "next/image";

import "@egjs/react-flicking/dist/flicking.css";

interface ICollectionsSpotlights {
  collections: ICollection[];
}

/**
 * Collections Spotlights
 */
const CollectionsSpotlights = ({ collections }: ICollectionsSpotlights) => {
  console.log(collections);

  const collectionsSpotlightsCarouselRef = useRef<any>(null);

  return (
    <div>
      <div className="container-gl">
        <h2 className="mb-14 text-[32px] font-bold">Spotlight</h2>
      </div>
      <Flicking ref={collectionsSpotlightsCarouselRef} circular={true}>
        {collections.map((collection: any, index: number) => {
          if (collection.collectibleId) {
            return (
              <div key={index} className="relative flex items-end justify-center w-full h-[666px]">
                <Image
                  src={collection.collectibleId.imgURL}
                  width="2080"
                  height="2080"
                  alt={collection.collectibleId.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-1"
                />
                <div className="container-gl relative">
                  <div className="relative w-full pb-14 z-2 text-white">
                    <Image
                      src={collection.collectibleId.imgURL}
                      width="128"
                      height="128"
                      alt={collection.collectibleId.name}
                      className="inline-flex w-29 h-29 object-cover mb-6 border-4 border-white rounded-full"
                    />
                    <h3 className="mb-2 text-[40px] font-bold">{collection.collectibleId.name}</h3>
                    <div className="flex items-center mb-8 space-x-2">
                      <p className="text-sm">{collection.collectibleId.createdBy}</p>
                      <Icon icon="heroicons-solid:badge-check" className="text-sm text-c-2" />
                    </div>
                    <button className="inline-flex items-center justify-center w-auto min-w-[266px] px-6 py-3 space-x-2 border border-white bg-white rounded-full text-c-1">
                      <span>View Art</span>
                      <Icon icon="heroicons-outline:arrow-up" className="text-xl rotate-45" />
                    </button>
                  </div>
                  <div className="absolute right-4 bottom-14 flex items-center space-x-3.5 z-3">
                    <button
                      type="button"
                      className="flex items-center justify-center w-[42px] h-[42px] border border-white rounded-full text-white"
                      onClick={() => collectionsSpotlightsCarouselRef.current.next()}
                    >
                      <Icon icon="heroicons-solid:arrow-narrow-left" className="text-xl" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-[42px] h-[42px] border border-white rounded-full text-white"
                      onClick={() => collectionsSpotlightsCarouselRef.current.prev()}
                    >
                      <Icon icon="heroicons-solid:arrow-narrow-right" className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </Flicking>
    </div>
  );
};

export default CollectionsSpotlights;
