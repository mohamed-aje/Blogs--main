export const dt = (input) => {
  let v = new Date(input);
  return v.toLocaleDateString("en-US");
};
