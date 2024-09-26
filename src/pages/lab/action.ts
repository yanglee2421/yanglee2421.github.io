import { type ActionFunction } from "react-router-dom";

export const action: ActionFunction = async (args) => {
  console.log("action run");

  const formData = await args.request.formData();

  return Object.fromEntries(formData.entries());
};
