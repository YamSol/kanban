import React, { useMemo } from "react";
import {
  PlusIcon,
  ChatAlt2Icon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Draggable } from "react-beautiful-dnd";

const CardItem = ({ data, index }) => {
  const handleCardItemClick = () => {
    console.log("Card Item Data:", data);
    console.log("Card Item Index:", index);
  };

  return useMemo(() => (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          onClick={handleCardItemClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                data.priority === 0
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 0
              ? "Prioridade Baixa"
              : data.priority === 1
              ? "Prioridade Média"
              : "Prioridade Alta"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              {/* <span className="flex space-x-1 items-center">
                <ChatAlt2Icon className="w-4 h-4 text-gray-500" />
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <PaperClipIcon className="w-4 h-4 text-gray-500" />
                <span>{data.attachment}</span>
              </span> */}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  ), [data, index]);
};

export default CardItem;
