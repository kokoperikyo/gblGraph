<template>
  <div class="content">
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" align="center">
        <v-img
          width="220px"
          src="https://firebasestorage.googleapis.com/v0/b/gblgraph.appspot.com/o/icon%2F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202020-05-08%2012.35.58.png?alt=media&token=b389877a-b0fd-4b7e-977b-662c409ad9c7"
        ></v-img>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  mounted() {
    if (localStorage.getItem("key") == null) {
      var len = 20;
      var str = "abcdefghijklmnopqrstuvwxyz";
      var strLen = str.length;
      var result = "";
      for (var i = 0; i < len; i++) {
        result += str[Math.floor(Math.random() * strLen)];
      }
      localStorage.setItem("key", result);
      setTimeout(() => {
        this.$router.push("/top");
      }, 3000);
    } else {
      this.$router.push("/top");
    }
  }
};
</script>
<style>
.content {
  margin-top: 200px;
}
</style>