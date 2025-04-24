'use client'

import { useState, useEffect, useRef } from 'react'

type Message = {
  id: string
  sender: string
  text: string
  timestamp: number
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Mock messages for demo
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'Player1',
        text: 'Hey everyone, joined the tournament!',
        timestamp: Date.now() - 1000 * 60 * 5
      },
      {
        id: '2',
        sender: 'Player2',
        text: 'Welcome! I got 12 kills last match',
        timestamp: Date.now() - 1000 * 60 * 4
      },
      {
        id: '3',
        sender: 'Player3',
        text: 'Anyone want to team up for the next round?',
        timestamp: Date.now() - 1000 * 60 * 3
      },
      {
        id: '4',
        sender: 'Player4',
        text: 'Just earned 25 $PTM tokens!',
        timestamp: Date.now() - 1000 * 60 * 2
      },
      {
        id: '5',
        sender: 'Player5',
        text: 'Check out the new weapon in the north section',
        timestamp: Date.now() - 1000 * 60 * 1
      }
    ]
    
    setMessages(mockMessages)
    
    // In a real implementation, set up socket connection here
    // const socket = io();
    // socket.on('message', (message) => {
    //   setMessages(prev => [...prev, message]);
    // });
    // return () => socket.disconnect();
  }, [])
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputText.trim() === '') return
    
    // Add new message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: inputText,
      timestamp: Date.now()
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputText('')
    
    // In a real implementation, send message via socket
    // socket.emit('message', newMessage);
  }
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  
  return (
    <div className="chat-container flex flex-col h-full">
      <div className="messages flex-grow overflow-y-auto mb-3">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div className="flex items-start">
              <span className="font-bold text-primary mr-2">{message.sender}:</span>
              <span>{message.text}</span>
            </div>
            <div className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow bg-gray-700 text-white p-2 rounded-l-md focus:outline-none"
          placeholder="Type a message..."
        />
        <button 
          type="submit" 
          className="bg-primary text-white p-2 rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  )
} 