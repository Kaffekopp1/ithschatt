import { format } from 'date-fns';
import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { MessageSquare, Send, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from './ui/sidebar';
import AuthContext from '../AuthContext';

const socket = io.connect('http://localhost:4000');
// const socket = io.connect('/');

export function ChatWindow() {
  const { user, userId } = useContext(AuthContext);

  // this user
  const mainUser = {
    name: user,
    email: `${user}@example.com`,
    avatar: '/placeholder.svg?height=32&width=32',
  };

  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldmessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      user_id: userId,
      content: message,
      sender: 'mainUser',
      timestamp: new Date(),
      name: user,
    };

    socket.emit('send_message', newUserMessage);

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);
  useEffect(() => {
    async function getMessages() {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        console.log('data', data);
        setOldmessages(data);
      } catch (error) {
        console.log('error', error);
      }
    }
    getMessages();
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar>
                  <AvatarImage src={mainUser.avatar} alt={mainUser.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{mainUser.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {mainUser.email}
                  </span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chattar
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings className="mr-2 h-4 w-4" />
                    Inställningar
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-[calc(100vh-5rem)] flex-col">
          <ScrollArea className="flex-1 p-4">
            {oldMessages?.messages &&
              oldMessages.messages.map((message) => (
                <div
                  key={`${message.id} + ${message.name} + ${message.user_id}`}
                  className={`mb-4 flex ${
                    message.sender === user ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <p>{message.id}</p>

                  <Avatar className="h-8 w-8">
                    {message.sender === 'mainUser' ? (
                      <AvatarImage src={mainUser.avatar} alt={mainUser.name} />
                    ) : (
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Other User"
                      />
                    )}
                    <AvatarFallback>
                      {message.sender === 'mainUser' ? 'L' : 'O'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{message.name}</p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
          </ScrollArea>
          <ScrollArea className="flex-1 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === user ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[80%] items-start gap-3 rounded-lg p-4 ${
                    message.sender === user
                      ? 'bg-blue-400 text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {message.sender === 'mainUser' ? (
                      <AvatarImage src={mainUser.avatar} alt={mainUser.name} />
                    ) : (
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Other User"
                      />
                    )}
                    <AvatarFallback>
                      {message.sender === 'mainUser' ? 'L' : 'O'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{message.name}</p>
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {format(message.timestamp, 'HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Skriv ditt meddelande..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Skicka meddelande</span>
              </Button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
