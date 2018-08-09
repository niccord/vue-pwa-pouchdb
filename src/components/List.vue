<template>
  <div>
    <best-practice v-for="bp in alldocs" :bp="bp" :refresh="spliceBp" :key="bp._id">
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
const configuration = require("../../config");

const PouchDB = require("pouchdb").default;
var db = new PouchDB(configuration.build.dbName);

export default {
  created() {
    this.getList();
  },
  data() {
    return {
      newBpTitle: "",
      newBpNote: "",
      alldocs: []
    };
  },
  computed: {},
  methods: {
    add() {
      if (this.newBpTitle !== "" && this.newBpNote !== "") {
        const note = { title: this.newBpTitle, note: this.newBpNote };
        db.post(note).then(() => {
          return this.getList();
        }).then(() => {
          this.newBpTitle = "";
          this.newBpNote = "";
        });
      } else {
        alert("Titolo e note sono obbligatori");
      }
    },
    spliceBp(doc) {
      this.alldocs.splice(this.alldocs.indexOf(doc), 1);
    },
    async getList() {
      const ad = await db.allDocs({
        include_docs: true,
        attachments: true
      });
      this.alldocs = ad.rows.map(row => row.doc);
    }
  },
  components: {
    bestPractice
  }
};
</script>
<style>
</style>
