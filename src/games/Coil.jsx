import ResponsiveGameFrame from "./ResponsiveGameFrame";

const Coil = () => {
  return(
    // <div style={{ width:'100%', maxWidth: 480, margin: '0 auto' }}>
    //   <iframe
    //     src="/coil/index.html"
    //     title="coil"
    //     style={{
    //       width: '100%',
    //       height: '500px',
    //       border: 'none'
    //     }}
    //   />
    // </div>
    <ResponsiveGameFrame
      src="/coil/index.html"
      title="coil"
      maxWidth={1024}
    />
  );
};

export default Coil;