import { Room } from '../types';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState } from 'react';

interface RoomDetailProps {
  room: Room;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const RoomDetail = ({ room, onClose, onNavigate }: RoomDetailProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const IconComponent = Icons[room.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const progress = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/90"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl animate-slideUp bg-zinc-900 border-2 border-white/20">
        <div
          className="absolute top-0 left-0 h-1 transition-all duration-300 bg-white"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="sticky top-0 z-10 flex items-center justify-between p-6 backdrop-blur-md bg-black/50 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="text-white">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {room.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{room.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className="overflow-y-auto p-6 md:p-10 space-y-6"
          style={{ maxHeight: 'calc(90vh - 120px)' }}
          onScroll={handleScroll}
        >
          {room.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-300 text-base md:text-lg leading-relaxed animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {paragraph}
            </p>
          ))}

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => onNavigate('prev')}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous Thought
            </button>

            <button
              onClick={() => onNavigate('next')}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white"
            >
              Next Thought
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
