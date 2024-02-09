"use client";

const ScrollUpButton = () => {
  const clickEvent = () =>
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

  return (
    <>
      <button
        onClick={clickEvent}
        className="text-white fixed bottom-10 right-10"
      >
        위로
      </button>
    </>
  );
};

export default ScrollUpButton;
