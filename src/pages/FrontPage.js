import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Screen from '../components/Screen';
import { status } from '../utils/constants';

const FrontPage = () => {
  const [screenStatus, setScreenStatus] = useState(status.VIDEO_SCREEN);
  const [canvasImage, setCanvasImage] = useState(null);
  const navigateToVideoScreen = () => setScreenStatus(status.VIDEO_SCREEN);
  const navigateToDataScreen = () => setScreenStatus(status.DATA_SCREEN);
  return (
    <Container>
      <Typography variant="h3" align="center">
        Welcome to Poly Booth!
      </Typography>
      {screenStatus === status.VIDEO_SCREEN && (
        <Screen
          navigateToPropScreen={navigateToPropScreen}
          setCanvasImage={setCanvasImage}
        />
      )}
    </Container>
  )
}

export default FrontPage;
