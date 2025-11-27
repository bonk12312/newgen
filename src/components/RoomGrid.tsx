import { Room } from '../types';
import * as Icons from 'lucide-react';

interface RoomGridProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  viewMode: 'grid' | 'list';
}

export const RoomGrid = ({ rooms, onRoomClick, viewMode }: RoomGridProps) => {
  if (viewMode === 'list') {
    return (
      <div className="w-full max-w-4xl px-4 space-y-4">
        {rooms.map((room) => {
          const IconComponent = Icons[room.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

          return (
            <button
              key={room.id}
              onClick={() => onRoomClick(room)}
              className="group w-full p-6 rounded-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/20"
            >
              <div className="transition-transform duration-500 group-hover:scale-110 text-white">
                <IconComponent className="w-10 h-10 md:w-12 md:h-12" />
              </div>

              <div className="flex-1 text-left">
                <h3 className="text-lg md:text-xl font-bold mb-1 text-white">
                  {room.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {room.subtitle}
                </p>
              </div>

              <div className="text-white opacity-50 group-hover:opacity-100 transition-opacity">
                <Icons.ArrowRight className="w-6 h-6" />
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl px-4">
      {rooms.map((room) => {
        const IconComponent = Icons[room.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

        return (
          <button
            key={room.id}
            onClick={() => onRoomClick(room)}
            className="group relative aspect-square rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/5 hover:bg-white/10 border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

            <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 text-white">
                <IconComponent className="w-10 h-10 md:w-12 md:h-12" />
              </div>

              <h3 className="text-sm md:text-base font-bold mb-1 transition-all duration-300 text-white">
                {room.title}
              </h3>

              <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {room.subtitle}
              </p>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white/10" />
          </button>
        );
      })}
    </div>
  );
};
