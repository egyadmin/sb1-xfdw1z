import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import Peer from 'simple-peer';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'audio' | 'video';
  participants: string[];
}

const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, type, participants }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Start call duration timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Initialize camera/mic if video call
      if (type === 'video') {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(err => console.error('Error accessing media devices:', err));
      }

      return () => {
        clearInterval(timer);
        // Cleanup media streams
        if (localVideoRef.current?.srcObject) {
          const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [isOpen, type]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {type === 'video' && (
            <div className="relative aspect-video bg-gray-800">
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
              <video
                ref={localVideoRef}
                className="absolute bottom-4 right-4 w-48 rounded-lg border-2 border-white"
                autoPlay
                playsInline
                muted
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">
                  {type === 'video' ? 'مكالمة فيديو' : 'مكالمة صوتية'}
                </h3>
                <p className="text-gray-400">
                  {participants.join('، ')}
                </p>
              </div>
              <div className="text-white font-mono">
                {formatDuration(callDuration)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full ${
                  isMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>

              {type === 'video' && (
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-4 rounded-full ${
                    isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {isVideoOff ? (
                    <VideoOff className="w-6 h-6 text-white" />
                  ) : (
                    <Video className="w-6 h-6 text-white" />
                  )}
                </button>
              )}

              <button
                onClick={onClose}
                className="p-4 bg-red-600 rounded-full hover:bg-red-700"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;