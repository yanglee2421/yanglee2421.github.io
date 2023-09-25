// React Imports
import { useEffect, useState } from "react";

// Assets Imports
import bg from "@/assets/images/snow-village.jpg";

// Fabric Imports
import { fabric } from "fabric";

export function Fabric() {
  const [img, setImg] = useState("");

  useEffect(() => {
    void (async () => {
      const img = await new Promise<fabric.Image>((res) => {
        fabric.Image.fromURL(bg, res);
      });
      console.log("img", img);

      const text = new fabric.Text("hello world");
      console.log("text", text);

      const group = new fabric.Group([img, text]);
      console.log("group", group);

      text.set({ top: group.height + text.top - text.height });

      const dataURL = group.toDataURL({});
      setImg(dataURL);
    })();
  }, []);

  return (
    <>
      <img src={img} width={380} alt="fabric" />
    </>
  );
}
