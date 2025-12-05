const Game2048 = () => {
  return(
    <div style={{ width:'100%', maxWidth: 480, margin: '0 auto' }}>
      <iframe
        src="/2048/index.html"
        title="2048 gane"
        style={{
          width: '100%',
          height: '500px',
          border: 'none'
        }}
      />
    </div>
  );
};

export default Game2048;