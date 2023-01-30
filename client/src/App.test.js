import {render, screen, fireEvent} from '@testing-library/react'

import App from "./App"

test("is visible login card", () => {
  render(<App />);

  const textBlock = screen.getByText(/Вход/i);

  expect(textBlock).toBeInTheDocument();
})

test("login test", async () => {
  render(<App />);

  const usernameInput = screen.getByPlaceholderText("Введите имя")
  const loginButton = screen.getByText("Войти")

  screen.debug()

  expect(usernameInput).toBeInTheDocument();

  fireEvent.change(usernameInput, { target: { value: "Test user" } })

  fireEvent.click(loginButton)

  screen.debug()

  expect(screen.getByText(/Чат/i)).toBeInTheDocument()
})