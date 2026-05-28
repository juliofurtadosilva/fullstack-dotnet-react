import { render, screen } from "@testing-library/react";
import App from "./App";
import { tasksApi } from "./api/tasksApi";

jest.mock("./api/tasksApi", () => ({
  tasksApi: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
}));

test("renders task manager", async () => {
  tasksApi.list.mockResolvedValue([]);

  render(<App />);

  expect(screen.getByRole("heading", { name: /gerenciador de tarefas/i })).toBeInTheDocument();
  expect(await screen.findByText(/nenhuma tarefa encontrada/i)).toBeInTheDocument();
});
