import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import {
  userDataSelector,
  setPlayers,
  setGuesValue,
  setRoundFinished,
} from 'src/states/userData';

const LineChartCard = ({ socket }: { socket: any}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userDataSelector);
  const ref = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<string>('');
  const [players, setPlayersValue] = useState<any>([]);
  const [gues_value, setGuesValueState] = useState<number>(0);
  const [speed, setSpeedValue] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      var date = new Date();
      setTime(
        // date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        date.getHours() + ':' + date.getMinutes(),
      );
    }, 1000);
    if (ref.current) {
      var width = document.getElementById('div-canvas').offsetWidth;
      var height = document.getElementById('div-canvas').offsetHeight;
      var start_x = width * 0.05;
      var start_y = height - height * 0.15;
      var to_x = width - width * 0.05;
      var to_y = height - height * 0.15;
      var counter_x: number = 0;
      var counter_y: number = 0;
      var line_x: any = [];
      var line_y: any = [];
      var x = start_x + start_x * counter_x;
      var y = to_y - counter_y;
      const ctx: any = ref.current.getContext('2d');

      let refreshCanvasData = () => {
        width = document.getElementById('div-canvas').offsetWidth;
        height = document.getElementById('div-canvas').offsetHeight;
        start_x = width * 0.05;
        start_y = height - height * 0.15;
        to_x = width - width * 0.05;
        to_y = height - height * 0.15;
        counter_x = 0;
        counter_y = 0;
        line_x = [];
        line_y = [];
        x = start_x + start_x * counter_x;
        y = to_y - counter_y;
      };

      let PIXEL_RATIO: number = (() => {
        var dpr = window.devicePixelRatio || 1,
          bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;

        return dpr / bsr;
      })();

      let createHiDPICanvas = (w: number, h: number) => {
        let ratio = PIXEL_RATIO;
        var can: any = document.getElementById('line-chart');
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + 'px';
        can.style.height = h + 'px';
        can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
        return can;
      };

      let drawText = (
        str: string,
        ctx: any,
        x: number,
        y: number,
        color: string,
      ) => {
        ctx.textAlign = 'center';
        ctx.fillStyle = color;
        ctx.font = 'bold 40pt Calibri';
        ctx.fillText(str, x, y);
      };

      let drawLineTicks = (
        ctx: any,
        move_x: number,
        move_y: number,
        to_x: number,
        to_y: number,
        lineWidth: number,
        color: string,
      ) => {
        ctx.beginPath();
        ctx.moveTo(move_x, move_y);
        ctx.lineWidth = lineWidth;
        ctx.lineTo(to_x, to_y);
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.lineWidth = lineWidth;
        ctx.font = 'normal 10pt Calibri';
        for (var i = 0; i <= 10; i += 1) {
          ctx.fillText(i + '', move_x + (to_x / 11) * i + 5, move_y + 20);
        }
      };

      let drawCircle = (
        ctx: any,
        centerX: number,
        centerY: number,
        radius: number,
      ) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#fdc12c';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#fdc12c';
        ctx.stroke();
      };

      let drawLine = (line_x: any, line_y: any, lineWidth: number) => {
        for (var i = 0; i < line_x.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(line_x[i], line_y[i]);
          ctx.lineWidth = lineWidth;
          ctx.lineTo(line_x[i + 1], line_y[i + 1]);
          ctx.strokeStyle = '#f06b67';
          ctx.stroke();
        }
      };

      var canvas = createHiDPICanvas(
        document.getElementById('div-canvas').offsetWidth,
        document.getElementById('div-canvas').offsetHeight,
      );

      drawText('0.00X', ctx, width / 2, 100, 'white');
      drawLineTicks(ctx, start_x, start_y, to_x, to_y, 0.5, 'gray');
      drawLine(line_x, line_y, 2);
      drawCircle(ctx, x, y, 5);
      let startDraw = (speed: number, gues_value: number, players: any) => {
        const drawInterval = setInterval(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // if (start_x + start_x * counter_x > to_x || to_y - counter_y < 80) {
          if (
            parseFloat(counter_x + '').toFixed(2) ==
            parseFloat(gues_value + '').toFixed(2)
          ) {
            drawText(
              parseFloat(counter_x + '').toFixed(2) + 'X',
              ctx,
              width / 2,
              100,
              '#f06b67',
            );
            socket.emit(
              'gameFinished',
              JSON.stringify({
                players: players,
                gues_value: gues_value,
              }),
            );
            dispatch(setRoundFinished(true));
            clearInterval(drawInterval);
          } else {
            drawText(
              parseFloat(counter_x + '').toFixed(2) + 'X',
              ctx,
              width / 2,
              100,
              'white',
            );
          }
          counter_x += 0.01;
          counter_y += Math.pow(1.9, counter_x - 10);
          var x = start_x + start_x * counter_x * 1.73;
          var y = to_y - counter_y * 1.73;
          line_x.push(x);
          line_y.push(y);
          drawLineTicks(ctx, start_x, start_y, to_x, to_y, 0.5, 'gray');
          drawLine(line_x, line_y, 2);
          drawCircle(ctx, x, y, 5);
        }, 4 / speed);
      };

      socket.on('gameStarted', (data: any) => {
        data = JSON.parse(data);
        dispatch(setPlayers(data.players));
        dispatch(setGuesValue(parseFloat(data.gues_value)));
        setPlayersValue(data.players);
        setGuesValueState(parseFloat(data.gues_value));
        setSpeedValue(data.speed);
        refreshCanvasData();
        startDraw(data.speed, data.gues_value, data.players);
      });
    }
  }, []);
  return (
    <>
      <div className=" flex flex-col min-w-0 break-words w-full mb-1 ">
        <div className="flex-auto">
          <div className="flex flex-row ">
            <div className="w-full lg:w-1/3 mr-2 mb-2 shadow-lg rounded bg-gradient-to-l from-gray-800 px-2 py-3">
              <div className="flex flex-row items-center">
                <div className="w-full lg:w-4/12">
                  <img src="./img/medal.png" width={40 + 'px'} />
                </div>
                <div className="w-full justify-center lg:w-4/12 font-bold text-white text-center">
                  {userData.final_score}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 mb-2 shadow-lg rounded bg-gradient-to-l from-gray-800 px-2 py-3">
              <div className="flex flex-row items-center">
                <div className="w-full lg:w-4/12 ">
                  <img src="./img/person.png" width={40 + 'px'} />
                </div>
                <div className="w-full lg:w-4/12 text-white font-bold text-center">
                  {userData.name}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 ml-2 mb-2 shadow-lg rounded bg-gradient-to-l from-gray-800 px-2 py-3 ">
              <div className="flex flex-row items-center">
                <div className="w-full lg:w-4/12">
                  <img src="./img/clock.png" width={40 + 'px'} />
                </div>
                <div className="w-full lg:w-4/12 text-white font-bold text-center">
                  {time}
                </div>
              </div>
            </div>
          </div>
          {/* Chart */}
          <div
            className=" shadow-lg rounded bg-slate-700 py-2 h-[350px]"
            id="div-canvas"
          >
            <canvas
              className="w-full h-full"
              id="line-chart"
              ref={ref}
            ></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default LineChartCard;
