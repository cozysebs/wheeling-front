const Tetris = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#000000', // 게임 배경과 어울리도록
      }}
    >
      <iframe
        src="/tetris/index.html"
        title="tetris"
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

export default Tetris;