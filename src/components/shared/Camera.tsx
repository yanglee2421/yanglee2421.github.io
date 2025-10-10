import React from "react";

type CameraProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

export const Camera = (props: CameraProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (video instanceof HTMLVideoElement) {
      handleCamera(video);
    }
  }, []);

  return <video ref={videoRef} {...props}></video>;
};

const handleCamera = async (video: HTMLVideoElement) => {
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
};
