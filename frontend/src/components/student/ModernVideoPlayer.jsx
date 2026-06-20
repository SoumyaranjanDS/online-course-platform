import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";
import { studentService } from "../../services/studentService";

export default function ModernVideoPlayer({ videoUrl, courseId, lessonId, lessonDuration, onLessonComplete, onProgressUpdate }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(lessonDuration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [qualityMenuOpen, setQualityMenuOpen] = useState(false);

  // For syncing progress
  const [lastSyncTime, setLastSyncTime] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Update duration if lessonDuration changes
  useEffect(() => {
    if (lessonDuration) {
      setDuration(lessonDuration);
    }
  }, [lessonDuration]);

  // Hide controls on idle
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => {
        if (isPlaying) setShowControls(false);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Reset completion state when lesson changes
  useEffect(() => {
    setHasCompleted(false);
    setLastSyncTime(0);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    if (lessonDuration) {
      setDuration(lessonDuration);
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [lessonId, lessonDuration]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const getQualityUrl = (url, quality) => {
    if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
    
    let transform = "q_auto";
    if (quality === "1080p") transform = "q_auto,w_1920";
    if (quality === "720p") transform = "q_auto,w_1280";
    if (quality === "480p") transform = "q_auto,w_854";

    const parts = url.split("/upload/");
    // Strip any existing simple transformations right after upload/ (like q_auto/ or w_1280/)
    const pathAfterUpload = parts[1].replace(/^(?:q_[^/]+|w_[^/]+|c_[^/]+|,)+\//, '');
    
    return `${parts[0]}/upload/${transform}/${pathAfterUpload}`;
  };

  const handleQualityChange = (q) => {
    const time = videoRef.current.currentTime;
    const wasPlaying = !videoRef.current.paused;
    
    setCurrentQuality(q);
    setQualityMenuOpen(false);
    
    // Wait for react to re-render the video src, then restore time
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
        if (wasPlaying) {
          videoRef.current.play();
        }
      }
    }, 50);
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const dur = lessonDuration || videoRef.current.duration || duration;
    
    setCurrentTime(current);
    if (dur > 0) {
      setProgress((current / dur) * 100);
    }

    // Sync every 5 seconds
    if (Math.floor(current) - Math.floor(lastSyncTime) >= 5) {
      syncProgress(current, dur);
      setLastSyncTime(current);
    }

    // Auto-complete at 95%
    if (dur > 0 && current >= dur * 0.95 && !hasCompleted) {
      setHasCompleted(true);
      syncProgress(current, dur, true);
      if (onLessonComplete) onLessonComplete();
    }
  };

  const handleLoadedMetadata = () => {
    if (!lessonDuration && videoRef.current && videoRef.current.duration && videoRef.current.duration !== Infinity) {
      setDuration(videoRef.current.duration);
    }
  };

  const syncProgress = async (watched, total, forceComplete = false) => {
    try {
      const res = await studentService.syncLessonProgress(courseId, lessonId, {
        watchedSeconds: Math.floor(watched),
        totalSeconds: Math.floor(total)
      });
      if (onProgressUpdate && res.progress) {
        onProgressUpdate(res.progress);
      }
    } catch (error) {
      console.error("Failed to sync progress:", error);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity || timeInSeconds === 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-video bg-black flex items-center justify-center group overflow-hidden"
    >
      <video
        ref={videoRef}
        src={getQualityUrl(videoUrl, currentQuality)}
        className="w-full h-full cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onClick={() => {
          if (qualityMenuOpen) setQualityMenuOpen(false);
          else togglePlay();
        }}
        onEnded={() => setIsPlaying(false)}
        controlsList="nodownload"
      ></video>

      {/* Center Play Button Overlay */}
      {!isPlaying && (
        <button 
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-20 h-20 bg-primary/80 hover:bg-primary text-on-primary rounded-full flex items-center justify-center transition-transform hover:scale-110 z-10"
        >
          <Play className="w-10 h-10 ml-2" />
        </button>
      )}

      {/* Controls Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 transition-opacity duration-300 z-20 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="w-full flex items-center gap-2 mb-2 group/progress">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isNaN(progress) ? 0 : progress} 
            onChange={handleSeek}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer hover:h-2 transition-all"
            style={{
              background: `linear-gradient(to right, #10b981 ${isNaN(progress) ? 0 : progress}%, rgba(255,255,255,0.2) ${isNaN(progress) ? 0 : progress}%)`
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                {isMuted || volume == 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-20 h-1.5 rounded-full appearance-none cursor-pointer opacity-0 group-hover/volume:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(to right, #10b981 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`
                }}
              />
            </div>

            <div className="text-white text-sm font-medium font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setQualityMenuOpen(!qualityMenuOpen)}
                className="text-white hover:text-primary transition-colors flex items-center gap-1"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {qualityMenuOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-surface rounded-xl shadow-xl border border-outline-variant/30 py-2 min-w-[120px] overflow-hidden">
                  <div className="px-3 py-1 text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20 mb-1">
                    Quality
                  </div>
                  {['1080p', '720p', '480p', 'auto'].map(q => (
                    <button
                      key={q}
                      onClick={() => handleQualityChange(q)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${currentQuality === q ? 'text-primary font-bold bg-primary-container/10' : 'text-on-surface'}`}
                    >
                      {q === 'auto' ? 'Auto' : q}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
