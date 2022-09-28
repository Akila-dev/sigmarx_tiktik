import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton: NextPage<IProps> = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="relative cursor-pointer translate-y-[0.21rem]">
      {alreadyLiked ? (
        <div>
          <MdFavorite className="text-[#f51997]" />
          <p
            className="text-xs lg:text-sm font-semibold text-black absolute left-[50%] p-1 top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full"
            onClick={handleDislike}
          >
            {likes?.length || 0}
          </p>
        </div>
      ) : (
        <div>
          <MdFavorite className="text-white" />
          <p
            className="text-xs lg:text-sm font-semibold text-black absolute left-[50%] p-1 top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-full h-full pt-2 lg:pt-3"
            onClick={handleLike}
          >
            {likes?.length || 0}
          </p>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
