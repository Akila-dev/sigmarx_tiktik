import React, { useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6 w-full">
      <div className="flex gap-3 py-2 pr-5 md:p-2 cursor-pointer font-semibold rounded">
        <div className="md:w-16 md:h-16 w-10 h-10">
          <Link href="/">
            <>
              <Image
                width={62}
                height={62}
                className="rounded-full object-cover"
                src={post.postedBy.image}
                alt={post.postedBy.userName}
                layout="responsive"
              />
            </>
          </Link>
        </div>
        <div>
          <Link href="/">
            <div className="flex items-center gap-2">
              <p className="flex gap-2 items-center md:text-md leading-5 font-bold text-primary">
                {post.postedBy.userName}{" "}
                <GoVerified className="text-blue-400 md:text-md text-lg" />
              </p>
              <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className="xl:w-[300px] md:w-[250px] h-[350px] md:h-[420px] xl:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100 object-contain"
              src={post.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-0 flex gap-10 justify-between xl:w-[300px] md:w-[250px] w-[200px] p-3">
              {playing ? (
                <button
                  onClick={onVideoPress}
                  className="bg-black rounded-full p-2"
                >
                  <BsFillPauseFill className="text-white text-2xl lg:text-2xl" />
                </button>
              ) : (
                <button
                  onClick={onVideoPress}
                  className="bg-black rounded-full p-2"
                >
                  <BsFillPlayFill className="text-white text-2xl lg:text-2xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button
                  onClick={() => setIsVideoMuted(false)}
                  className="bg-black rounded-full p-2"
                >
                  <HiVolumeOff className="text-white text-2xl lg:text-2xl" />
                </button>
              ) : (
                <button
                  onClick={() => setIsVideoMuted(true)}
                  className="bg-black rounded-full p-2"
                >
                  <HiVolumeUp className="text-white text-2xl lg:text-2xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
