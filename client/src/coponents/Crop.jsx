import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../lib/cropUtil';

import CustomButton from './CustomButton';

const Crop = ({ imageSrc, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropDone(croppedImage);
  };

  return (
    <div className='w-full h-full bg-background relative z-10' >
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          onZoomChange={setZoom}
          aspect={1} // you can change this to 16/9 or any custom ratio
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          cropShape="round"
          showGrid={false}
          objectFit="vertical"
        />
      </div>

      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
          className="zoom-range"
        />
      </div>


      <div style={{ padding: 10 }}>
        <CustomButton onClick={handleDone}>Crop</CustomButton>
      </div>
    </div>
  );
};

export default Crop;
