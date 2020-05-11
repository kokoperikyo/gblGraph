<template>
  <div>
    <div class="mt-2">{{graphInfo.name}}さんのレート推移</div>
    <v-card class="mx-auto text-center mt-1" color="#f1521a" dark width="400px" height="370px">
      <v-card-text>
        <v-sheet color="#B4E1FF" flat>
          <v-sparkline
            :value="graphInfo.rateList"
            color="#f1521a"
            height="180px"
            padding="24"
            stroke-linecap="round"
            smooth
          ></v-sparkline>
        </v-sheet>
      </v-card-text>
      <v-row class="mx-3" no-gutters>
        <v-col v-for="item in graphInfo.rateList" :key="item.index">
          <div class="font-weight-black" style="font-size:8px;">{{item}}</div>
        </v-col>
      </v-row>
      <v-row class="mx-3">
        <v-col v-for="item in labels" :key="item.index">
          <div class="font-weight-black" style="font-size:12px;">{{item}}</div>
        </v-col>
      </v-row>
      <v-img class="rankIcon" :src="whichRank" width="80px"></v-img>
    </v-card>
    <v-card class="mx-auto text-center mt-5" color="#f1521a" dark width="400px">
      <div style="font-size:24px;" class="font-weight-black">称号</div>
      <v-row class="px-2" align="center" justify="center">
        <v-col align="center" cols="6" v-for="item in titleListDis" :key="item">
          <div
            style="font-size:14px; background:#B4E1FF; width:160px; border-radius:10px; color:black;"
          >{{item}}</div>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="isMyGraph" class="mt-5">
      <v-row class="mt-3" align="center" justify="center">
        <v-col cols="12">Twitterでシェアしよう</v-col>
        <v-col cols="12">
          <v-btn small color="primary" @click="TwitterShare" height="60" width="60">
            <v-icon large>mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn class="mt-5 mb-2" rounded outlined color="#f1521a" dark @click="toTop">グラフ再作成</v-btn>
    </div>
    <div v-else class="mt-10 mb-2">
      <div class="mb-3">自分も作ってみる</div>
      <v-icon>mdi-arrow-down-thick</v-icon>
      <v-icon>mdi-arrow-down-thick</v-icon>
      <v-icon>mdi-arrow-down-thick</v-icon>
      <v-row class="mt-3" align="center" justify="center">
        <v-btn color="#f1521a" dark rounded outlined @click="toGuestTop">グラフ作成</v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase";

