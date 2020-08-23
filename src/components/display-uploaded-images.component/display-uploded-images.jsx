import React, { useState } from "react";
import CreateFolder from "../create-folder/create-folder.component";
import TestButton from "../create-folder/create.btn.component";
import GetLoader from "../../ui/loder";
import { ReactComponent as Tick } from "../../assets/tick.svg";
import "./create-image.style.scss";

const DisplayImages = ({
  images,
  folderId,
  isLoading,
  onLeave,
  onHove,
  history,
  updateHandler,
  filteredImages,
  searchInput,
}) => {
  const [isEditShow, setIsEditShow] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  let localRender = searchInput == "" ? images : filteredImages;
  if (isLoading) {
    return (
      <div className="loader-display">
        <GetLoader />
      </div>
    );
  } else {
    const toggleEl = (id, e) => {
      //const toggleValue = !displayClass;
      // setDisplayClass(toggleValue);
      if (!e.target.parentElement.parentElement.classList.contains("bold")) {
        e.target.parentElement.parentElement.classList = "bold tick";
        e.target.parentElement.parentElement.nextElementSibling.classList =
          "editIcon active";
        //  images.filter(item=>item.id = id)
        const newArr = imagesList.concat(
          images.filter((item) => item.id == id)
        );
        setImagesList(newArr);
        updateHandler(newArr);
      } else {
        e.target.parentElement.parentElement.classList = "tick";
        const removed = imagesList.filter((item) => item.id != id);
        setImagesList(removed);
        updateHandler(removed);
        e.target.parentElement.parentElement.nextElementSibling.classList =
          "editIcon";
      }
      // selectedFolderCount(id, toggleValue);
    };

    return (
      <div
        onMouseEnter={() => setIsEditShow()}
        onMouseLeave={() => setIsEditShow(false)}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {localRender.map((item, index) => (
          <div
            className="image-container"
            onMouseEnter={() =>
              onHove(item.pageNumber, item.description, item.ff_local_datetime)
            }
            onMouseLeave={() => onLeave(false)}
            key={index}
          >
            <Tick className="tick" onClick={(e) => toggleEl(item.id, e)} />
            <div className="editIcon"></div>
            <img
              style={{ height: "96%" }}
              src={require("../../assets/spiral.png")}
            ></img>
            <img
              className="image-display"
              src={item.raw_image_org}
              onClick={() => history.push(`/original/${item.id}/${folderId}`)}
            ></img>
            {item.title && <span className="img-title">{item.title}</span>}
          </div>
        ))}
      </div>
    );
  }
};
export default DisplayImages;
