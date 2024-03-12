import { ICollection } from "@/types/ICollection";
import Flicking from "@egjs/react-flicking";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRef } from "react";

interface ICollectionsCollectible {
  collections: ICollection[];
}

/**
 * Collections New Arrival
 */
const CollectionsCollectible = ({ collections }: ICollectionsCollectible) => {
  const newArrivalCarouselRef = useRef<any>(null);

  return (
    <div>
      <div className="container-gl">
        <h2 className="mb-14 text-[32px] font-bold">New Arrival</h2>
      </div>
      <div className="relative">
        <Flicking ref={newArrivalCarouselRef} align={"prev"} circular={true}>
          {collections.map((collection, index: number) => {
            if (collection.collectibleId) {
              return (
                <div key={index} className="w-[384px] min-w-[384px] mr-8 border border-c-3 rounded-3xl overflow-hidden">
                  <Image
                    src={collection.collectibleId.imgURL}
                    width="512"
                    height="512"
                    alt={collection.collectibleId.name}
                    className="w-full h-[358px] object-cover"
                  />
                  <div className="flex justify-between p-6">
                    <div>
                      <p className="mb-3 text-sm text-c-3">{collection.collectibleId.name}</p>
                      <p className="text-xl">
                        {collection.collectibleId.name} #{collection.collectibleId.amountMinted}
                      </p>
                    </div>
                    <Icon icon="heroicons-outline:shopping-cart" className="text-2xl" />
                  </div>
                </div>
              );
            }
          })}
        </Flicking>
        <div className="container-gl absolute z-1 w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <button
            type="button"
            className="absolute z-2 top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center w-[42px] h-[42px] bg-white border border-white rounded-full shadow-md"
            onClick={() => newArrivalCarouselRef.current.next()}
          >
            <Icon icon="heroicons-solid:arrow-narrow-right" className="text-xl" />
          </button>
          <button
            type="button"
            className="absolute z-2 top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center w-[42px] h-[42px] bg-white border border-white rounded-full shadow-md"
            onClick={() => newArrivalCarouselRef.current.prev()}
          >
            <Icon icon="heroicons-solid:arrow-narrow-left" className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCollectible;
