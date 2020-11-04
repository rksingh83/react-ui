import React, { useState } from "react";
import Input from "../boostrapinput/input.component";
import { Post, Get } from "../../service/service.setup";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import Cookies from "js-cookie";
import { setCurrentFile } from "../../redux/file/file.actions";
import { setFolderFlag } from "../../redux/shared-folder/folder.actions";
import { useDispatch } from "react-redux";
import { setCurrentImageId } from "../../redux/file/pageId.action";
const createHistory = require("history").createBrowserHistory;

const LouOut = ({ history, setCurrentUser, setFolderFlag, setCurrentFile }) => {
  Cookies.set("token", "");
  const dispatch = useDispatch();
  setCurrentUser(null);
  history.push("/");
  setCurrentFile([]);
  setFolderFlag("HOME");
  dispatch(setCurrentImageId(""));

  return true;
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setFolderFlag: (flag) => dispatch(setFolderFlag(flag)),
  setCurrentFile: (currentFile) => dispatch(setCurrentFile(currentFile)),
});
export default connect(null, mapDispatchToProps)(LouOut);
