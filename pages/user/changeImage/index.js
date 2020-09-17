import { StyleChangeImage } from '~/components/layout/changeImage/index'
function ImageProfile({ src }) {

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  console.log('', uploadedImage, imageUploader);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;

      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyleChangeImage>
      <div className="avatar">


        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none"
          }}
        />
        {/* <div

          onClick={() => imageUploader.current.click()}
        > */}

        <img alt="Avatar" className="img-fluid"
          ref={uploadedImage ? uploadedImage : ""} src={src}

        />

        <div className="overlay"><p className="title">Cambiar foto</p></div>

      </div>

      {/* </div> */}
    </StyleChangeImage>
  );
}
export default ImageProfile
