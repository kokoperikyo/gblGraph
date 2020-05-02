<template>
  <div>
    <v-card class="mx-auto text-center mt-1" color="#B4E1FF" width="400px">
      <div style="color:black;" class="pt-10">シーズン１お疲れ様でした</div>
      <div style="color:black;">レートの推移をグラフで振り返ってみませんか？</div>
      <v-row>
        <v-col style="font-size:10px;" class="mt-3" color="#f1521a" cols="3">ニックネーム</v-col>
        <v-col cols="8">
          <v-text-field
            background-color="white"
            :error-messages="inputNicknameError"
            v-model="inputNickname"
            rounded
            placeholder="twitter名など"
            solo
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col style="font-size:12px;" class="mt-3" color="#f1521a" cols="3">初期</v-col>
        <v-col cols="8">
          <v-text-field
            background-color="white"
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
        <v-col style="font-size:12px;" class="mt-3" cols="3">スーパー</v-col>
        <v-col color="#f1521a" cols="8">
          <v-text-field
            background-color="white"
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
        <v-col style="font-size:12px;" class="mt-3" cols="3">ハイパー</v-col>
        <v-col color="#f1521a" cols="8">
          <v-text-field
            background-color="white"
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
        <v-col style="font-size:12px;" class="mt-3" cols="3">マスター</v-col>
        <v-col color="#f1521a" cols="8">
          <v-text-field
            background-color="white"
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
        <v-col style="font-size:12px;" class="mt-3" cols="3">最終</v-col>
        <v-col color="#f1521a" cols="8">
          <v-text-field
            v-model="inputLast"
            :error-messages="inputLastError"
            placeholder="最終レート"
            solo
            required
            background-color="white"
            clearable
            dense
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="isError" class="my-5" @click="makeGraph" color="#f1521a" dark rounded>グラフ作成</v-btn>
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
      maxValue: maxValue(3299),
      int: integer
    },
    inputSuper: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3299),
      int: integer
    },
    inputHyper: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3299),
      int: integer
    },
    inputMaster: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3299),
      int: integer
    },
    inputLast: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
      maxValue: maxValue(3299),
      int: integer
    }
  },
  data: () => ({
    inputNickname: "",
    inputFirst: "",
    inputSuper: "",
    inputHyper: "",
    inputMaster: "",
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
        parseInt(this.inputSuper),
        parseInt(this.inputHyper),
        parseInt(this.inputMaster),
        parseInt(this.inputLast)
      ];

      db.collection("graphInfo")
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
