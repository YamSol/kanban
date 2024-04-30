```js
const tarefas = axios.get('/tarefas')

createBoardData(tarefas);

const createBoardData = () => {
    var boardData = [
        {
            "name": "A fazer",
            "items": []
        },
        {
            "name": "Em Progresso",
            "items": []
        },
        {
            "name": "Em revisão",
            "items": []
        },
        {
            "name": "Completo",
            "items": []
        },
    ]

    tarefas.tarefas.forEach((tarefa) => {
        switch (tarefa.type) {
            case 0:
                boardData[0].items.push(tarefa);
                break;
            case 1:
                boardData[1].items.push(tarefa);
                break;
            case 2:
                boardData[2].items.push(tarefa);
                break;
            case 3:
                boardData[3].items.push(tarefa);
                break;
            default:
                break;
        }
    })

    return boardData;
}
```