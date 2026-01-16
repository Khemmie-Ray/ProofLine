"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppKitAccount } from "@reown/appkit/react";
import { useGetPortfolio } from "@/hooks/useGetPortfolio";

const Profile = () => {
  const { address } = useAppKitAccount();
  const { questions, isLoading, stats } = useGetPortfolio(address as `0x${string}`);

  console.log(questions, stats);


  return (
    <main className="lg:w-[30%] mx-auto md:w-[40%] w-[90%] my-12">
      <section className="flex justify-between items-center border border-black/20 px-2 text-[12px] rounded-lg py-4">
        <div className="w-[32%] text-center">
          <p className="uppercase mb-2">Seeks</p>
          <p className="font-bold text-[20px]">{stats === null ? 0 : stats?.questionsAsked}</p>
        </div>
        <div className="w-[32%] text-center border-r  border-l border-black/20">
          <p className="uppercase mb-2">Assess</p>
          <p className="font-bold text-[20px]">{stats === null ? 0 : stats?.questionsVotedOn}</p>
        </div>
        <div className="w-[32%] text-center">
          <p className="uppercase mb-2">Comments</p>
          <p className="font-bold text-[20px]">{stats === null ? 0 : stats?.commentsMade}</p>
        </div>
      </section>
      <section className="my-5">
        {isLoading ? (
          <p className="text-center text-sm">Loading questions…</p>
        ) : questions.length > 0 ? (
          questions.map((info) => (
            <Link href={`/profile/${info.id}`} key={info.id}>
              <div className="border border-black/20 rounded-lg p-4 shadow-md mb-3">
                <h2 className="text-[18px] font-bold mb-2">Question</h2>

                <p className="text-[14px] mb-3">{info.ask}</p>

                <div className="flex justify-between items-center px-2 text-[12px] rounded-lg py-4 my-2">
                  <div className="w-[48%] text-center border-r border-black/20">
                    <p className="uppercase mb-2">{info.optionA}</p>
                    <p className="font-bold text-[20px]">{info.votesForA}</p>
                  </div>
                  <div className="w-[48%] text-center">
                    <p className="uppercase mb-2">{info.optionB}</p>
                    <p className="font-bold text-[20px]">{info.votesForB}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="border border-black/20 rounded-lg p-4 shadow-md mb-3 text-center flex justify-between items-center">
            <Image 
             src="https://res.cloudinary.com/dy7el0ucd/image/upload/v1768590857/1159069_2777_jdligs.png"
             alt=""
             width={200}
             height={200}
             className="rounded-lg mb-2 w-1/3"
            />
            <p className="font-semibold">Oops! Empty portfolio. <br /><span className="font-normal">Get started with a new <Link href='/seek' className="font-semibold underline">seek</Link></span> .</p>
          </div>
        )}
        </section>
    </main>
  );
};

export default Profile;
