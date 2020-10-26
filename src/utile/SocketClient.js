import socketIoClient from "socket.io-client";

let _socket = null;// soket通信のインスタンス
let state = '';//通信の最新状態
let on_message = [];//受信メッセージに紐づけれた動作の一覧

export default class SocketClient {
    
    constructor (params = {}) {
        const {
            ip = '192.168.10.100',
            port = '20000',
            my_address = 'ReceptionApp',
            my_name = 'reception',
            destination_address = 'MonitoringApp',
            destination_name = 'mornitoring',
            _get_func = (msg) =>{ console.log("socket通信受信:" + msg) }
        } = params;

        _socket = socketIoClient(`ws://${ip}:${port}`)

        _socket.on('connect', () => {
    
            _socket.on(my_address, (msg) => {
                // io.emit('server message', msg);
                this._getMessage(msg);
                _get_func(msg);
            });
        });

        this.my_address = my_address;
        this.my_name = my_name;
        this.destination_address = destination_address;
        this.destination_name = destination_name;

    }

    _getMessage(msg){
        console.log(`get message: ${msg}`);

        let ar_msg = msg.split(',');

        // 入力値チェック
        if(ar_msg.length < 3){
            console.warn("受信したメッセージの項目数が少なすぎます");
        }
        if(ar_msg[0] !== this.destination_name){
            console.warn("受信したメッセージの宛先が不正です");
        }
        if(ar_msg[1] !== 'request' && ar_msg[1] !== 'response'){
            console.warn("第2引数がrequest or response以外のメッセージが届きました");
        }

        on_message.forEach(param =>{
            if(msg === `${this.destination_name},${param[0]}\n`){
                //登録済みのメッセージのとき、登録funtionを実行
                param[1](ar_msg);
            }
        })
    }

    //受信メッセージに動作を紐づける
    on(target_message, param_function){
        on_message.push([target_message, param_function]);
    }

    // メッセージを送信
    sendMessage(msg, add_name_flg = false){
        if(add_name_flg === true){
            _socket.emit(this.destination_address, `${this.my_name},${msg}\n`);
        }else{
            _socket.emit(this.destination_address, `${msg}\n`);
        }
        
    }
}