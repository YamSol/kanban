import axios from 'axios';
import Layout from "../components/Layout";
import { ChevronDownIcon, PlusCircleIcon, XCircleIcon, DotsVerticalIcon, PencilIcon } from "@heroicons/react/outline";
import CardItem from "../components/CardItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useWindowSize } from '@react-hook/window-size';

// Função para gerar IDs únicos
function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [selectedRemoveBoard, setSelectedRemoveBoard] = useState(0);
  const [selectedRemoveItem, setSelectedRemoveItem] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEditBoard, setSelectedEditBoard] = useState(0);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentWindowWidth, currentWindowHeight] = useWindowSize(); // Obtém o tamanho atual da janela

  // Efeito para inicializar os dados do quadro
  useEffect(() => {
    setBoardData([
      { name: "A fazer", items: [] },
      { name: "Em progresso", items: [] },
      { name: "Em revisão", items: [] },
      { name: "Completos", items: [] }
    ]);
  }, []);

  // Efeito para atualizar a largura e a altura da janela quando ela é redimensionada
  useEffect(() => {
    setWindowWidth(currentWindowWidth);
    setWindowHeight(currentWindowHeight);
  }, [currentWindowWidth, currentWindowHeight]);

  // Efeito para buscar os dados da API quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/tasks');
        console.log('Resposta da API:', response.data);

        // Filtra os valores do objeto de resposta para obter arrays de itens
        const dataValues = Object.values(response.data).filter(item => Array.isArray(item));

        // Mapeia os dados recebidos para os nomes das colunas correspondentes
        const mappedData = {
          0: [],
          1: [],
          2: [],
          3: [],
        };

        // Organiza os itens em seus respectivos arrays com base no tipo
        dataValues.forEach(items => {
          items.forEach(item => {
            mappedData[item.type].push(item);

            // switch (item.type) {
            //   case 0:
            //     break;
            //   case 1:
            //     mappedData[1].push(item);
            //     break;
            //   case 2:
            //     mappedData[2].push(item);
            //     break;
            //   case 3:
            //     mappedData[3].push(item);
            //     break;
            //   default:
            //     console.warn('Tipo de item desconhecido:', item.type);
            // }
          });
        });

        // Formata os dados finais para o quadro
        const finalData = Object.values(mappedData).map((items, index) => ({
          name: index === 0 ? "A fazer" :
            index === 1 ? "Em progresso" :
              index === 2 ? "Em revisão" :
                index === 3 ? "Completos" :
                  "Desconhecido",
          items
        }));

        // Define os dados formatados no estado do quadro
        setBoardData(finalData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData(); // Chama a função para buscar os dados da API
  }, []);

  // Efeito para atualizar o estado "ready" quando o componente é montado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReady(true);
    }
  }, []);

  // Função chamada quando um item é arrastado e solto
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

  // Função chamada quando uma tecla é pressionada no campo de texto
  const onTextAreaKeyPress = async (e) => {
    if (e.keyCode === 13) {
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes['data-id'].value;


        // Se a API estiver disponível, cria a tarefa no banco de dados
        if (typeof window !== 'undefined') {
          try {
            const response = await axios.post('http://localhost:3333/tasks', { title: val, type: boardId });
            const newTask = response.data;

            // Adiciona a tarefa ao quadro na interface do usuário
            setBoardData(prevState => {
              const newState = [...prevState];
              newState[boardId].items.push(newTask);
              return newState;
            });

            console.log('Tarefa criada no banco de dados:', newTask);
          } catch (error) {
            console.error('Erro ao criar tarefa:', error);
          }
        }

        setShowForm(false);
        e.target.value = '';
      }
    }
  };

  // Função para remover uma tarefa do quadro e da API
  const removeTask = async (boardIndex, taskIndex) => {
    try {
      // Remover a tarefa do banco de dados (se a API estiver disponível)
      console.log(taskIndex);
      console.log(boardData[boardIndex].items);
      const taskId = boardData[boardIndex].items[taskIndex].id;
      await axios.delete(`http://localhost:3333/tasks/${taskId}`);
      console.log('Tarefa removida do banco de dados com sucesso.');

      let newBoardData = [...boardData];
      newBoardData[boardIndex].items.splice(taskIndex, 1);
      setBoardData(newBoardData);
      setShowRemoveForm(false);
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
    // Remover a tarefa do quadro na interface do usuário
    
  };



  // Função para abrir o formulário de edição de tarefa
  const openEditForm = (boardIndex, taskIndex) => {
    setSelectedEditBoard(boardIndex);
    setSelectedTaskIndex(taskIndex);
    setShowEditForm(true);
  };

  // Função para editar uma tarefa do quadro
  const editTask = async (boardIndex, taskIndex, newTitle) => {
    try {
      // Atualiza o título da tarefa no estado do quadro
      let newBoardData = [...boardData];
      newBoardData[boardIndex].items[taskIndex].title = newTitle;
      setBoardData(newBoardData);

      // Obtém o ID da tarefa que está sendo editada
      const taskId = newBoardData[boardIndex].items[taskIndex].id;

      // Atualiza a tarefa no banco de dados
      await axios.put(`http://localhost:3333/tasks/${taskId}`, { title: newTitle });
      console.log('Tarefa atualizada no banco de dados com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
    // Fecha o formulário de edição após a conclusão (sucesso ou falha)
    setShowEditForm(false);
  };


  // Retorna o JSX para renderizar a página
  return (
    <Layout>
      <div className="p-5 md:p-20 flex flex-col flex-1">
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Quadro de Tarefas</h4>
            <ChevronDownIcon className="w-9 h-9 text-gray-500 rounded-full p-1 bg-white ml-5 shadow-xl" />
          </div>
        </div>

        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
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

                            <div className="overflow-y-auto overflow-x-hidden h-auto" style={{ maxHeight: 'calc(100vh - 290px)' }}>
                              {board.items.length > 0 ? (
                                board.items.map((item, iIndex) => {
                                  return (
                                    <div key={item.id} className="flex justify-between items-center m-3">
                                      <CardItem data={item} index={iIndex} className="mr-2" />
                                      <div>
                                        <button className="text-red-500 mr-2" onClick={() => {
                                          setShowRemoveForm(true);
                                          setSelectedRemoveBoard(bIndex);
                                          setSelectedRemoveItem(iIndex);
                                        }}>
                                          <XCircleIcon className="w-5 h-5" />
                                        </button>
                                        <button className="text-blue-500" onClick={() => openEditForm(bIndex, iIndex)}>
                                          <PencilIcon className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p className="text-gray-400 text-center">Nenhum item nesta coluna</p>
                              )}
                              {provided.placeholder}
                            </div>

                            {showForm && selectedBoard === bIndex ? (
                              <div className="p-3">
                                <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" rows={3} placeholder="" data-id={bIndex} onKeyDown={(e) => onTextAreaKeyPress(e)} />
                              </div>
                            ) : (
                              <button className="flex justify-center items-center my-3 space-x-2 text-lg" onClick={() => { setSelectedBoard(bIndex); setShowForm(true); }}>
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

      {showRemoveForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded-md shadow-md">
            <p>Tem certeza de que deseja remover esta tarefa?</p>
            <div className="flex justify-end mt-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-3" onClick={() => { removeTask(selectedRemoveBoard, selectedRemoveItem); }}>
                Remover
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setShowRemoveForm(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded-md shadow-md">
            <p>Editar Tarefa</p>
            <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" rows={3} defaultValue={boardData[selectedEditBoard].items[selectedTaskIndex].title} onKeyDown={(e) => {
              if (e.keyCode === 13) {
                editTask(selectedEditBoard, selectedTaskIndex, e.target.value);
              }
            }} />
            <div className="flex justify-end mt-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-3" onClick={() => editTask(selectedEditBoard, selectedTaskIndex, document.querySelector('.bg-gray-800 textarea').value)}>
                Salvar
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setShowEditForm(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
