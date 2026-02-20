const reg =
  /^(?<prefix>.*)(?<link>https?:\/\/.+\.\w{2,3}(:\d{2,5})?(\/\w+)*)(?<suffix>.*)$/gis;

type StringToLinkProps = {
  str: string;
  msg?: string;
};

export const StringToLink = ({ str, msg = "" }: StringToLinkProps) => {
  if (typeof str !== "string") {
    return msg;
  }

  if (!str) {
    return msg;
  }

  const groups = reg.exec(str)?.groups;

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
};
