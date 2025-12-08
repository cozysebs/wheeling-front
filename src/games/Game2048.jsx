const Game2048 = ({frameRef}) => {
  return (
    <div
      style={{
        width: '100vw',    // 브라우저 전체 폭
        height: '100vh',   // 브라우저 전체 높이
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        src="/2048/index.html"
        title="2048 game"
        ref={frameRef}
        tabIndex={-1}   // 포커스 가능하도록
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Game2048;