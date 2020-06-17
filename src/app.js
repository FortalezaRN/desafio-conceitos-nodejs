const express = require("express");
const { uuid }  = require('uuidv4');
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  } 

  repositories.push(repository)

  response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)

  if (repositoryIndex < 0 )
    return response.status(400).json({ error: 'Project not found.'});
  const repository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs
  }
  repositories[repositoryIndex] = repository;

  response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)

  if (repositoryIndex < 0 )
    return response.status(400).json({ error: 'Project not found.'});
  repositories.splice(repositoryIndex, 1);

  return response.status(204).json(repositories);
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)

  
  if (repositoryIndex < 0)
    return response.status(400).json({ error: 'Project not found.'});

  const repository = {
    ...repositories[repositoryIndex],
    likes:  repositories[repositoryIndex].likes + 1
  }

  repositories[repositoryIndex] = repository;
  
  response.json({ likes: repository.likes })

});

module.exports = app;
