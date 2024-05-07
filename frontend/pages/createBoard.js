
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

    tarefas.tarefas.forEach( (banan) => {
        boardData[banan.type].items.push(banan);
    })

    return boardData;
}
/*
{
	"tasks": [
		{
			"id": 0,
			"title": "NAME",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 1,
			"title": "TESTE",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 2,
			"title": "1",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 3,
			"title": "1",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 4,
			"title": "1",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 5,
			"title": "1",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 6,
			"title": "1",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 7,
			"title": "TITLE",
			"type": "To Do",
			"createdAt": "2023-04-22"
		},
		{
			"id": 10,
			"title": "This is NO MORE my title",
			"type": "Complete",
			"createdAt": "2023-10-06"
		}
	]
}
*/
