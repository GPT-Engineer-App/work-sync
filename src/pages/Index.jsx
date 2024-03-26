import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Stack, Grid, GridItem, Flex, IconButton, Spacer, Checkbox } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newUser, setNewUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState("");

  const addProject = () => {
    if (newProject.trim() !== "") {
      setProjects([...projects, { id: Date.now(), name: newProject, date: newDate, status: newStatus, user: newUser }]);
      setNewProject("");
      setNewDate("");
      setNewStatus("");
      setNewUser("");
    }
  };

  const addTask = (projectId) => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), projectId, name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    setTasks(tasks.filter((task) => task.projectId !== projectId));
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Project Management App
      </Heading>

      <Flex mb={4} direction="column">
        <Input placeholder="Enter a new project" value={newProject} onChange={(e) => setNewProject(e.target.value)} mb={2} />
        <Input placeholder="Enter date" value={newDate} onChange={(e) => setNewDate(e.target.value)} mb={2} />
        <Input placeholder="Enter status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} mb={2} />
        <Input placeholder="Enter user" value={newUser} onChange={(e) => setNewUser(e.target.value)} mb={2} />
        <Button onClick={addProject}>Add Project</Button>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {projects.map((project) => (
          <GridItem key={project.id} bg="gray.100" p={4} borderRadius="md">
            <Flex align="center" mb={2}>
              <Text fontWeight="bold">{project.name}</Text>
              <Spacer />
              <IconButton icon={<FaTrash />} size="sm" onClick={() => deleteProject(project.id)} />
            </Flex>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{project.date}</td>
                  <td>{project.status}</td>
                  <td>{project.user}</td>
                </tr>
              </tbody>
            </table>
            <Stack spacing={2}>
              {tasks
                .filter((task) => task.projectId === project.id)
                .map((task) => (
                  <Checkbox key={task.id} isChecked={task.completed} onChange={() => toggleTaskCompletion(task.id)}>
                    {task.name}
                  </Checkbox>
                ))}
            </Stack>
            <Flex mt={4}>
              <Input placeholder="Enter a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} mr={2} />
              <IconButton icon={<FaPlus />} onClick={() => addTask(project.id)} />
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
