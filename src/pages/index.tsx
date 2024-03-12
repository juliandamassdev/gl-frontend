import { EViewMode } from "@/types/commonTypes";
import { Icon } from "@iconify/react";
import { Menu, Transition } from "@headlessui/react";
import { useGetCollections } from "@/queries/collection-queries";
import { useState, Fragment } from "react";
import ButtonV2 from "@/components/buttons/button-v2";
import CardCollection from "@/components/card/card-collection";
import CollectionCardList from "@/components/molecules/collection-card-list";
import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";
import InitialHero from "@/components/sections/initial-hero";
import Link from "next/link";
import ModalCreateProject from "@/components/modals/modal-create-project";
import Skeleton from "@/components/atoms/skeleton";

const Home = () => {
  const { data: collections, isLoading: isLoadingGetCollections } = useGetCollections();

  const [showModalCreateProject, setShowModalCreateProject] = useState<boolean>(false);
  const [collectionViewMode, setCollectionViewMode] = useState(EViewMode.GRID);

  return (
    <>
      <DashboardLayout>
        <InitialHero />

        {isLoadingGetCollections ? (
          <Skeleton />
        ) : (
          <>
            {collections.collections.length <= 0 && (
              <div className="grid grid-cols-12 w-full py-6">
                <div className="col-span-5">
                  <Image src="/images/empty-generate.png" width="512" height="512" alt="" className="w-full" />
                </div>
                <div className="col-span-7 flex items-center justify-center">
                  <div className="px-26 text-center">
                    <p className="text-[32px] font-bold mb-4">Generate your first collection</p>
                    <p className="mb-12 text-c-3">
                      Create thousands of digital collectibles quickly. Your digital collectibles collection will come
                      to life with our simple, no-code process.
                    </p>
                    <button
                      className="inline-flex items-center justify-center w-auto h-12 px-6 space-x-3 rounded-full bg-black text-white"
                      onClick={() => setShowModalCreateProject(true)}
                    >
                      <Icon icon="heroicons-outline:plus" className="text-2xl" />
                      <span>Create Project</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {collections.collections.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex items-center px-3 py-3.5 space-x-5 p-3 bg-transparent hover:bg-c-7 rounded-2xl transition-all">
                        <Image
                          src="/images/placeholder.jpg"
                          alt="Generate Labs"
                          width="200"
                          height="200"
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-xl font-bold">My Portfolio</span>
                        <Icon icon="heroicons-outline:chevron-down" className="text-2xl" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 origin-top-right w-auto py-2 mt-2 bg-white rounded-lg shadow-lg z-10">
                        <div className="px-4">
                          <Menu.Item>
                            {({ active }) => (
                              <button className="flex items-center w-full px-4 py-2 my-2 space-x-4 text-left">
                                <Icon icon="heroicons-outline:plus" className="text-xl" />
                                <span className="text-lg font-bold whitespace-nowrap">Add Collection</span>
                              </button>
                            )}
                          </Menu.Item>
                          <hr className="opacity-100 border-gl-6" />
                          <Menu.Item>
                            {({ active }) => (
                              <div className="flex items-center space-x-2">
                                <button className="flex items-center px-4 py-2 my-2 space-x-4 text-left bg-transparent hover:bg-gl-11 rounded-lg transition-all">
                                  <div className="w-6 h-6">
                                    <Image
                                      src="/images/placeholder.jpg"
                                      alt="Generate Labs"
                                      width="50"
                                      height="50"
                                      className="w-full h-full rounded-full"
                                    />
                                  </div>
                                  <span className="text-lg font-bold whitespace-nowrap">My Portfolio</span>
                                </button>
                                <button className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gl-3">
                                  <Icon icon="heroicons-outline:cog" className="text-xl" />
                                </button>
                              </div>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center px-2 py-1.5 space-x-1 bg-c-7 rounded-xl">
                      <p className="text-c-3">Filter: </p>
                      <Icon icon="heroicons-solid:view-grid" />
                      <select className="bg-transparent outline-none" defaultValue="">
                        <option value="">All</option>
                      </select>
                    </div>
                    <div className="flex items-center px-2 py-1.5 space-x-1 bg-c-7 rounded-xl">
                      <p className="text-c-3">Sort: </p>
                      <Icon icon="heroicons-solid:clock" />
                      <select className="bg-transparent outline-none" defaultValue="">
                        <option value="">Recent</option>
                      </select>
                    </div>
                    <div className="flex items-center p-1 space-x-1 bg-c-7 rounded-xl">
                      <button
                        className={`group ${collectionViewMode === EViewMode.GRID ? "active" : ""}`}
                        onClick={() => setCollectionViewMode(EViewMode.GRID)}
                      >
                        <div className="flex items-center justify-center w-7 h-7 bg-transparent group-[.active]:bg-c-1 text-c-1 group-[.active]:text-white rounded-lg transition-all">
                          <Icon icon="heroicons-solid:view-grid" />
                        </div>
                      </button>
                      <button
                        className={`group ${collectionViewMode === EViewMode.LIST ? "active" : ""}`}
                        onClick={() => setCollectionViewMode(EViewMode.LIST)}
                      >
                        <div className="flex items-center justify-center w-7 h-7 bg-transparent group-[.active]:bg-c-1 text-c-1 group-[.active]:text-white rounded-lg transition-all">
                          <Icon icon="heroicons-solid:view-list" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-5">
                  {collections.collections
                    .sort((a: any, b: any) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
                    .map((collection: any, index: number) => {
                      if (collectionViewMode === EViewMode.GRID) {
                        if (collection.tokenSetId.uuid) {
                          return (
                            <div key={index} className="col-span-4">
                              <Link href={`/art-generator/${collection.tokenSetId.uuid}/generate`}>
                                <CardCollection collection={collection} />
                              </Link>
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className="col-span-4">
                              <CardCollection collection={collection} />
                            </div>
                          );
                        }
                      }

                      if (collectionViewMode === EViewMode.LIST) {
                        return (
                          <div key={index} className="col-span-12">
                            <CollectionCardList key={index} collection={collection} />
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            )}
          </>
        )}
      </DashboardLayout>

      {/* First deployment */}
      <div className="flex items-center justify-between w-full bg-[#191919] border-t px-10 py-12">
        <div>
          <p className="mb-1 text-xl text-white font-semibold">Sign up to our newsletter</p>
          <p className="text-white">Stay up to date with the latest announcement, news, and new features.</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="w-full min-w-[425px] px-6 py-3 bg-transparent border border-white rounded-xl"
            placeholder="Enter email"
          />
          <ButtonV2 variant="white">
            <span>Subscribe</span>
          </ButtonV2>
        </div>
      </div>

      {/* Modal Create Project */}
      <ModalCreateProject isOpen={showModalCreateProject} onClose={close => setShowModalCreateProject(close)} />

      {/* DEV */}
      {/* Modal Onboarding */}
      {/* <ModalOnboarding isOpen={true} /> */}
    </>
  );
};

export default Home;

Home.requireAuth = true;
