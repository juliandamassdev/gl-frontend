import Image from "next/image";

const ToolsMarketplace = () => {
  return (
    <div className="container-gl">
      <div className="pt-7 pb-12">
        <div className="container-gl">
          <h2 className="mb-14 text-[32px] font-bold">Featured Tools</h2>
        </div>
        <div className="space-y-12 mb-24">
          <div className="marketplace-featured-tools relative flex w-full h-[465px] px-14 pt-16 pb-18 rounded-3xl overflow-hidden">
            <div className="flex flex-col max-w-[548px]">
              <h2 className="text-[64px] text-white font-bold mb-6">Art Generator</h2>
              <p className="text-lg text-white">
                Effortlessly upload and generate your entire collection. Let our intuitive software do the heavy lifting
                for you. Just upload and separate your files into unique folders. It&apos;s that simple!
              </p>
              <div className="flex items-center space-x-3 w-auto mt-auto">
                <button className="inline-flex px-6 py-3 space-x-2 bg-c-1 border border-transparent rounded-full text-white font-semibold">
                  <span>Create Art Collection</span>
                </button>
                <button className="inline-flex px-6 py-3 space-x-2 bg-white border border-transparent rounded-full font-semibold">
                  <span>Learn more</span>
                </button>
              </div>
            </div>
            <Image
              src="/images/marketplace-featured-art-generator.png"
              width="3000"
              height="3000"
              alt="Image"
              className="absolute top-0 right-17 w-[517px]"
            />
          </div>
          <div className="marketplace-featured-tools relative flex w-full h-[465px] px-14 pt-16 pb-18 rounded-3xl overflow-hidden">
            <div className="flex flex-col max-w-[548px] ml-auto">
              <h2 className="text-[64px] text-white font-bold mb-6">Drops</h2>
              <p className="text-lg text-white">
                Transform your art, photography, designs, and creative masterpieces into exclusive NFTs effortlessly! No
                need to create hundreds or thousands of pieces; our Drops feature makes it easy to launch your
                collection with just a few exceptional items.
              </p>
              <div className="flex items-center space-x-3 w-auto mt-auto">
                <button className="inline-flex px-6 py-3 space-x-2 bg-white border border-transparent rounded-full font-semibold">
                  <span>Create Drops</span>
                </button>
                <button className="inline-flex px-6 py-3 space-x-2 bg-transparent border border-white rounded-full text-white font-semibold">
                  <span>Learn more</span>
                </button>
              </div>
            </div>
            <Image
              src="/images/marketplace-featured-drops.png"
              width="3000"
              height="3000"
              alt="Image"
              className="absolute top-9 left-[102px] w-[576px]"
            />
          </div>
          <div className="marketplace-featured-tools relative flex w-full h-[465px] px-14 pt-16 pb-18 rounded-3xl overflow-hidden">
            <div className="flex flex-col max-w-[548px]">
              <h2 className="text-[64px] text-white font-bold mb-6">Coin Token</h2>
              <p className="text-lg text-white">
                Create a blockchain integrated coin that reflects your unique identity and goals. Our intuitive
                interface provides a user-friendly canvas where you can define coin attributes, customize logos and
                symbols, and set tokenomics without any technical expertise.
              </p>
              <div className="flex items-center space-x-3 w-auto mt-auto">
                <button className="inline-flex px-6 py-3 space-x-2 bg-c-1 border border-transparent rounded-full text-white font-semibold">
                  <span>Create Coin Token</span>
                </button>
                <button className="inline-flex px-6 py-3 space-x-2 bg-white border border-transparent rounded-full font-semibold">
                  <span>Learn more</span>
                </button>
              </div>
            </div>
            <Image
              src="/images/marketplace-featured-coin-token.png"
              width="3000"
              height="3000"
              alt="Image"
              className="absolute top-0 right-0 w-[774px]"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-[64px] font-bold">Sign up to our newsletter </p>
          <p className="text-xl mb-5">Stay up to date with the latest announcement, news, and new features.</p>
          <div className="inline-flex items-center space-x-3">
            <input type="text" placeholder="Enter email" className="w-[400px] border rounded-xl px-4 py-3" />
            <button className="inline-flex items-center justify-center w-auto px-6 py-3 space-x-3 border border-c-1 bg-c-1 rounded-xl text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsMarketplace;
