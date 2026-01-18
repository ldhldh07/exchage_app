interface ScrollToTopButtonProps {
  onClick: () => void;
  visible: boolean;
}

export function ScrollToTopButton({ onClick, visible }: Readonly<ScrollToTopButtonProps>) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 p-4 bg-cta text-white rounded-full shadow-lg hover:bg-gray-800 transition-all z-50 cursor-pointer"
      aria-label="맨 위로 스크롤"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
