import consumer from "./consumer"

const ChatChannel = consumer.subscriptions.create("RoomChannel", {
  //接続時
  connected() {
    console.log("connected")
    // Called when the subscription is ready for use on the server
  },
  //切断時
  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  //メッセージを受け取ったとき
  received(message) {
    const messages = document.getElementById('messages');
    messages.innerHTML += message;
    // Called when there's incoming data on the websocket for this channel
  },

  //メッセージ送信用
  speak: function(content) {
    return this.perform('speak',{message: content});//room_channel.rbのspeakメソッド実行,値を送信
  }
});

document.addEventListener('DOMContentLoaded',function(){
  let input = document.getElementById("chat-input");
  let button = document.getElementById('button'); button.addEventListener('click',function(){
    let content = input.value
    ChatChannel.speak(content)
    input.value = ''
  });
});
