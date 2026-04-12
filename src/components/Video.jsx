import React, { useRef, useState, useEffect } from "react";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Video({ srcVideo, width = 560, height = 315, legend = "" }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  // Sync duration on mount in case metadata was already loaded before hydration
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 1) setDuration(v.duration);
  }, []);

  const onTimeUpdate = () => setCurrent(videoRef.current?.currentTime ?? 0);
  const onLoaded = () => setDuration(videoRef.current?.duration ?? 0);
  const onEnded = () => setPlaying(false);

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const v = videoRef.current;
    if (v) v.currentTime = ratio * v.duration;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 0 30px", flex: 1 }}>
      <div style={{ position: "relative", background: "#000", cursor: "pointer", lineHeight: 0 }} onClick={toggle}>
        <video
          ref={videoRef}
          preload="metadata"
          width={width}
          style={{ display: "block", width: "100%" }}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoaded}
          onEnded={onEnded}
        >
          <source src={srcVideo} type="video/mp4" />
        </video>
        {!playing && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.25)",
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="white" opacity="0.9">
              <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.4)" />
              <polygon points="19,15 35,24 19,33" fill="white" />
            </svg>
          </div>
        )}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        background: "#1a1a1a", padding: "6px 10px", fontSize: "0.78em",
        color: "#ccc", userSelect: "none",
      }}>
        <button
          onClick={toggle}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0, lineHeight: 1 }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing
            ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="4" height="12"/><rect x="8" y="1" width="4" height="12"/></svg>
            : <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="2,1 13,7 2,13"/></svg>
          }
        </button>
        <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "70px" }}>
          {formatTime(current)} / {formatTime(duration)}
        </span>
        <div
          onClick={seek}
          style={{ flex: 1, height: "4px", background: "#444", borderRadius: "2px", cursor: "pointer", position: "relative" }}
        >
          <div style={{ width: `${progress}%`, height: "100%", background: "#fff", borderRadius: "2px" }} />
        </div>
      </div>
      {legend && <p style={{ fontSize: "small", textAlign: "center", marginTop: "8px" }}>{legend}</p>}
    </div>
  );
}

export default Video;
