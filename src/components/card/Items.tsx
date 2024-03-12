import Image from "next/image";

const Items = (props: any) => {
  // const { selection, dispatch2 } = React.useContext(ObjectSelection);
  // const { objects, dispatch1 } = React.useContext(ObjectContext);

  let elements = props.hashedFolder;
  // if (objects && objects.length && props.isExample) {
  //   elements = objects;
  // }

  return (
    <div className="relative cursor-pointer group">
      <div className="w-full p-2 bg-c-7 group-hover:bg-c-4 rounded-lg transition-all">
        <div className="mb-2 rounded overflow-hidden">
          <div className="relative w-full h-full pb-[100%]">
            <div id="token-image" className="absolute top-0 left-0 w-full h-full">
              {elements &&
                elements.map((file: any, index: any) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={index} src={file.path} alt="x" className="absolute left-0 top-0 w-full h-full" />
                ))}
            </div>
          </div>
          {/* <Image src="/images/nft-1.jpg" width="200" height="200" alt="Token" className="w-full h-full object-cover" /> */}
        </div>
        <p>Token #{props.number}</p>
      </div>
    </div>
  );
};

export default Items;
