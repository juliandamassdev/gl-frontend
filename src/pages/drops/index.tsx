import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/api";
import Image from "next/image";
import LayoutScreen from "@/layouts/LayoutScreen";
import Link from "next/link";

const Drops = () => {
  const router = useRouter();

  const [initialLoad, setInitialLoad] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    handleUploadFiles();
  }, [selectedFiles]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    disabled: isLoading,
  });

  const handleUploadFiles = async () => {
    if (selectedFiles.length <= 0) {
      toast.error("Please select an image");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    // selectedFiles &&
    //   selectedFiles.forEach((file: any) => {
    //     let path = file.path.split("/")[2];
    //     formData.append(path, file);
    //   });

    let path = (selectedFiles[0] as any).path.split("/")[2];
    formData.append(path, selectedFiles[0]);

    try {
      const responseUpload = await axiosInstance.post("/server-images/upload", formData);
      const image = responseUpload.data.data.imageURL;
      setIsUploaded(true);
      setTimeout(() => {
        router.push(`/drops/token?image=${encodeURI(image)}`);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error("handleUploadFiles");
    }
  };

  return (
    <>
      <LayoutScreen noBackgroundImage>
        <div className="w-full px-6">
          <Link href="/">
            <button className="absolute left-4 lg:left-6 top-8 flex items-center justify-center w-[42px] h-[42px] bg-c-10 rounded-full">
              <Icon icon="heroicons:chevron-left" className="text-2xl" />
            </button>
          </Link>
          <div className="flex items-center justify-center w-full py-12">
            <div className="flex flex-col w-full max-w-3xl mx-auto">
              <div className="w-full max-w-xl mx-auto">
                <div className="px-16 mb-10 text-center">
                  <h2 className="mb-4 text-[40px] font-bold">Upload your item</h2>
                  <p>You can only upload a single image here. Be prepared to upload more on the following page.</p>
                </div>
                <div className="w-full" {...getRootProps()}>
                  <input {...getInputProps()} directory="" webkitdirectory="" type="file" />
                  <div className="flex items-center justify-center w-full h-[440px] p-12 bg-gl-dark-1 border border-dashed border-white rounded-2xl">
                    <div className="text-center">
                      <Image
                        src="/images/upload.png"
                        width="200"
                        height="200"
                        alt="Upload"
                        className="w-[188px] mb-6"
                      />
                      <p className="text-[32px] font-bold mb-2.5">Drag & Drop</p>
                      <p className="text-sm">
                        your image here or <span className="text-gl-blue-1 underline cursor-pointer">browse</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutScreen>

      {selectedFiles.length > 0 && (
        <div
          className={`fixed right-6 w-96 pb-6 bg-white rounded-2xl overflow-hidden transition-all z-20 ${
            isLoading ? "bottom-6" : "-bottom-52"
          }`}
        >
          <div className="text-center py-4 border-b border-[#E4E4E4]">
            <div className="inline-flex px-6 py-1.5 bg-c-1 text-white rounded-full text-xxs">Upload Progress</div>
          </div>
          <div className="px-4 py-3 border-b border-[#E4E4E4] space-y-2">
            {/* {selectedFiles.map((file, index) => ( */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <Icon icon="bi:image" className="text-lg" />
                <p>{selectedFiles[0].name}</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="px-3 py-0.5 border border-c-5 rounded-full text-[8px]">
                  {Math.round(selectedFiles[0].size / 1024)} kB
                </div>
                {isUploaded ? (
                  <Icon icon="heroicons:check-circle-20-solid" className="w-6 h-6 text-[#58CB55]" />
                ) : (
                  <Icon icon="line-md:loading-twotone-loop" className="w-6 h-6" />
                )}
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Drops;

Drops.requireAuth = true;
