import Image from "next/image";
import { useEffect, useState } from "react";

const ImageOn = ({ src, ...rest }: any) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...rest}
      src={imageSrc}
      // onLoadingComplete={result => {
      //   if (result.naturalWidth === 0) {
      //     // Broken image
      //     setImageSrc(fallbackSrc);
      //   }
      // }}
      onError={() => {
        setImageSrc('/images/placeholder.jpg');
      }}
    />
  );
};

export default ImageOn;
