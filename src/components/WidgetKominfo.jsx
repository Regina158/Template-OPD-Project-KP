import { useEffect, useState } from "react";

const WidgetKominfo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.kominfo.go.id/gpr-widget-kominfo.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      id="gpr-kominfo-widget-container"
      className="widget-kominfo-container bg-white shadow-lg w-full h-full"
    ></div>
  );
};

const WidgetToggle = () => {
  const [isWidgetVisible, setWidgetVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const toggleWidgetVisibility = () => {
    setWidgetVisible(!isWidgetVisible);
  };

  const handleMouseDown = (e) => {
    if (e.ctrlKey) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative">
      <button
        onClick={toggleWidgetVisibility}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-2 py-1 rounded-r focus:outline-none shadow-md hover:bg-blue-700 transition duration-300 z-50 flex items-center justify-center"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span className="flex items-center">
          {isWidgetVisible ? (
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          <span className="ml-1 text-sm">GPR KOMINFO</span>
        </span>
      </button>

      <div
        className={`fixed bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-56 ${
          isWidgetVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: position.y,
          left: position.x,
          width: "25rem", // Sidebar width adjustment
          height: "50vh", // Full height for sidebar
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      >
        <WidgetKominfo />
      </div>

      {isWidgetVisible && (
        <div
          onClick={toggleWidgetVisibility}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default WidgetToggle;
