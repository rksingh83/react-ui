import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Notification = () => {
  useEffect(() => {
    connect();
  }, []);
  function connect() {
    var socket = new SockJS(
      "http://3.7.41.59:9082/mydiginotes/tutorialspoint-websocket"
    );
    console.log(socket)
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      // setConnected(true);
      //console.log("Connected: " + frame);
      stompClient.subscribe("/topic/greetings", function (greeting) {
        console.log(JSON.parse(greeting.body));
        console.log("called");
      });
    });
  }
  return (
    <div>
      <h2>WELCOME</h2>
    </div>
  );
};

export default Notification;
