// Importações dos componentes e pacotes necessários.
import Layout from "../components/Layout"; // Componente de layout.
import { ChevronDownIcon, PlusCircleIcon, XCircleIcon, DotsVerticalIcon } from "@heroicons/react/outline"; // Ícones importados do pacote HeroIcons.
import CardItem from "../components/CardItem"; // Componente de item de cartão.
import BoardData from "../data/board-data.json"; // Dados do quadro de exemplo.
import { DragDropContext, Droppable } from "react-beautiful-dnd"; // Importações para manipulação de arrastar e soltar.
import { useEffect, useState } from "react"; // Hooks do React para efeitos e estado.
import { useWindowSize } from '@react-hook/window-size'; // Importe o hook useWindowSize fornecido pelo pacote.

// Função para gerar um ID único para os cartões.
function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Componente principal Home.
export default function Home() {
  // Estado do componente.
  const [ready, setReady] = useState(false); // Estado para controlar se o componente está pronto.
  const [boardData, setBoardData] = useState(BoardData); // Estado para armazenar os dados do quadro.
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário.
  const [selectedBoard, setSelectedBoard] = useState(0); // Estado para armazenar o índice do quadro selecionado.
  const [showRemoveForm, setShowRemoveForm] = useState(false); // Estado para controlar a exibição do formulário de remoção.
  const [selectedRemoveBoard, setSelectedRemoveBoard] = useState(0); // Estado para armazenar o índice do quadro selecionado para remoção.
  
  // Estados para armazenar as dimensões da janela.
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentWindowWidth, currentWindowHeight] = useWindowSize(); // Hook useWindowSize para obter as dimensões da janela.

  // Efeito para atualizar as dimensões da janela quando o tamanho muda.
  useEffect(() => {
    setWindowWidth(currentWindowWidth);
    setWindowHeight(currentWindowHeight);
  }, [currentWindowWidth, currentWindowHeight]);

  // Efeito para definir ready como true quando o componente é montado no navegador.
  useEffect(() => {
    if (typeof window !== 'undefined')  {
      setReady(true);
    }
  }, []);

  // Função chamada quando uma tarefa é arrastada e solta.
  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  // Função chamada quando uma tecla é pressionada no textarea.
  const onTextAreaKeyPress = (e) => {
    if(e.keyCode === 13) 
    {
      const val = e.target.value;
      if(val.length === 0) {
        setShowForm(false);
      }
      else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          createdAt: new Date().toISOString()
        }
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  // Função para remover uma tarefa.
  const removeTask = (boardIndex, taskIndex) => {
    let newBoardData = [...boardData];
    newBoardData[boardIndex].items.splice(taskIndex, 1);
    setBoardData(newBoardData);
    setShowRemoveForm(false);
  };

  // Renderização do componente.
  return (
    <Layout>
      <div className="p-5 md:p-20 flex flex-col flex-1">
        {/* Cabeçalho do quadro de tarefas. */}
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Quadro de Tarefas</h4>
            <ChevronDownIcon className="w-9 h-9 text-gray-500 rounded-full p-1 bg-white ml-5 shadow-xl" />
          </div>
        </div>

        {/* Colunas do quadro. */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Adicionando a classe condicionalmente para a rolagem horizontal */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-5 my-5 ${windowWidth < 640 ? 'overflow-x-auto' : ''}`}>
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          <div className={`bg-gray-100 rounded-md shadow-md flex flex-col relative overflow-hidden ${snapshot.isDraggingOver && "bg-green-100"}`}>
                            <span className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200 absolute inset-x-0 top-0"></span>
                            <h4 className=" p-3 flex justify-between items-center mb-2">
                              <span className="text-2xl text-gray-600">{board.name}</span>
                              <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                            </h4>

                            <div className="overflow-y-auto overflow-x-hidden h-auto" style={{maxHeight:'calc(100vh - 290px)'}}>
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <div key={item.id} className="flex justify-between items-center m-3">
                                      <CardItem data={item} index={iIndex} className="mr-2" />
                                      <button className="text-red-500" onClick={() => {
                                          setShowRemoveForm(true);
                                          setSelectedRemoveBoard(bIndex);
                                        }}>
                                        <XCircleIcon className="w-5 h-5" />
                                      </button>
                                    </div>
                                  );
                                })}
                              {provided.placeholder}
                            </div>
                            
                            {/* Formulário para adicionar tarefa. */}
                            {showForm && selectedBoard === bIndex ? (
                              <div className="p-3">
                                <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" rows={3} placeholder="" data-id={bIndex} onKeyDown={(e) => onTextAreaKeyPress(e)}/>
                              </div>
                            ) : (
                              <button className="flex justify-center items-center my-3 space-x-2 text-lg" onClick={() => {setSelectedBoard(bIndex); setShowForm(true);}}>
                                <span>Adicionar Tarefa</span>
                                <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>

      {/* Formulário de confirmação para remover tarefa. */}
      {showRemoveForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded-md shadow-md">
            <p>Tem certeza de que deseja remover esta tarefa?</p>
            <div className="flex justify-end mt-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-3" onClick={() => {removeTask(selectedRemoveBoard);}}>
                Remover
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setShowRemoveForm(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
