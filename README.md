# Kanban

## Api

### Uso
```bash
npm install
npm start
```

### Banco de dados

```sql
create table tasks( 
    id int NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    createdAt date,
    type enum('A fazer','Em Progresso','Em revisão','Completo')
);
```

```sql
INSERT INTO tasks (id,title,createdAt,type) VALUES (2,'Criar tarefa','23-04-15',0)
```
