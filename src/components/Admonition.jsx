import React from "react";

const config = {
  caution: {
    label: "Caution",
    icon: "⚠️",
    borderColor: "#e6a700",
    bgColor: "rgba(230, 167, 0, 0.1)",
    labelColor: "#e6a700",
  },
  warning: {
    label: "Warning",
    icon: "⚠️",
    borderColor: "#e6a700",
    bgColor: "rgba(230, 167, 0, 0.1)",
    labelColor: "#e6a700",
  },
  info: {
    label: "Info",
    icon: "ℹ️",
    borderColor: "#2196f3",
    bgColor: "rgba(33, 150, 243, 0.1)",
    labelColor: "#2196f3",
  },
  note: {
    label: "Note",
    icon: "📝",
    borderColor: "#888",
    bgColor: "rgba(136, 136, 136, 0.1)",
    labelColor: "#888",
  },
  tip: {
    label: "Tip",
    icon: "💡",
    borderColor: "#00a86b",
    bgColor: "rgba(0, 168, 107, 0.1)",
    labelColor: "#00a86b",
  },
};

const Admonition = ({ type = "note", children }) => {
  const { label, icon, borderColor, bgColor, labelColor } =
    config[type] ?? config.note;

  return (
    <div
      style={{
        borderLeft: `4px solid ${borderColor}`,
        background: bgColor,
        borderRadius: "0 4px 4px 0",
        padding: "12px 16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "0.85em",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: labelColor,
          marginBottom: "6px",
        }}
      >
        {icon} {label}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Admonition;
