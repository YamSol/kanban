# Kanban Board Project

This is a Kanban board project developed with Next.js for the frontend, TypeScript for the backend API, and MySQL as the database.

## Overview

Kanban is a visual management methodology that helps teams visualize work, identify bottlenecks, and optimize workflow. This project implements a digital Kanban board, allowing users to create and manage tasks in different columns such as "To Do," "In Progress," and "Completed."

## Prerequisites

- Node.js
- Yarn (or npm)
- Docker

## Installation and Execution

```sh
# 1. Clone this repository.
git clone https://github.com/YamSol/kanban.git
# 2. start backend (api + frontend + database).
make build
# 3. Run software
make run
```

## About

Key features of this project include **creation**, **editing**, and **deletion** of task cards, along with the ability to move cards between board columns and visualize real-time task progress. The project utilizes the following technologies:

- **Frontend:** 
  - React
  - Next.js
  - Axios
- **Backend:** 
  - TypeScript
  - Express
  - Knex
- **Database:** MySQL

## Contribution

Contributions are welcome! Feel free to open issues and submit pull requests with improvements or fixes.

## License

This project is licensed under the [GPL-3 License](LICENSE).
