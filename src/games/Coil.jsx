import ResponsiveGameFrame from "./ResponsiveGameFrame";

// const Coil = () => {
//   return(
//     <ResponsiveGameFrame
//       src="/coil/index.html"
//       title="coil"
//     />
//   );
// };

const Coil = ({frameRef}) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#000', // Coil 배경과 어울리도록
      }}
    >
      <iframe
        src="/coil/index.html"
        title="coil"
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

export default Coil;