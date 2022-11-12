export const formatPhoneNumber = (phoneNumberString: string) => {
  if (!phoneNumberString) return;

  const first = phoneNumberString.slice(0, 4);
  const second = phoneNumberString.slice(4, 7);
  const third = phoneNumberString.slice(7, 10);

  return `${first} ${second} ${third}`;
};
