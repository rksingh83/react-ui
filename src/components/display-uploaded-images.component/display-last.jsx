import React, { useEffect, useState } from "react";
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import { Post, Get } from "../../service/service.setup";
import "./create-image.style.scss";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Pencil } from "../../assets/edit.svg";

const DisplayLastImage = ({ match, history }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const requestFile = { ids: [match.params.id], imagetype: "original" };

    Post("/getAnyCloudImages", requestFile).then((res) => {
      if (res.data.code == 201) {
        alert(res.data.error);
        history.push("/logout");
      }
      setImageUrl(res.data.imageInput[0].align_image_org);
    });
  }, []);
  const styleImage = {
    width: "100%",
    height: "100%",
  };
  const crossStyle = {
    position: "absolute",
    width: "4rem",
    height: "2rem",
    top: "5rem",
    right: "3rem",
  };
  const pencilStyle = {
    position: "absolute",
    width: "4rem",
    height: "2rem",
    top: "5rem",
    right: "7rem",
  };
  const download = (src) => {
    var element = document.createElement("a");
    var file = new Blob([src], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Cross onClick={() => history.goBack()} style={crossStyle}></Cross>
      <Pencil
        onClick={() => history.push(`/edit/${match.params.id}`)}
        style={pencilStyle}
      ></Pencil>
      <button onClick = {()=>download(imageUrl)}>Download</button>>
      <img style={styleImage} src={`${imageUrl}`}></img>
    </div>
  );
};
export default DisplayLastImage;
