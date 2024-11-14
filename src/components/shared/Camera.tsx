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

  return <video ref={videoRef} {...props}></video>;
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
