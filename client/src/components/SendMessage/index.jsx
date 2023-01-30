import { useState, useContext } from "react"
import { Button, Input, Space } from "antd"

import socket from "../../core/socket"
import UserContext from "../../context/UserContext"

const SendMessage = () => {
  const { username } = useContext(UserContext)

  const [value, setValue] = useState("")

  const handleChange = (e) => setValue(e.target.value)

  const handleSendMessage = () => {
    socket.emit("message", { login: username, message: value });
    setValue("")
  }

  return <Space>
    <Input placeholder="Введите сообщение" value={value} onChange={handleChange} />
    <Button onClick={handleSendMessage} type="primary">Отправить</Button>
  </Space>
}

export default SendMessage