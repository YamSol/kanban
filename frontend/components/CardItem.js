import React, { useMemo } from "react"; // Importação do React e do useMemo hook.
import { PlusIcon, ChatAlt2Icon, PaperClipIcon } from "@heroicons/react/outline"; // Ícones importados do pacote Heroicons que eu mantive pois estava usando e mudei.
import { Draggable } from "react-beautiful-dnd";

// Componente funcional CardItem.
const CardItem = ({ data, index }) => {
  // Função para lidar com o clique no item do cartão.
  const handleCardItemClick = () => {
    console.log("Card Item Data:", data);
    console.log("Card Item Index:", index);
  };

  // Utilização do useMemo para otimizar o desempenho do componente.
  return useMemo(
    () => (
      // Draggable envolve o conteúdo que pode ser arrastado.
      <Draggable index={index} draggableId={data.id.toString()}>
        {(provided) => (
          // Div que representa o item do cartão.
          <div
            onClick={handleCardItemClick} // Manipulador de clique no item do cartão.
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
          >
            {/* Título do item. */}
            <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
            <p className="text-sm text-gray-500">Criado em: {new Date(data.createdAt).toLocaleString()}</p>
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center">
                {/* Ícones para chat e anexos (comentados) */}
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
    ),
    [data, index],
  );
};

export default CardItem;
