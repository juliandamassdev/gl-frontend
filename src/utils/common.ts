export const shrinkAddress = (address: string) => {
  let shrinkAddress = address.length > 6 ? address.substr(0, 6) + "..." + address.substr(address.length - 4) : address;

  return shrinkAddress;
};
