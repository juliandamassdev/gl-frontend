import Button from "@/components/buttons/button";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

const ArtGeneratorContracts = () => {
  const router = useRouter();

  const uuid = router.query?.id as string;

  return (
    <LayoutDashboard>
      <section className="w-full max-w-[1464px] mx-auto px-4 lg:px-6">
        <div className="w-full py-10">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-[32px] font-bold">Ready to take off?</h1>
            <p className="text-gl-6">Lorem ipsum</p>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <div className="w-full px-9 py-8 border border-gl-5 rounded-3xl text-center">
                <Image
                  src="/images/contract-smart.png"
                  width="300"
                  height="300"
                  alt="Contract"
                  className="inline-flex w-72 h-48 mb-4 object-contain"
                />
                <h2 className="mb-2 text-2xl font-bold">Smart Contract</h2>
                <p className="mb-7 text-sm text-gl-5">
                  Enabling Collectors to mint your tokens is simple with our no-code Smart Contract tool!
                </p>
                <Link
                  href={`/art-generator/${uuid}/contracts/smart-contract`}
                  className="inline-block w-full px-4 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white"
                >
                  Manage Contract
                </Link>
              </div>
            </div>
            <div className="col-span-4">
              <div className="w-full px-9 py-8 border border-gl-5 rounded-3xl text-center">
                <Image
                  src="/images/contract-review.png"
                  width="300"
                  height="300"
                  alt="Contract"
                  className="inline-flex w-72 h-48 mb-4 object-contain"
                />
                <h2 className="mb-2 text-2xl font-bold">Review Summary</h2>
                <p className="mb-7 text-sm text-gl-5">
                  Enabling Collectors to mint your tokens is simple with our no-code Smart Contract tool!
                </p>
                <button type="button" className="w-full px-4 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white">
                  Manage Contract
                </button>
              </div>
            </div>
            <div className="col-span-4">
              <div className="w-full px-9 py-8 border border-gl-5 rounded-3xl text-center">
                <Image
                  src="/images/contract-download.png"
                  width="300"
                  height="300"
                  alt="Contract"
                  className="inline-flex w-72 h-48 mb-4 object-contain"
                />
                <h2 className="mb-2 text-2xl font-bold">Download Collection</h2>
                <p className="mb-7 text-sm text-gl-5">
                  Enabling Collectors to mint your tokens is simple with our no-code Smart Contract tool!
                </p>
                <button type="button" className="w-full px-4 py-3 bg-gl-1 border border-gl-1 rounded-lg text-white">
                  Manage Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutDashboard>
  );
};

export default ArtGeneratorContracts;
