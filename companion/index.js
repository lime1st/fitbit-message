// Device에서 메시징 API로 전송한 데이터 수신
import { peerSocket } from "messaging";

peerSocket.onmessage = (evt) => {
    // 현재의 타임스탬프
    const timestamp = Date.now();
    const data = { datetime: formatToMySQLDateTime(timestamp), ...evt.data };
    console.log(JSON.stringify(data));
    sendDataToServer(data);
}

// 서버로 데이터 전송
function sendDataToServer(data) {
  // console.log(data)
  fetch('https://vs.carehub.or.kr:3000/api/message', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log('Data successfully sent to the server:', data))
  .catch((error) => console.error('Error sending data:', error));
}

function formatToMySQLDateTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}