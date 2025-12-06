// ESC와 ENTER로 게임 메뉴와 게임 플레이 구분하기(게임의 index.html의 키보드 값을 부모에 전달)
document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        window.parent.postMessage({ type: 'GAME_ESC' }, '*');
      } else if (event.key === 'Enter') {
        window.parent.postMessage({ type: 'GAME_ENTER' }, '*');
      }
    });