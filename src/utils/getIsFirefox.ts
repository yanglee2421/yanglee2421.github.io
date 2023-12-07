/**
 * @description Get a boolean indicating whether the current browser is Firefox
 * @returns If it is currently Firefox, it is true, otherwise it is false.
 */
export function getIsFirefox() {
  return navigator.userAgent.includes("Firefox");
}
