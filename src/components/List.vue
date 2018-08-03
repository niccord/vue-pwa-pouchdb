<template>
  <div>
    <best-practice v-for="(i, index) in list" :bp="i" :key="index">
    </best-practice>
    <br>
    <div>
      <input type="text" name="newBpTitle" id="newBpTitle" v-model="newBpTitle">
      <input type="text" name="newBpNote" id="newBpNote" v-model="newBpNote">
      <button name="add" @click="add">Add</button>
    </div>
  </div>
</template>
<script>
import bestPractice from "./BestPractice.vue";

export default {
  data() {
    return {
      newBpTitle: "",
      newBpNote: "",
      list: [
        { title: "Teeth", note: "Remember to wash them every day!" },
        { title: "Be nice", note: 'Always say "Please" and "Thank you"' }
      ]
    };
  },
  methods: {
    add() {
      if (this.newBpTitle !== "" && this.newBpNote !== "") {
        this.list.push({ title: this.newBpTitle, note: this.newBpNote });
        this.newBpTitle = "";
        this.newBpNote = "";
      } else {
        alert("Titolo e note sono obbligatori");
      }
    }
  },
  components: {
    bestPractice
  }
};
</script>
<style>
</style>
