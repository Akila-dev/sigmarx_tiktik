import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/logo.png";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  // const { userProfile, addUser, removeUser } = useAuthStore();
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div
      className="container border-b-2 border-gray-200 py-2 px-4"
      onMouseDown={() => setShowLogout(false)}
    >
      <div className="container flex justify-between items-center">
        <Link href="/">
          <div className="w-[100px] md:w-[130px]">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="TikTik"
              layout="responsive"
            />
          </div>
        </Link>
        <div className="uppercase">Search</div>
        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="border-2 px-2 md:px-4 py-1 rounded-md text-md font-semibold flex items-center gap-2">
                  <IoMdAdd className="text-xl" /> {` `}
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <div className="relative flex items-center">
                  <Link href="/">
                    <>
                      <Image
                        width={40}
                        height={40}
                        className="rounded-full object-cover cursor-pointer"
                        src={userProfile.image}
                        alt={"profile photo"}
                      />
                    </>
                  </Link>
                  <button
                    type="button"
                    className=" bg-white shadow-md rounded-full flex items-center gap-3 p-2 ml-6 font-semibold"
                    onClick={() => {
                      googleLogout();
                      removeUser();
                    }}
                  >
                    <AiOutlineLogout color="red" fontSize={21} className="" />
                  </button>
                  {/* {showLogout && (
                    <div className="absolute top-[100%] right-0 pt-3">
                      <button
                        type="button"
                        className=" bg-white shadow-md rounded-md flex items-center gap-3 px-6 py-2 font-semibold"
                        onClick={() => {
                          googleLogout();
                          removeUser();
                        }}
                      >
                        <AiOutlineLogout
                          color="red"
                          fontSize={21}
                          className=""
                        />
                        <span>Logout</span>
                      </button>
                    </div>
                  )} */}
                </div>
              )}
              {/* <button type="button">
                <AiOutlineLogout color="red" fontSize={21} className="" />
              </button> */}
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("error")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
