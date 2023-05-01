import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import { userDataSelector } from 'src/states/userData';

const RankingCard = ({ socket }: { socket: any}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userDataSelector);

  let players = [
    { key: 1, name: '-', points: '-', multiplier: '-', score: '-' },
    { key: 2, name: '-', points: '-', multiplier: '-', score: '-' },
    { key: 3, name: '-', points: '-', multiplier: '-', score: '-' },
    { key: 4, name: '-', points: '-', multiplier: '-', score: '-' },
    { key: 5, name: '-', points: '-', multiplier: '-', score: '-' },
  ];

  return (
    <>
      <div className="flex flex-col min-w-0 break-words w-full  rounded">
        <div className="flex-auto">
          <div className="flex p-2 flex-col h-[200px]">
            <div className="text-white flex mb-2 mr-2 items-center">
              <img
                className="mr-2"
                src="./img/ranking.png"
                width={20 + 'px'}
                height={20 + 'px'}
              />
              Ranking
            </div>
            <div className="relative flex flex-col min-w-0 break-words  text-white w-full mb-1 bg-slate-700  rounded">
              <table className="w-full text-xs text-left">
                <thead className="text-xs text-white uppercase">
                  <tr className="text-center text-xs">
                    <th scope="col" className="py-1 text-xs">
                      No.
                    </th>
                    <th scope="col" className="py-1 text-xs">
                      Name
                    </th>
                    <th scope="col" className=" py-1 text-xs">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(userData.players.length > 0
                    ? JSON.parse(JSON.stringify(userData.players))
                    : players
                  )
                    .sort((a: any, b: any) => b.score - a.score)
                    .map((elem: any, index: number) => (
                      <tr
                        key={elem?.key}
                        className={
                          'border-b text-center text-xs ' +
                          (elem?.name == 'You'
                            ? 'bg-gray-500'
                            : elem?.key % 2 == 0
                            ? 'bg-slate-500'
                            : 'bg-salte-200')
                        }
                      >
                        <th scope="row">{index + 1}</th>
                        <td className="py-1">{elem?.name}</td>
                        <td className="py-1">{elem?.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RankingCard;
