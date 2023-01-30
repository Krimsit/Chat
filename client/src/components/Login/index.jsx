import { useState, useContext } from "react"
import { Input, Button as BaseButton, Card as BaseCard } from "antd"
import styled from "styled-components"

import UserContext from "../../context/UserContext"

const Card = styled(BaseCard)`
  max-width: 500px;
  width: 100%;
  border-radius: 25px;
  
  .ant-card-body {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;
  }
`

const Button = styled(BaseButton)`
  width: 100%;
`

const Login = () => {
  const { setUsername } = useContext(UserContext)

  const [value, setValue] = useState("")

  const handleChange = (e) => setValue(e.target.value)

  const handleSetUser = () => {
    setUsername(value)
    setValue("")
  }

  return <Card title="Вход">
      <Input placeholder="Введите имя" value={value} onChange={handleChange} />
      <Button onClick={handleSetUser} type="primary">Войти</Button>
  </Card>
}

export default Login