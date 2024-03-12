import { Fragment, useEffect, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Link from "next/link";
import ButtonV2 from "../buttons/button-v2";

const projectsMenu = [
  {
    key: "art",
    label: "Art Collection",
    icon: (
      <Image src="/images/icon-art-black.png" width="24" height="24" alt="Icon" className="w-6 h-6 object-contain" />
    ),
    content: {
      key: "art",
      url: "/art-generator",
      icon: <Image src="/images/icon-art-white.png" width="128" height="128" alt="Icon" className="w-30 h-auto" />,
      title: "Art Collection",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      buttonText: "Create Art Collection",
      buttonIcon: (
        <Image
          src="/images/icon-art-black.png"
          width="24"
          height="24"
          alt="Icon"
          className="w-[18px] h-[18px] object-contain"
        />
      ),
      background: (
        <Image
          src="/images/bg-art.png"
          width="1000"
          height="1000"
          alt="Icon"
          className="absolute top-0 right-0 w-full h-auto opacity-50 z-1"
        />
      ),
    },
  },
  {
    key: "forms",
    label: "Forms",
    icon: (
      <Image src="/images/icon-forms-black.png" width="24" height="24" alt="Icon" className="w-6 h-6 object-contain" />
    ),
    content: {
      key: "form",
      url: "/",
      icon: <Image src="/images/icon-form-white.png" width="128" height="128" alt="Icon" className="w-30 h-auto" />,
      title: "Forms",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      buttonText: "Create Forms",
      buttonIcon: (
        <Image
          src="/images/icon-forms-black.png"
          width="24"
          height="24"
          alt="Icon"
          className="w-[18px] h-[18px] object-contain"
        />
      ),
      background: (
        <Image
          src="/images/bg-form.png"
          width="1000"
          height="1000"
          alt="Icon"
          className="absolute top-0 right-0 w-full h-auto opacity-50 z-1"
        />
      ),
    },
  },
  {
    key: "coin",
    label: "Coin Token",
    icon: (
      <Image src="/images/icon-coin-black.png" width="24" height="24" alt="Icon" className="w-6 h-6 object-contain" />
    ),
    content: {
      key: "coin",
      url: "/",
      icon: <Image src="/images/icon-coin-white.png" width="128" height="128" alt="Icon" className="w-30 h-auto" />,
      title: "Coin Token",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      buttonText: "Create Coin Token",
      buttonIcon: (
        <Image
          src="/images/icon-coin-black.png"
          width="24"
          height="24"
          alt="Icon"
          className="w-[18px] h-[18px] object-contain"
        />
      ),
      background: (
        <Image
          src="/images/bg-coin.png"
          width="1000"
          height="1000"
          alt="Icon"
          className="absolute top-0 right-0 w-full h-auto opacity-50 z-1"
        />
      ),
    },
  },
  {
    key: "drops",
    label: "Drops",
    icon: (
      <Image src="/images/icon-drop-black.png" width="24" height="24" alt="Icon" className="w-6 h-6 object-contain" />
    ),
    content: {
      key: "drop",
      url: "/",
      icon: <Image src="/images/icon-drop-white.png" width="128" height="128" alt="Icon" className="w-30 h-auto" />,
      title: "Drops",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      buttonText: "Create Drops",
      buttonIcon: (
        <Image
          src="/images/icon-drop-black.png"
          width="24"
          height="24"
          alt="Icon"
          className="w-[18px] h-[18px] object-contain"
        />
      ),
      background: (
        <Image
          src="/images/bg-drop.png"
          width="1000"
          height="1000"
          alt="Icon"
          className="absolute top-0 right-0 w-full h-auto opacity-50 z-1"
        />
      ),
    },
  },
];

interface ModalCreateProjectProps {
  isOpen: boolean;
  onClose?: (onClose: boolean) => void;
}

const ModalCreateProject = ({ isOpen, onClose }: ModalCreateProjectProps) => {
  const swiperRef = useRef<any>(null);

  const [activeProject, setActiveProject] = useState<any>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
  const [isTry, setIsTry] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) onClose(false);
  };

  const goToNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl text-left transition-all">
                <button
                  className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-white rounded-full z-5"
                  onClick={closeModal}
                >
                  <Icon icon="heroicons-outline:x" className="text-2xl" />
                </button>

                <div
                  className="w-full h-full px-4 pt-8 pb-16 bg-cover"
                  style={{ backgroundImage: `url("./images/bg-cooking.jpg")` }}
                >
                  <div className="flex flex-col items-center justify-center w-full max-w-[436px] h-full mx-auto text-center">
                    <Image
                      src="/images/btn-create.png"
                      width="1000"
                      height="1000"
                      alt="Button"
                      className="w-40 h-auto mb-14"
                    />
                    <p className="mb-2 text-sm">We’re still</p>
                    <p className="mb-2 text-[32px] font-bold">Cooking this feature.</p>
                    <p className="mb-18 text-sm">
                      We’re currently working hard on this page. Subscribe to our Newsletter to get update when it will
                      be live.
                    </p>
                    <ButtonV2 variant="1" rounded className="w-full" onClick={closeModal}>
                      <Icon icon="heroicons-solid:thumb-up" />
                      <span>Gotcha!</span>
                    </ButtonV2>
                  </div>
                </div>

                {/* TODO: Temp disabled for first deployment */}
                {/* <div className="grid grid-cols-12 w-full h-full">
                  <div className="col-span-4">
                    <div className="w-full px-8 py-10">
                      <p className="mb-12 text-2xl font-bold">Create Project</p>
                      <div className="space-y-2">
                        {projectsMenu.map((menu, index: number) => (
                          <button
                            key={index}
                            className="flex items-center w-full space-x-3 px-4 py-3 bg-transparent hover:bg-c-7 rounded-xl text-lg"
                            onClick={() => setActiveProject(index)}
                          >
                            {menu.icon}
                            <span>{menu.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8">
                    <div className="relative flex items-end w-full h-full p-10 bg-c-1 text-white">
                      {projectsMenu[activeProject].content.background}
                      <div className="relative max-w-sm z-2">
                        <div className="mb-9">{projectsMenu[activeProject].content.icon}</div>
                        <p className="mb-6 text-4xl font-bold">{projectsMenu[activeProject].content.title}</p>
                        <p className="mb-8 text-sm">{projectsMenu[activeProject].content.text}</p>
                        <Link
                          href={projectsMenu[activeProject].content.url}
                          className="inline-flex items-center justify-center w-auto h-12 px-6 space-x-3 rounded-full bg-white text-c-1"
                        >
                          {projectsMenu[activeProject].content.buttonIcon}
                          <span className="font-semibold">{projectsMenu[activeProject].content.buttonText}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCreateProject;
