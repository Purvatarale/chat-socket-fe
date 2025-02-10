import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getStatusBadgeStyle(status) {
  const baseStyle = {
    color: "white",
    width: "max-content",
    height: "max-content",
    fontSize: "10px",
    padding: "2px 5px",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    textTransform: "uppercase",
    marginLeft: "auto"
  };

  const statusColors = {
    open: "#28a745", // Green with shade
    closed: "#dc3545", // Red with shade
    resolved: "#ffc107", // Yellow with shade
    pending: "#007bff", // Blue with shade
    default: "#6c757d", // Gray for unknown status
  };

  const color = statusColors[status] || statusColors.default;

  return {
    ...baseStyle,
    backgroundColor: color,
    color: status === "resolved" ? "black" : "white", // Dynamic color for readability
  };
}
