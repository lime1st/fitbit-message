// 자이로 센서 데이터 수집해서 메시징 API로 컴패니언 앱으로 전송
// 필요한 센서 임포트, 가속도, 자이로, 심전도, 
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
// 컴패니언 앱으로 전송
import { peerSocket } from "messaging";

// *** 화면 구성
import * as document from "document";

const accelData = document.getElementById("accel-data");
const gyroData = document.getElementById("gyro-data");
const hrmData = document.getElementById("hrm-data");


const accel = new Accelerometer();
const gyro = new Gyroscope();
const hrm = new HeartRateSensor();

function sendSensorData(){
  if(peerSocket.readyState === peerSocket.OPEN){
    const hrmText = { hr: hrm.heartRate };
    const accelText = { accelX: accel.x, accelY: accel.y, accelZ: accel.z };
    const gyroText = { gyroX: gyro.x, gyroY: gyro.y, gyroZ: gyro.z };
    const data = { ...hrmText, ...accelText, ...gyroText, userID: 4 };
    // console.log(JSON.stringify(data));
    peerSocket.send(data);
    hrmData.text = JSON.stringify(hrmText);
    accelData.text = JSON.stringify({
      x: accelText.accelX ? accelText.accelX.toFixed(1) : 0,
      y: accelText.accelY ? accelText.accelY.toFixed(1) : 0, 
      z: accelText.accelZ ? accelText.accelZ.toFixed(1) : 0
    });
    gyroData.text = JSON.stringify({
      x: gyroText.gyroX ? gyroText.gyroX.toFixed(1) : 0,
      y: gyroText.gyroY ? gyroText.gyroY.toFixed(1) : 0, 
      z: gyroText.gyroZ ? gyroText.gyroZ.toFixed(1) : 0
    });
  }
}

accel.start();
gyro.start();
hrm.start();

setInterval(sendSensorData, 500);