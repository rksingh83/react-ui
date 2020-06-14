import React from "react";
import Webcam from "react-webcam";
import { Post, Get } from "../../service/service.setup";
const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

function converBase64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var b64DataString = b64Data.substr(b64Data.indexOf(",") + 1);
  var byteCharacters = atob(b64DataString);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type: contentType,
  });
  return blob;
}
function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
const WebcamCapture = ({ id }) => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setFile(blobToFile(converBase64toBlob(imageSrc, "image/jpeg"), "test.png"));

    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  const upload = async () => {
    console.log(file);
    console.log(new File([file], "name.png"));
    const formData = new FormData();
    var d = new Date();
    let imageName = d.getTime();
    imageName = `jpg_${imageName}.jpg`
    formData.append("files", new File([file],imageName));
    console.log(formData);
    try {
      let res = await Post("/uploadImage", formData, {
        headers: {
          fileId: id,
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button className="btn-success btn" onClick={capture}>
          Capture photo
        </button>

        {file ? (
          <button className="btn-primary btn ml-4" onClick={upload}>
            Upload
          </button>
        ) : (
          ""
        )}
      </div>
      {imgSrc && <img src={imgSrc} />}
    </div>
  );
};

export default WebcamCapture;
