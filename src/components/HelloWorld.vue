<template>
  <div>
    <h1>{{ msg }}</h1>
    <input v-model="time" />
    <button @click="onClick" v-if="isActive">私待つわ</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Workbox } from "workbox-window";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      wb: new Workbox(`${process.env.BASE_URL}service-worker.js`),
      isActive: false,
      time: 0
    };
  },
  created() {
    this.askNotificationPermission();
    if ("serviceWorker" in navigator) {
      this.wb
        .register()
        .then(() => {
          console.log("Service Worker registration completed.");
          this.isActive = true;
        })
        .catch(err => {
          alert("Service Workerの登録に失敗しました : " + err);
        });
    } else {
      alert("このブラウザはService Workerをサポートしていません。");
    }
  },
  methods: {
    async onClick() {
      const result = await this.wb.messageSW({
        type: "wait",
        wait: this.time
      });
      console.log("Service Worker :", result);
    },
    askNotificationPermission() {
      if ("Notification" in window) {
        Notification.requestPermission((result) => {
          if (result !== "granted") {
            alert("通知をONにしないとこの機能は使えません。");
          }
        });
      } else {
        alert("このブラウザは通知をサポートしていません。");
      }
    },
  }
});
</script>

<style scoped>
</style>
