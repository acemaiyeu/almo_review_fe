import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client'; // Khi làm thật, hãy dùng thư viện này

const TikTokLiveUltimate = () => {
  const [url, setUrl] = useState('');
  const [roomID, setRoomID] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);

  // Hàm trích xuất Username từ URL TikTok
  const extractUsername = (url) => {
    const match = url.match(/@([^/?#]+)/);
    return match ? match[1] : null;
  };

  const handleConnect = () => {
    const user = extractUsername(url);
    if (!user) {
      alert("URL không đúng! Hãy nhập dạng: https://www.tiktok.com/@username/live");
      return;
    }
    
    setRoomID(user);
    setIsConnected(true);
    setComments([{ id: 'sys', user: 'SYSTEM', text: `Đang kết nối tới phòng của @${user}...`, type: 'system' }]);

    // THẬT: Tại đây bạn sẽ gọi: socket.emit('join-room', user);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#0f0f0f] text-white p-4 gap-4">
      
      {/* CỘT TRÁI: VIDEO LIVE */}
      <div className="flex-1 flex flex-col bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
        <div className="p-4 bg-[#1a1a1a] flex gap-3">
          <input 
            className="flex-1 bg-[#2a2a2a] border border-gray-700 px-4 py-2 rounded-lg outline-none focus:border-pink-500 transition-all"
            placeholder="Dán link TikTok Live (VD: https://www.tiktok.com/@abc/live)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={isConnected ? () => setIsConnected(false) : handleConnect}
            className={`${isConnected ? 'bg-red-600' : 'bg-pink-600'} px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all`}
          >
            {isConnected ? 'NGẮT' : 'KẾT NỐI'}
          </button>
        </div>

        <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
          {isConnected ? (
            <iframe
              src={`https://www.tiktok.com/embed/v2/live?user=${roomID}`}
              className="w-full h-full border-none"
              title="TikTok Live Stream"
              allowFullScreen
            />
          ) : (
            <div className="text-center text-gray-500 text-sm">
              <p className="mb-2 text-3xl">📺</p>
              <p>Chưa có tín hiệu. Vui lòng nhập URL và nhấn Kết nối.</p>
            </div>
          )}
        </div>
      </div>

      {/* CỘT PHẢI: BÌNH LUẬN (CONSOLE) */}
      <div className="w-full lg:w-[400px] flex flex-col bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-2xl">
        <div className="p-4 border-b border-gray-800 font-bold text-pink-500 flex items-center gap-2">
           <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 ${!isConnected && 'hidden'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-pink-500' : 'bg-gray-600'}`}></span>
          </span>
          LIVE CHAT LOGS
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs custom-scrollbar"
        >
          {comments.map((msg) => (
            <div key={msg.id} className="group">
               <span className="text-gray-600 mr-2">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
               <span className="text-blue-400 font-bold">@{msg.user}</span>: 
               <span className="ml-2 text-gray-300 break-words">{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#121212] text-[10px] text-gray-600 border-t border-gray-800">
          STATUS: {isConnected ? `CONNECTED TO @${roomID}` : 'IDLE'}
        </div>
      </div>
    </div>
  );
};

export default TikTokLiveUltimate;