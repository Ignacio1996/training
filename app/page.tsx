"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const directions = ["↑", "↓", "←", "→", "↖", "↗", "↘", "↙"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Home() {
  const [active, setActive] = useState(false);
  const [currentDirection, setCurrentDirection] = useState("");
  const [timer, setTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [arrowChangeInterval, setArrowChangeInterval] = useState(1);

  useEffect(() => {
    let interval = null;

    if (active) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);

        if (timer === 40) {
          setTimer(0);
          setIsResting(false);
        } else if (timer === 30) {
          setIsResting(true);
        } else if (!isResting && timer % arrowChangeInterval === 0) {
          setCurrentDirection(
            directions[Math.floor(Math.random() * directions.length)]
          );
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active, timer, isResting, arrowChangeInterval]);

  const handleStartReset = () => {
    setActive(!active);
    if (!active) {
      setTimer(0);
      setIsResting(false);
      setCurrentDirection(
        directions[Math.floor(Math.random() * directions.length)]
      );
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="text-5xl p-5 font-bold">{timer}</div>
      </div>
      <div className="w-full flex justify-center py-4">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Change Every {arrowChangeInterval}s
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {[1, 2, 3, 4, 5].map((interval) => (
                  <Menu.Item key={interval}>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                        onClick={() => setArrowChangeInterval(interval)}
                      >
                        Every {interval}s
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="w-full items-center flex justify-center">
        <button
          type="button"
          onClick={handleStartReset}
          className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {active ? "Reset" : "Start"}
        </button>
      </div>
      <div className="text-center text-[20em] mt-10 w-full">
        {currentDirection}
      </div>
    </div>
  );
}

export default Home;
