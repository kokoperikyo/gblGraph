<template>
  <div>
    <v-dialog v-model="makeGraphDialog" max-width="360">
      <v-card class="pa-2" max-width="360">
        <v-row>
          <v-col style="font-size:10px;" class="mt-4" color="#f1521a" cols="3">ニックネーム</v-col>
          <v-col cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputNicknameError"
              v-model="inputNickname"
              rounded
              placeholder="twitter名など"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:12px;" class="mt-3" color="#f1521a" cols="3">初期</v-col>
          <v-col cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputFirstError"
              v-model="inputFirst"
              rounded
              placeholder="初期レート"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:8px;" class="mt-3" cols="3">SL最高</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputSuperMaxError"
              v-model="inputSuperMax"
              rounded
              placeholder="スーパーリーグ最高"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:8px;" class="mt-3" cols="3">SL終了</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputSuperError"
              v-model="inputSuper"
              rounded
              placeholder="スーパーリーグ終了時"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:8px;" class="mt-3" cols="3">HL最高</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputHyperMaxError"
              v-model="inputHyperMax"
              rounded
              placeholder="ハイパーリーグ最高"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:8px;" class="mt-3" cols="3">HL終了</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputHyperError"
              v-model="inputHyper"
              rounded
              placeholder="ハイパーリーグ終了時"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:8px;" class="mt-3" cols="3">ML最高</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputMasterMaxError"
              v-model="inputMasterMax"
              rounded
              placeholder="マスターリーグ最高"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:8px;" class="mt-3" cols="3">ML終了</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputMasterError"
              v-model="inputMaster"
              rounded
              placeholder="マスターリーグ終了時"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:10px;" class="mt-3" cols="3">フリー最高</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              background-color="#B4E1FF"
              :error-messages="inputFinalMaxError"
              v-model="inputFinalMax"
              rounded
              placeholder="全リーグ解放時最高レート"
              solo
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="font-size:12px;" class="mt-3" cols="3">最終</v-col>
          <v-col color="#f1521a" cols="8">
            <v-text-field
              v-model="inputLast"
              :error-messages="inputLastError"
              placeholder="最終レート"
              solo
              required
              background-color="#B4E1FF"
              clearable
              dense
              rounded
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          class="my-5"
          :disabled="isError"
          @click="makeGraph"
          color="#f1521a"
          rounded
          outlined
        >グラフ作成</v-btn>
      </v-card>
    </v-dialog>
    <div style="color:black;" class="pt-10">シーズン2お疲れ様でした</div>
    <div style="color:black;">レートの推移をグラフで振り返ってみませんか？</div>
    <v-btn class="mt-5" color="#f1521a" dark rounded @click="makeGraphDialog = true">グラフを作る</v-btn>
    <div class="mt-10">サンプル</div>
    <v-icon>mdi-arrow-down-thick</v-icon>
    <v-icon>mdi-arrow-down-thick</v-icon>
    <v-icon>mdi-arrow-down-thick</v-icon>
    <v-card class="mx-auto text-center mt-10" color="#f1521a" dark width="400px" height="388px">
      <v-card-text>
        <v-sheet color="#B4E1FF" flat>
          <v-sparkline
            :value="value"
            color="#f1521a"
            height="200"
            padding="24"
            stroke-linecap="round"
            smooth
          ></v-sparkline>
        </v-sheet>
      </v-card-text>
      <v-row class="mx-3" no-gutters>
        <v-col v-for="item in value" :key="item.index">
          <div style="font-size:12px;">{{item}}</div>
        </v-col>
      </v-row>
      <v-row class="mx-3">
        <v-col v-for="item in labels" :key="item.index">
          <div style="font-size:12px;">{{item}}</div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  integer,
  maxValue
} from "vuelidate/lib/validators";
import "@firebase/firestore";
import { db } from "@/plugins/firebase";
// import firebase from "@firebase/app";

