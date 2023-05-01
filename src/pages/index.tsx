import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import io from 'socket.io-client';
import WelcomeCard from 'src/components/Cards/WelcomeCard';
import ChatCard from 'src/components/Cards/ChatCard';
import RankingCard from 'src/components/Cards/RankingCard';
import LineChartCard from 'src/components/Cards/LineChartCard';
interface Props {
  query: { name?: string };
}

const Home: NextPage<Props> = () => {
  const socket = io('http://localhost:3000');

  return (
    <>
      <div className="flex flex-col md:flex-col md:flex-col lg:flex-row">
        <div className="sm:w-8/12 mx-auto mt-2">
          <div className="flex flex-col md:flex-col md:flex-col lg:flex-row ">
            <div className=" sm:w-12/12 xl:w-4/12 px-2">
              <WelcomeCard socket={socket} />
            </div>
            <div className=" mb-12 md:w-12/12 xl:w-8/12 md:mb-0 px-2">
              <LineChartCard socket={socket} />
            </div>
          </div>
          <div className="flex flex-col mt-0 md:flex-col md:flex-col lg:flex-row">
            <div className="  mb-12 md:w-12/12 xl:w-6/12 md:mb-0 px-1">
              <RankingCard socket={socket} />
            </div>
            <div className=" xl:w-6/12 md:w-12/12 px-1">
              <ChatCard socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
