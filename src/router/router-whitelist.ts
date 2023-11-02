export const whiteList = [
  "login",
  "list",
  "forgot-passwd",
  "register",
  "privacy-policy",
];

export const toIsInWl = (path: string) => {
  return whiteList.includes(path);
};