export default {
  mixins: [validationMixin],

  validations: {
    inputNickname: {
      required
    },
    inputFirst: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputSuperMax: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputSuper: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputHyperMax: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputHyper: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputMasterMax: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputMaster: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputFinalMax: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    },
    inputLast: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3499),
      int: integer
    }
  },
  data: () => ({
    makeGraphDialog: false,
    labels: [
      "初期",
      "SL最高",
      "SL終了",
      "HL最高",
      "HL終了",
      "ML最高",
      "ML終了",
      "フリ | 最高",
      "最終"
    ],
    value: [2246, 2510, 2480, 2804, 2790, 2804, 2660, 3020, 3020],
    inputNickname: "",
    inputFirst: "",
    inputSuper: "",
    inputHyper: "",
    inputMaster: "",
    inputFirstMax: "",
    inputSuperMax: "",
    inputHyperMax: "",
    inputMasterMax: "",
    inputFinalMax: "",
    inputLast: ""
  }),
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
    }
  },
  methods: {
    makeGraph() {
      const array = [
        parseInt(this.inputFirst),
        parseInt(this.inputSuperMax),
        parseInt(this.inputSuper),
        parseInt(this.inputHyperMax),
        parseInt(this.inputHyper),
        parseInt(this.inputMasterMax),
        parseInt(this.inputMaster),
        parseInt(this.inputFinalMax),
        parseInt(this.inputLast)
      ];

      db.collection("graphInfoSeason2")
        .doc(localStorage.getItem("key"))
        .set({
          rateList: array,
          name: this.inputNickname
        });
      this.$router.push({
        name: "graphWithPa",
        params: { uid: localStorage.getItem("key") }
      });
    }
  },
  computed: {
    inputNicknameError() {
      const errors = [];
      if (this.$v.inputNickname.$dirty) return errors;
      !this.$v.inputNickname.required && errors.push("必須項目です");
      return errors;
    },
    inputFirstError() {
      const errors = [];
      if (this.$v.inputFirst.$dirty) return errors;
      !this.$v.inputFirst.int && errors.push("数字を入力してください");
      !this.$v.inputFirst.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputFirst.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputFirst.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputFirst.required && errors.push("必須項目です");
      return errors;
    },
    inputSuperMaxError() {
      const errors = [];
      if (this.$v.inputSuperMax.$dirty) return errors;
      !this.$v.inputSuperMax.int && errors.push("数字を入力してください");
      !this.$v.inputSuperMax.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputSuperMax.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputSuperMax.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputSuperMax.required && errors.push("必須項目です");
      return errors;
    },
    inputSuperError() {
      const errors = [];
      if (this.$v.inputSuper.$dirty) return errors;
      !this.$v.inputSuper.int && errors.push("数字を入力してください");
      !this.$v.inputSuper.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputSuper.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputSuper.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputSuper.required && errors.push("必須項目です");
      return errors;
    },
    inputHyperMaxError() {
      const errors = [];
      if (this.$v.inputHyperMax.$dirty) return errors;
      !this.$v.inputHyperMax.int && errors.push("数字を入力してください");
      !this.$v.inputHyperMax.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputHyperMax.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputHyperMax.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputHyperMax.required && errors.push("必須項目です");
      return errors;
    },
    inputHyperError() {
      const errors = [];
      if (this.$v.inputHyper.$dirty) return errors;
      !this.$v.inputHyper.int && errors.push("数字を入力してください");
      !this.$v.inputHyper.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputHyper.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputHyper.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputHyper.required && errors.push("必須項目です");
      return errors;
    },
    inputMasterMaxError() {
      const errors = [];
      if (this.$v.inputMasterMax.$dirty) return errors;
      !this.$v.inputMasterMax.int && errors.push("数字を入力してください");
      !this.$v.inputMasterMax.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputMasterMax.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputMasterMax.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputMasterMax.required && errors.push("必須項目です");
      return errors;
    },
    inputMasterError() {
      const errors = [];
      if (this.$v.inputMaster.$dirty) return errors;
      !this.$v.inputMaster.int && errors.push("数字を入力してください");
      !this.$v.inputMaster.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputMaster.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputMaster.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputMaster.required && errors.push("必須項目です");
      return errors;
    },
    inputFinalMaxError() {
      const errors = [];
      if (this.$v.inputFinalMax.$dirty) return errors;
      !this.$v.inputFinalMax.int && errors.push("数字を入力してください");
      !this.$v.inputFinalMax.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputFinalMax.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputFinalMax.maxValue &&
        errors.push("さすがにそれはないっしょwww");
      !this.$v.inputFinalMax.required && errors.push("必須項目です");
      return errors;
    },
    inputLastError() {
      const errors = [];
      if (this.$v.inputLast.$dirty) return errors;
      !this.$v.inputLast.int && errors.push("数字を入力してください");
      !this.$v.inputLast.minLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputLast.maxLength &&
        errors.push("4桁の数字を入力してください");
      !this.$v.inputLast.maxValue && errors.push("さすがにそれはないっしょwww");
      !this.$v.inputLast.required && errors.push("必須項目です");
      return errors;
    },
    isError() {
      if (
        this.inputNicknameError.length == 0 &&
        this.inputFirstError.length == 0 &&
        this.inputSuperError.length == 0 &&
        this.inputHyperError.length == 0 &&
        this.inputMasterError.length == 0 &&
        this.inputSuperMaxError.length == 0 &&
        this.inputHyperMaxError.length == 0 &&
        this.inputMasterMaxError.length == 0 &&
        this.inputLastError.length == 0
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  firestore() {
    return {
      // firestoreのcommentsコレクションを参照
      // graphInfo: db.collection("graphInfo").doc(localStorage.getItem("key"))
    };
  }
};
</script>
