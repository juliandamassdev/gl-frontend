import { ICollection } from "@/types/ICollection";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import Image from "next/image";

import "@egjs/react-flicking/dist/flicking.css";

interface IHeroMarketplace {
  collections: ICollection[];
}

/**
 * Hero Marketplace
 */
const HeroMarketplace = ({ collections }: IHeroMarketplace) => {
  const heroMarketplaceCarouselRef = useRef<any>(null);

  return (
    <div className="relative w-full">
      <Flicking ref={heroMarketplaceCarouselRef} circular={true}>
        {collections.map((collection: any, index: number) => {
          if (collection.collectionId) {
            return (
              <div key={index} className="relative flex items-end justify-center w-full h-[824px]">
                <Image
                  src="/images/dev/1.png"
                  width="2080"
                  height="2080"
                  alt={collection.collectionId.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-1"
                />
                <div className="container-gl relative">
                  <div className="relative w-full max-w-4xl pb-14 z-2 mx-auto text-center text-white">
                    <h1 className="mb-28 text-[64px] font-bold leading-tight drop-shadow-[0_4px_13px_rgba(0,0,0,0.5)]">
                      Collect and Create Digital Collectibles with No-Code.
                    </h1>
                    <Image
                      src="/images/dev/2.png"
                      width="128"
                      height="128"
                      alt="Image"
                      className="inline-flex w-29 h-29 object-cover mb-6 border-4 border-white rounded-full"
                    />
                    <h3 className="mb-6 text-[40px] font-bold">{collection.collectionId.name}</h3>
                    <div className="inline-flex items-center space-x-2">
                      <p className="text-sm">{collection.collectionId.createdBy}</p>
                      <Icon icon="heroicons-solid:badge-check" className="text-sm text-c-2" />
                    </div>
                  </div>
                  <div className="absolute right-4 bottom-14 flex items-center space-x-3.5 z-3">
                    <button
                      type="button"
                      className="flex items-center justify-center w-[42px] h-[42px] border border-white rounded-full text-white"
                      onClick={() => heroMarketplaceCarouselRef.current.next()}
                    >
                      <Icon icon="heroicons-solid:arrow-narrow-left" className="text-xl" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-[42px] h-[42px] border border-white rounded-full text-white"
                      onClick={() => heroMarketplaceCarouselRef.current.prev()}
                    >
                      <Icon icon="heroicons-solid:arrow-narrow-right" className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          if (collection.collectibleId) {
            return (
              <div key={index} className="relative flex items-end justify-center w-full h-[824px]">
                <Image
                  src="/images/dev/1.png"
                  width="2080"
                  height="2080"
                  alt={collection.collectibleId.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-1"
                />
                <div className="container-gl relative">
                  <div className="relative w-full max-w-4xl pb-14 z-2 mx-auto text-center text-white">
                    <h1 className="mb-28 text-[64px] font-bold leading-tight drop-shadow-[0_4px_13px_rgba(0,0,0,0.5)]">
                      Collect and Create Digital Collectibles with No-Code.
                    </h1>
                    <Image
                      src="/images/dev/2.png"
                      width="128"
                      height="128"
                      alt="Image"
                      className="inline-flex w-29 h-29 object-cover mb-6 border-4 border-white rounded-full"
                    />
                    <h3 className="mb-6 text-[40px] font-bold">{collection.collectibleId.name}</h3>
                    <div className="inline-flex items-center space-x-2">
                      <p className="text-sm">{collection.collectibleId.createdBy}</p>
                      <Icon icon="heroicons-solid:badge-check" className="text-sm text-c-2" />
                    </div>
                  </div>
                  <div className="absolute right-4 bottom-14 flex items-center space-x-3.5 z-3">
                    <button
                      type="button"
                      className="flex items-center justify-center w-[42px] h-[42px] border border-white rounded-full text-white"
                      onClick={() => heroMarketplaceCarouselRef.current.next()}
                    >
                      <Icon icon="heroicons-solid:arrow-narrow-left" className="text-xl" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-[42px] h-[42px] border border-white rounded-full text-white"
                      onClick={() => heroMarketplaceCarouselRef.current.prev()}
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

export default HeroMarketplace;
