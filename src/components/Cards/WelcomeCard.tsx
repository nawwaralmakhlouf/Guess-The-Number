import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import {
  userDataSelector,
  setName,
  setSpeed,
  setMultiplier,
  setRoundStarted,
  setScore,
  setPoints,
  setPlayers,
  setAccepted,
} from 'src/states/userData';

const WelcomeCard = ({ socket }: { socket: any}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userDataSelector);
  const [name, setNameValue] = useState<string>('');
  const [speed, setSpeedValue] = useState<number>(0);
  const [points, setPointsValue] = useState<number>(0);
  const [multiplier, setMultiplierValue] = useState<number>(0);

  let players = [
    { key: 1, name: 'You', points: '-', multiplier: '-', score: 0 },
    { key: 2, name: 'CPU 1', points: '-', multiplier: '-', score: 0 },
    { key: 3, name: 'CPU 2', points: '-', multiplier: '-', score: 0 },
    { key: 4, name: 'CPU 3', points: '-', multiplier: '-', score: 0 },
    { key: 5, name: 'CPU 4', points: '-', multiplier: '-', score: 0 },
  ];

  socket.on('gameFinished', (data: any) => {
    data = JSON.parse(data);
    dispatch(setScore(parseFloat(data.players[0].score).toFixed(2)));
    dispatch(setPlayers(data.players));
  });

  return (
    <>
      {userData.accepted && (
        <div>
          <div className="flex flex-row ">
            <div className="w-full lg:w-1/2 mr-2 mb-2  shadow-lg rounded bg-gradient-to-l from-gray-800 px-2 py-2">
              <div className="w-full text-center text-white text-xs">
                Points
              </div>
              <div className="flex items-center">
                <div className="w-3/12">
                  <button
                    className="border rounded text-white mr-2"
                    onClick={(e) => {
                      setPointsValue(points > 0 ? points - 1 : 0);
                      dispatch(setPoints(points > 0 ? points - 1 : 0));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-6/12 mb-1">
                  <input
                    className="rounded w-full h-[25px] text-white"
                    type="number"
                    min="0"
                    max="10"
                    value={points}
                    onChange={(e) => {
                      let points =
                        parseInt(e.target.value) > 0
                          ? parseInt(e.target.value)
                          : Math.abs(parseInt(e.target.value));
                      setPointsValue(points);
                      dispatch(setPoints(points));
                    }}
                  />
                </div>
                <div className="w-3/12">
                  <button
                    className="border rounded text-white ml-2"
                    onClick={(e) => {
                      setPointsValue(points + 1);
                      dispatch(setPoints(points + 1));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mr-2 mb-2 shadow-lg rounded bg-gradient-to-l from-gray-800 px-2 py-2">
              <div className="w-full text-center text-white text-xs">
                Multiplier
              </div>
              <div className="flex items-center">
                <div className="w-3/12">
                  <button
                    className="border rounded text-white mr-2"
                    onClick={(e) => {
                      setMultiplierValue(
                        multiplier > 0 ? multiplier - 0.01 : 0,
                      );
                      dispatch(
                        setMultiplier(multiplier > 0 ? multiplier - 0.01 : 0),
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-6/12 mb-1">
                  <input
                    className="rounded w-full h-[25px] text-white"
                    type="number"
                    max="10"
                    step={0.01}
                    min="0"
                    value={multiplier}
                    onChange={(e) => {
                      let multiplier =
                        parseFloat(e.target.value) > 0
                          ? parseFloat(e.target.value)
                          : Math.abs(parseFloat(e.target.value));
                      setMultiplierValue(multiplier);
                      dispatch(setMultiplier(multiplier));
                    }}
                  />
                </div>
                <div className="w-3/12">
                  <button
                    className="border rounded text-white ml-2"
                    onClick={(e) => {
                      setMultiplierValue(multiplier + 0.01);
                      dispatch(setMultiplier(multiplier + 0.01));
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="w-full rounded h-10 text-white 
            mb-2
            mt-1
            disabled:from-gray-500  disabled:bg-gray-500  bg-gradient-to-r from-pink-500 to-red-500 hover:bg-red-400"
            disabled={!userData.can_start_round}
            onClick={() => {
              players =
                userData.players.length > 0
                  ? JSON.parse(JSON.stringify(userData.players))
                  : players;
              players[0].multiplier = parseFloat(
                userData.multiplier + '',
              ).toFixed(2);
              socket.emit(
                'gameStarted',
                JSON.stringify({
                  players: players,
                  speed: userData.speed,
                  points: userData.points,
                }),
              );
              dispatch(setRoundStarted(true));
            }}
          >
            Start
          </button>
          <div className="flex flex-col min-w-0 break-words w-full">
            <div className="flex-auto">
              <div className="flex py-1 flex-col">
                <div className="text-white flex mb-2 mr-2 items-center">
                  <img
                    className="mr-2"
                    src="./img/round.png"
                    width={20 + 'px'}
                    height={20 + 'px'}
                  />
                  Current Round
                </div>
                <div className="relative flex flex-col min-w-0 break-words  text-white w-full bg-slate-700  rounded">
                  <table className="w-full text-xs text-left">
                    <thead className="text-xs text-white uppercase">
                      <tr className="text-center text-xs">
                        <th scope="col" className="py-1 text-xs">
                          Name
                        </th>
                        <th scope="col" className="py-1 text-xs">
                          Point
                        </th>
                        <th scope="col" className=" py-1 text-xs">
                          Multiplier
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(userData.players.length > 0
                        ? userData.players
                        : players
                      ).map((elem: any) => (
                        <tr
                          key={elem?.key}
                          className={
                            'border-b text-center text-xs ' +
                            (elem?.name == 'You'
                              ? 'bg-gray-500'
                              : elem?.key % 2 == 0
                              ? 'bg-slate-500'
                              : 'bg-salte-200') +
                            (userData.round_finished
                              ? parseFloat(elem?.multiplier) >
                                parseFloat(userData.gues_value + '')
                                ? ' text-red-400'
                                : ' text-green-400'
                              : ' text-white')
                          }
                        >
                          <th scope="row">{elem?.name}</th>
                          <td className="py-1">{elem?.points}</td>
                          <td className="py-1">{elem?.multiplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-w-0 break-words w-full">
            <div className="flex-auto">
              <div className="flex py-1 flex-col">
                <div className="text-white flex mb-2 items-center">
                  <img
                    className="mr-2"
                    src="./img/speed.png"
                    width={20 + 'px'}
                    height={20 + 'px'}
                  />
                  Speed
                </div>
                <div className="flex flex-col min-w-0 break-words  text-white w-full bg-slate-700  rounded p-3 h-[60px]">
                  <input
                    type="range"
                    className="w-full accent-red-400 bg-red-400"
                    value={speed}
                    min="0"
                    max="4"
                    step="1"
                    onChange={(e) => {
                      setSpeedValue(parseInt(e.target.value));
                      dispatch(setSpeed(parseInt(e.target.value)));
                    }}
                  />
                  <ul className="flex justify-between w-full px-[10px]">
                    <li
                      className={
                        'flex justify-center relative' +
                        (userData.speed >= 0 ? ' text-red-400' : '')
                      }
                    >
                      <span className="absolute">1x</span>
                    </li>
                    <li
                      className={
                        'flex justify-center relative' +
                        (userData.speed >= 1 ? ' text-red-400' : '')
                      }
                    >
                      <span className="absolute">2x</span>
                    </li>
                    <li
                      className={
                        'flex justify-center relative' +
                        (userData.speed >= 2 ? ' text-red-400' : '')
                      }
                    >
                      <span className="absolute">3x</span>
                    </li>
                    <li
                      className={
                        'flex justify-center relative' +
                        (userData.speed >= 3 ? ' text-red-400' : '')
                      }
                    >
                      <span className="absolute">4x</span>
                    </li>
                    <li
                      className={
                        'flex justify-center relative' +
                        (userData.speed >= 4 ? ' text-red-400' : '')
                      }
                    >
                      <span className="absolute">5x</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!userData.accepted && (
        <div className="flex flex-col min-w-0 break-words w-full mb-1 shadow-lg rounded bg-slate-700">
          <div className="p-3 flex-auto">
            <div className="flex flex-col h-[400px]">
              <p className="text-white text-lg text-center mb-12 mt-12">
                Welcome
              </p>
              <p className="text-white text-xs text-center mb-1">
                Please Enter Your Name
              </p>
              <input
                className="bg-slate-100 text-white w-full rounded h-10 hover:bg-sky-700"
                type="text"
                onChange={(e) => setNameValue(e.target.value)}
              />
              <button
                className="w-full rounded h-10 text-white disabled:from-gray-500  disabled:bg-gray-500  bg-gradient-to-r from-pink-500 to-red-500 hover:bg-red-400 mt-2"
                disabled={name.length < 2}
                onClick={() => {
                  dispatch(setName(name));
                  dispatch(setAccepted(true));
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeCard;