export default {
  data: () => ({
    labels: [
      "初期",
      "SL最高",
      "SL終了",
      "HL最高",
      "HL終了",
      "ML最高",
      "ML終了",
      "フリ l 最高",
      "最終"
    ],
    graphInfo: null,
    titleListDis: []
  }),
  methods: {
    toTop() {
      this.$router.push("/top");
    },
    toGuestTop() {
      this.$router.push("/guestTop");
    },
    TwitterShare() {
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        "シーズン１振り返りグラフ" +
        "%20%23ポケモンGO" +
        "%20%23GOバトルリーグ" +
        "%20%23GBLグラフ" +
        "&url=" +
        // `http://192.168.3.68:8081/graph/${this.$route.params["uid"]}`;
        `https://gblgraph.firebaseapp.com/graph/${this.$route.params["uid"]}`;
      location.href = shareURL;
    }
  },
  computed: {
    isMyGraph() {
      if (this.$route.params["uid"] == localStorage.getItem("key")) {
        return true;
      } else {
        return false;
      }
    },
    whichRank() {
      const maxRate = Math.max.apply(null, this.graphInfo.rateList);
      if (maxRate >= 3000) {
        return "https://firebasestorage.googleapis.com/v0/b/gblgraph.appspot.com/o/icon%2F%E3%83%A9%E3%83%B3%E3%82%AF%EF%BC%91%EF%BC%90.png?alt=media&token=b9fffe13-ddc2-4011-a416-ce02f4e14d30";
      } else if (maxRate >= 2500) {
        return "https://firebasestorage.googleapis.com/v0/b/gblgraph.appspot.com/o/icon%2F%E3%83%A9%E3%83%B3%E3%82%AF%EF%BC%99.png?alt=media&token=cd859cdc-e329-4121-ac0e-35d3b49b5701";
      } else if (maxRate >= 2000) {
        return "https://firebasestorage.googleapis.com/v0/b/gblgraph.appspot.com/o/icon%2F%E3%83%A9%E3%83%B3%E3%82%AF%EF%BC%98.png?alt=media&token=22a3e6a4-ca38-4dd5-b1f3-11bcf7a27d1e";
      } else {
        return "https://firebasestorage.googleapis.com/v0/b/gblgraph.appspot.com/o/icon%2F%E3%83%A9%E3%83%B3%E3%82%AF%EF%BC%97.png?alt=media&token=bef0e736-79fa-414c-96c0-7f3913f45df0";
      }
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.graphInfo == null) {
        this.$router.push("/notfound");
      }

      const titleList = [];
      const rateListArray = this.graphInfo.rateList;
      const copyRateListArrayForSix = [].concat(this.graphInfo.rateList); //配列コピー
      const copyRateListArrayForSeven = [].concat(this.graphInfo.rateList); //配列コピー
      const copyRateListArrayForEight = [].concat(this.graphInfo.rateList); //配列コピー
      copyRateListArrayForSix.shift();
      copyRateListArrayForSeven.shift();
      copyRateListArrayForEight.shift();
      copyRateListArrayForSix.pop();
      copyRateListArrayForSix.pop();
      copyRateListArrayForSeven.pop();
      const favorite = copyRateListArrayForSix.indexOf(
        Math.max(...copyRateListArrayForSix)
      );
      const favoriteAll = rateListArray.indexOf(Math.max(...rateListArray));
      console.log(favoriteAll);

      const maxRate = Math.max.apply(null, copyRateListArrayForSix);
      //リーグ適正
      if (favorite == 0) {
        if (maxRate >= 3000) {
          titleList.push("スーパーリーグ◎");
        } else {
          titleList.push("スーパーリーグ◯");
        }
      } else if (favorite == 2) {
        if (maxRate >= 3000) {
          titleList.push("ハイパーリーグ◎");
        } else {
          titleList.push("ハイパーリーグ◯");
        }
      } else if (favorite == 4) {
        if (maxRate >= 3000) {
          titleList.push("マスターリーグ◎");
        } else {
          titleList.push("マスターリーグ◯");
        }
      }
      //初期レートが高い人
      if (rateListArray[0] >= 2700) {
        titleList.push("スタートダッシュ◎");
      } else if (rateListArray[0] >= 2500) {
        titleList.push("スタートダッシュ◯");
      }
      //ランク
      if (Math.max.apply(null, rateListArray) >= 3000) {
        titleList.push("ランク10");
      } else if (Math.max.apply(null, rateListArray) >= 2500) {
        titleList.push("ランク9");
      } else if (Math.max.apply(null, rateListArray) >= 2000) {
        titleList.push("ランク8");
      }
      //初期レートが低くて3000越えの人
      if (rateListArray[0] <= 2000 && rateListArray[8] >= 3000) {
        titleList.push("マジもんのヤベーやつ");
      } else if (rateListArray[0] <= 2200 && rateListArray[8] >= 3000) {
        titleList.push("塵も積もれば");
      }
      //最強決定
      const fil = copyRateListArrayForSeven.filter(num => num >= 3000);
      if (rateListArray[8] >= 3000 && fil.length >= 3) {
        titleList.push("††最強††");
      } else if (rateListArray[8] >= 3000 && fil.length >= 2) {
        titleList.push("強者");
      }
      //3000以上世界ランカー
      if (Math.max.apply(null, rateListArray) >= 3100) {
        titleList.push("世界トップランカー");
      } else if (Math.max.apply(null, rateListArray) >= 3000) {
        titleList.push("世界ランカー");
      }
      //下げ幅
      if (rateListArray[1] - rateListArray[4] >= 300) {
        titleList.push("滅びろハイパーリーグ");
      } else if (rateListArray[1] - rateListArray[4] >= 200) {
        titleList.push("ハイパーリーグ？知らない娘だね");
      }
      if (rateListArray[3] - rateListArray[6] >= 300) {
        titleList.push("滅びろマスターリーグ");
      } else if (rateListArray[3] - rateListArray[6] >= 200) {
        titleList.push("マスターリーグ？なにそれ美味しいの？");
      }
      // 山あり谷あり
      if (
        Math.max.apply(null, copyRateListArrayForSix) -
          Math.min.apply(null, copyRateListArrayForEight) >=
        500
      ) {
        titleList.push("山あり谷あり");
      } else if (
        Math.max.apply(null, copyRateListArrayForSix) -
          Math.min.apply(null, copyRateListArrayForEight) >=
        300
      ) {
        titleList.push("悔しさこそが成長のバネ");
      }
      //大器晩成
      if (maxRate < 3000 && rateListArray[7] >= 3000) {
        titleList.push("大器晩成");
      }
      //右肩上がり
      if (
        rateListArray[0] <= rateListArray[1] &&
        rateListArray[1] <= rateListArray[2] &&
        rateListArray[2] <= rateListArray[3] &&
        rateListArray[3] <= rateListArray[4] &&
        rateListArray[4] <= rateListArray[5] &&
        rateListArray[5] <= rateListArray[6] &&
        rateListArray[6] <= rateListArray[7] &&
        rateListArray[7] <= rateListArray[8]
      ) {
        titleList.push("右肩上がり");
      } else if (
        rateListArray[0] <= rateListArray[1] &&
        rateListArray[1] <= rateListArray[3] &&
        rateListArray[3] <= rateListArray[5] &&
        rateListArray[5] <= rateListArray[7]
      ) {
        titleList.push("順調な人生");
      }
      //転落人生
      if (favoriteAll == 1) {
        titleList.push("転落人生");
      } else if (favoriteAll == 0) {
        titleList.push("上を向いて歩こう");
      }
      this.titleListDis = titleList;
    }, 3000);
  },
  firestore() {
    return {
      graphInfo: db.collection("graphInfo").doc(this.$route.params["uid"])
    };
  }
};
</script>
<style>
.rankIcon {
  position: absolute;
  bottom: 290px;
  left: 20px;
}
.title {
  font-size: 14px;
  background: #b4e1ff;
  width: 160px;
  border-radius: 10px;
  color: black;
}
</style>