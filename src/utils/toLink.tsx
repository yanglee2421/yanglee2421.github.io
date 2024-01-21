export function toLink(str: unknown, msg = "") {
  if (typeof str !== "string") {
    return msg;
  }

  if (!str) {
    return msg;
  }

  const groups =
    /^(?<prefix>.*)(?<link>https?:\/\/.+\.\w{2,3}(:\d{2,5})?(\/\w+)*)(?<suffix>.*)$/gis.exec(
      str
    )?.groups;

  if (!groups) {
    return msg;
  }

  const link = groups.link;

  return Object.values({
    ...groups,
    link: (
      <a key={link} href={link} target="_blank">
        {link}
      </a>
    ),
  });
}
