import { Socket } from "../../../deps/phoenix/web/static/js/phoenix"
import moment, * as moments from 'moment';

console.log(moment);
let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let app = new Vue({
  el: '#app',
  mounted() {
      this.channel = socket.channel("rooms:lobby", {});
      this.channel.on("new_msg", payload => {
      payload.at = moment(Date()).format('DD/MM/YYYY HH:mm:ss');
      this.messages.push(payload);
  });
  this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  },
  data: {
    messages: [],
    newMessage: '',
    channel: null
  },
  computed: {

  },
  methods: {
    sendNewMessage() {
      this.channel.push("new_msg", {body: this.newMessage});
      this.newMessage = '';
    }
  }
});

export default socket