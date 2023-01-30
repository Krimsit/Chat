import { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"

import UserContext from "./context/UserContext"

import { Login, Chat } from "./components"

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
    background-color: #F5F5F5;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {
  const [username, setUsername] = useState("")

  return <UserContext.Provider value={{ username, setUsername }}>
    <GlobalStyles />
    <Container>
      {!username ? <Login /> : <Chat />}
    </Container>
  </UserContext.Provider>
}

export default App