import { Fragment } from "react";
import { ICollection } from "@/types/ICollection";
import { Tab } from "@headlessui/react";
import CollectionsFeatured from "../molecules/collections-featured";
import CollectionsSpotlights from "../molecules/collections-spotlights";

import "@egjs/react-flicking/dist/flicking.css";
import CollectionsCollectible from "../molecules/collections-collectible";

interface ICollectionsMarketplace {
  collections: ICollection[];
  spotlights: ICollection[];
  newArrival: ICollection[];
  collectibles: ICollection[];
}

/**
 * Collections Marketplace
 */
const CollectionsMarketplace = ({ collections, spotlights, newArrival, collectibles }: ICollectionsMarketplace) => {
  return (
    <div className="pt-11 pb-10">
      <Tab.Group>
        <div className="container-gl">
          <Tab.List className="flex items-center mb-16">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 inline-flex items-center justify-center w-full px-6 py-3 space-x-3 border bg-c-1 rounded-full transition-all ${
                    selected ? "bg-c-1 border-c-1 text-white" : "bg-white border-white"
                  }`}
                >
                  All
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 inline-flex items-center justify-center w-full px-6 py-3 space-x-3 border bg-c-1 rounded-full transition-all ${
                    selected ? "bg-c-1 border-c-1 text-white" : "bg-white border-white"
                  }`}
                >
                  Collections
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 inline-flex items-center justify-center w-full px-6 py-3 space-x-3 border bg-c-1 rounded-full transition-all ${
                    selected ? "bg-c-1 border-c-1 text-white" : "bg-white border-white"
                  }`}
                >
                  Spotlights
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 inline-flex items-center justify-center w-full px-6 py-3 space-x-3 border bg-c-1 rounded-full transition-all ${
                    selected ? "bg-c-1 border-c-1 text-white" : "bg-white border-white"
                  }`}
                >
                  New Arrival
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-1 inline-flex items-center justify-center w-full px-6 py-3 space-x-3 border bg-c-1 rounded-full transition-all ${
                    selected ? "bg-c-1 border-c-1 text-white" : "bg-white border-white"
                  }`}
                >
                  Collectibles
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            <div className="space-y-20">
              <CollectionsFeatured collections={collections} />

              <CollectionsSpotlights collections={spotlights} />

              <CollectionsCollectible collections={newArrival} />
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <CollectionsFeatured collections={collections} />
          </Tab.Panel>

          <Tab.Panel>
            <CollectionsSpotlights collections={spotlights} />
          </Tab.Panel>

          <Tab.Panel>
            <CollectionsCollectible collections={newArrival} />
          </Tab.Panel>

          <Tab.Panel>
            <CollectionsCollectible collections={newArrival} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CollectionsMarketplace;
