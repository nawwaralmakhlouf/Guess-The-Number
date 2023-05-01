import React from 'react';

const ChatCard = ({ socket }: { socket: any}) => {
  let messages: any = [];
  const [newMessage, setNewMessage] = React.useState<string>();
  const [allMessages, refreshAllMessages] = React.useState(messages);
  React.useEffect(() => {
    socket.on('receiveMessage', (msg: any) => {
      receiveMessage(msg);
    });
  }, []);

  function receiveMessage(msg: string) {
    messages = [...messages, msg];
    refreshAllMessages(messages);
  }

  function sendMessage() {
    socket.emit('sendMessage', {
      key: allMessages.length + 1,
      user: 'You',
      message: newMessage,
    });
    setNewMessage('');
  }

  return (
    <>
      <div className="flex flex-col min-w-0 break-words w-full  rounded">
        <div className="flex-auto">
          <div className="flex p-2 flex-col h-[200px]">
            <div className="text-white flex mb-2 mr-2 items-center">
              <img className="mr-2" src="./img/chat.jpg" width={25 + 'px'} />
              Chat
            </div>
            <div className="relative flex flex-col min-w-0 break-words text-white w-full mb-1 bg-slate-700 pt-2">
              <div className="flex flex-col h-[100px] pr-4 pl-4 pb-2 max-h-150px overflow-auto">
                {allMessages
                  .sort((a: any, b: any) => a.key - b.key)
                  .map((elem: any) => (
                    <div className="flex mb-2">
                      <div className="w-2/12 text-xs">{elem?.user}:</div>
                      <div className="flex flex-row w-2/12 ml-3 px-2 bg-gray-500 rounded text-xs items-center">
                        {elem?.message}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex p-1 bg-gray-500">
                <div className="w-10/12">
                  <input
                    className="block w-full rounded text-grey-darkest py-1 px-4 bg-salte-200"
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    name="message"
                  />
                </div>
                <div className="w-2/12">
                  <button
                    className="  bg-gradient-to-r
                     from-pink-500 to-red-500 hover:bg-gray-700 rounded rounded-4 text-white font-bold py-1 px-4 ml-2"
                    onClick={(e) => {
                      sendMessage();
                    }}
                  >
                    start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
