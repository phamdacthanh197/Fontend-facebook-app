import React from 'react';

const CardMedia = ({ url, file , controls = true}) => {
  const image = (new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|jfif|JPG|JPEG|PNG|GIF)$/)).test(url) 
  const isVideo = file?.type?.includes('video');
  const isImage = file?.type?.includes('image');
  
  return (
    <>
      {!image && url && (
        <video controls={controls} style={{ height: '100%', width: '100%' }}>
          <source src={url} type="video/mp4" />
        </video>
      )}
       {image && <img style={{ height: '100%', width: '100%' }} src={url} alt="photo" />} 

      {isVideo && (
        <video
          src={file.preview}
          controls
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top:  0
          }}
        />
      )}
      {isImage && (
        <img
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0
          }}
          src={file.preview}
          alt="images"
        />
      )}
    </>
  );
};

export default React.memo(CardMedia);
