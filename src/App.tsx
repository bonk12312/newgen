import { useState } from 'react';
import { RoomGrid } from './components/RoomGrid';
import { RoomDetail } from './components/RoomDetail';
import { rooms } from './data/rooms';
import { Room } from './types';
import { Brain, Twitter, RefreshCw, Grid3x3, List } from 'lucide-react';

function App() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const twitterUrl = "https://twitter.com/yourusername";

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedRoom) return;

    const currentIndex = rooms.findIndex(r => r.id === selectedRoom.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? rooms.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === rooms.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedRoom(rooms[newIndex]);
  };

  const handleRandomRoom = () => {
    const randomIndex = Math.floor(Math.random() * rooms.length);
    setSelectedRoom(rooms[randomIndex]);
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 hover:scale-110"
        >
          <Twitter className="w-6 h-6 text-white" />
        </a>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative text-center max-w-3xl animate-fadeIn">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Brain className="w-16 h-16 text-white animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-slideUp">
            New Gen Thoughts
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            A digital sanctuary exploring the minds of a generation
          </p>

          <p className="text-gray-500 mb-12 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.4s' }}>
            Step into eight rooms of consciousness, each containing the unfiltered thoughts,
            dreams, and struggles of those who grew up between screens and reality.
            This is us. This is now. This is what we think about when we think about everything.
          </p>

          <button
            onClick={() => setShowIntro(false)}
            className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl bg-white text-black hover:bg-gray-200 animate-slideUp"
            style={{ animationDelay: '0.6s' }}
          >
            Enter the Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 hover:scale-110"
      >
        <Twitter className="w-6 h-6 text-white" />
      </a>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-black to-white/5" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              New Gen Thoughts
            </h1>
          </div>
          <p className="text-gray-500 text-sm md:text-base">
            Select a room to explore the collective consciousness
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={handleRandomRoom}
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Random Thought
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
              viewMode === 'grid' ? 'bg-white text-black border-white' : 'bg-white/5 hover:bg-white/10 border-white/20'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            Grid View
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
              viewMode === 'list' ? 'bg-white text-black border-white' : 'bg-white/5 hover:bg-white/10 border-white/20'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>

          <button
            onClick={() => rooms.forEach(room => setSelectedRoom(room))}
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 hover:scale-105"
          >
            View All Thoughts
          </button>
        </div>

        <RoomGrid rooms={rooms} onRoomClick={setSelectedRoom} viewMode={viewMode} />

        <div className="mt-12 text-center text-gray-600 text-xs md:text-sm animate-fadeIn">
          <p>8 Rooms • Infinite Perspectives • One Generation</p>
        </div>
      </div>

      {selectedRoom && (
        <RoomDetail
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
