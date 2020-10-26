<template>
  <div class="hello">

    
    <div class="message-box" v-show="socket === null">
      <label for="connction_ip">接続先IP:</label>
      <input type="text" name="connction_ip" id="" v-model="connction_ip" />
      <button @click="connctStart" v-text="connctionStatus" class="button" ></button>
    </div>
    

    <div class="message-box" v-show="socket !== null">
      <label for="send_message">メッセージ送信:</label>
      <input type="text" name="send_message" v-model="send_message" class="long-text" />
      <button @click="sendMessage" class="button">送信</button>
    </div>
    
    <table border="1" class="message-table">
      <tr v-for="(item, index) in message_history" v-bind:key="index">
        <th v-text="item[0]"></th>
        <th v-text="item[1]"></th>
      </tr>
    </table>

  </div>
</template>

<script>
import tcpSocketClient from "../utile/tcpSocketClient";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      port: 20000,//ポート番号

      socket: null,
      connction_ip: "172.17.1.147",
      send_message: "reception,response,state,wait",
      message_history: [["方向", "メッセージの内容"]],
    }
  },
  methods: {
    connctStart(){
      this.socket = new tcpSocketClient({ip: this.connction_ip, _get_func: (msg)=>{ this.message_history.push(["受信", msg]); } });

      this.socket .on("request,state,check", (msg)=>{ console.log("response checked!"); });
      
    },
    sendMessage(){
      this.socket.sendMessage(this.send_message);
      this.message_history.push(["送信", this.send_message]);

    }
  },
  computed: {
    connctionStatus: function () {
      // webSoket接続ボタンのラベル
      return this.socket === null ? "接続" : "接続中";
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message-box{
  display: inline-block;
  margin: 10px;
}

.long-text{
  width: 300px;
}
.button{
  margin: 5px;
}

.message-table{
  border-collapse: collapse;
  margin: auto;

  th {
    padding: 10px;
    border: solid 1px black;
  }

  td {
    padding: 3px 10px;
    border: solid 1px black;
  }
}
</style>
