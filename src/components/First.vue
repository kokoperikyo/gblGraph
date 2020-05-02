<template>
  <div>first</div>
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