(async function(){
    console.log("hello treasure");
    let localStream;
    try {
        localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        const videoElement = document.getElementById('my-video');
        videoElement.srcObject = localStream;
        videoElement.play();
    } catch(error){
        alert(error);
    }
    const peer = new Peer({
        key: '2c07d3f0-4c69-416d-a060-97d13a16fa06',
        debug: 3
    });

    peer.on('open', () => {
        document.getElementById('my-id').textContent = peer.id;
    });

    // 発信処理
    document.getElementById('make-call').onclick = () => {
        const theirID = document.getElementById('their-id').value;
        const mediaConnection = peer.call(theirID, localStream);
        setEventListener(mediaConnection);
    };
  
    // イベントリスナを設置する関数
    const setEventListener = mediaConnection => {
        mediaConnection.on('stream', stream => {
            // video要素にカメラ映像をセットして再生
            const videoElm = document.getElementById('their-video')
            videoElm.srcObject = stream;
            videoElm.play();
        });
    }

    peer.on('call', mediaConnection => {
        mediaConnection.answer(localStream);
        setEventListener(mediaConnection);
    });
})();