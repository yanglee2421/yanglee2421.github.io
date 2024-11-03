import React from "react";

export function Camera(
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if ((video instanceof HTMLVideoElement)) {
      handleCamera(video);
    }
  }, []);

  const handleCutImage = () => {
    const video = videoRef.current;

    if (!(video instanceof HTMLVideoElement)) {
      return;
    }

    const cvs = document.createElement("canvas");
    const ctx = cvs.getContext("2d");
    if (!ctx) {
      return;
    }

    const size = video.getBoundingClientRect();
    cvs.width = size.width;
    cvs.height = size.height;
    ctx.drawImage(
      video,
      0,
      0,
      size.width,
      size.height,
      0,
      0,
      cvs.width,
      cvs.height,
    );

    const link = document.createElement("a");
    link.href = cvs.toDataURL();
    link.download = Date.now() + ".png";
    link.click();
    link.remove();
  };

  return (
    <>
      <video ref={videoRef} {...props}></video>
      <button onClick={handleCutImage}>cut image</button>
    </>
  );
}

async function handleCamera(video: HTMLVideoElement) {
  const size = video.getBoundingClientRect();
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: size.width,
      height: size.height,
    },
    audio: false,
  });
  video.srcObject = mediaStream;
  video.onloadedmetadata = video.play.bind(video);
}
