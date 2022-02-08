import React, { useState, useRef, useEffect } from 'react';
import { copy } from '../utils/constants';

const useScreen = ({
  cameraStream = null,                           
  videoRef,
  canvasRef,      
  setCanvasImage,                   
  photoType = 'jpg',                             
  optionBox = null,                                                 
  countDown = false,                                                      
  photoArray = [],                               
  gifConfirm = false,                           
  currentGif = null,                             
  loadingGif = false,                            
  showMiniPics = false,                          
  imageCoords = [0, 0]                           
}) => {
  const [count, setCount] = useState(null);                       //  number shown for count
  const [videoDimensions, setVideoDimensions] = useState({});     //  dimensions to use for canvas
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [centerButtonText, setCenterButtonText] = useState(copy.TAKE_PICTURE);
  // const [cameraStream, setCameraStream] = useState(null);         //  data URL for camera stream
  // const [video, setVideo] = useState(videoRef);             //  grab video element
  // const [status, setStatus] = useState('welcome');                //  status of page (what screen to show)
  // const [photoType, setPhotoType] = useState('jpg');              //  'jpg' / 'gif'
  // const [optionBox, setOptionBox] = useState(null);               //  photoType option box HTML
  // const [countDown, setCountDown] = useState(false);              //  counting down to take picture? T/F
  // const [photoArray, setPhotoArray] = useState([]);               //  array of photos to make GIF
  // const [gifConfirm, setGifConfirm] = useState(false);            //  GIF confirm screen T/F 
  // const [currentGif, setCurrentGif] = useState(null);             //  GIF result 
  // const [loadingGif, setLoadingGif] = useState(false);            //  T when GIF is loading 
  // const [showMiniPics, setShowMiniPics] = useState(false);        //  Show mini pics while taking GIF T/F
  // const [imageCoords, setImageCoords] = useState([0, 0]);         //  coordinates of imag

  const videoToCanvas = () => {
    let canv = canvasRef.current.getContext('2d');
    let v = videoRef.current;
    if (v.paused || v.ended) return false;
    canv.drawImage(v, -120, 0, 960, 720);
    setTimeout(videoToCanvas, 20);
  }

  const startCountdown = () => {
    if (isFrozen) {
      videoRef.current.play();
      videoToCanvas(); 
      setIsFrozen(false);
    }
    setCount(3);
    setIsCountingDown(true);
  };

  const confirmPic = () => {
    setCanvasImage(canvasRef.current.toDataURL('image/jpg'));
  }

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
    if (count === 0) {
      videoRef.current.pause();
      setCount(null);
      setIsFrozen(true);
      setCenterButtonText(copy.RETAKE);
      setIsCountingDown(false);
    }
  }, [count]);
  
  useEffect(() => {
    let constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      videoRef.current.srcObject = stream;
      setVideoDimensions({
        height: videoRef.height,
        width: videoRef.width,
      })
      videoRef.current.play();
      videoToCanvas();              
    })
  }, [videoRef]);

  return {
    count,
    startCountdown,
    isCountingDown,
    centerButtonText,
    isFrozen,
    confirmPic,
  };

}

export default useScreen;