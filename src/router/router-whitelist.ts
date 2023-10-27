export const whiteList = ["login", "list", "forgot-passwd", "register"];

export const toIsInWl = (path: string) => {
  return whiteList.includes(path);
};
