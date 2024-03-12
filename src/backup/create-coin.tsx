import { useState } from "react";
import CreateCoinTypeSelection from "@/components/sections/create-coin/CreateCoinTypeSelection";
import CreateCoinContractForm from "@/components/sections/create-coin/CreateCoinContractForm";
import CreateCoinPageForm from "@/components/sections/create-coin/CreateCoinPageForm";

const CreateCoin = () => {
  const [selectedCoinType, setSelectedCoinType] = useState<string>();
  const [step, setStep] = useState<number>(3);
  const [coin, setCoin] = useState<any>({
    description: "Desc",
    imageURL: "http://localhost:3001/server-images/1f2fe65d-65a2-4e44-88cf-d5f14cef623b",
    coverImageURL: "http://localhost:3001/server-images/937bb8f0-6aca-4a36-b7fb-9bd25e18cfe2",
    config: {
      teamAddr: [],
    },
    links: {
      website: "website",
      twitter: "twitter",
      facebook: "facebook",
    },
    _id: "65a082c61d36c902249eb541",
    createdBy: "64b838f635fc66ff367ff678",
    createdAt: "2024-01-12T00:07:34.829Z",
    updatedAt: "2024-01-12T00:07:34.829Z",
    __v: 0,
  });

  const handleOnCoinTypeSelect = (type: string) => {
    setSelectedCoinType(type);
    if (type) {
      setStep(2);
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="bg-[#141414] min-h-screen">
          <CreateCoinTypeSelection onCoinTypeSelect={value => handleOnCoinTypeSelect(value)} />
        </div>
      )}
      {step === 2 && (
        <div className="bg-custom-1 min-h-screen">
          <CreateCoinPageForm
            onCoinPageDone={coin => {
              setStep(3);
              setCoin(coin);
            }}
          />
        </div>
      )}
      {step === 3 && (
        <div className="bg-custom-1 min-h-screen">
          <CreateCoinContractForm coin={coin} />
        </div>
      )}
    </>
  );
};

export default CreateCoin;
