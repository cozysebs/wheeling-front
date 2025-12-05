import { useEffect, useRef, useState } from "react";

const ResponsiveGameFrame = ({ src, title, maxWidth = 600}) => {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(500);

  useEffect(()=>{
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentWindow.document;
        // 문서 전체 높이 측정
        const scrollHeight = doc.documentElement.scrollHeight || doc.body.scrollHeight;
        if (scrollHeight) {
          setHeight(scrollHeight);
        }
      } catch(e){
        // 다른 도메인일 때는 접근 불가 → 이 경우엔 그냥 기본 height 유지
        console.log('iframe height auto-resize failed', e);
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [src]);

  return(
    <div
      style={{
        width: '100%',
        maxWidth: maxWidth,
        margin: '0 auto',
      }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        style={{
          width: '100%',
          height: `${height}px`,   //각 게임 내용 높이에 맞춰 자동 조정
          border: 'none',
        }}
      />
    </div>
  );
};

export default ResponsiveGameFrame;