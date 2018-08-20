<template>
  <div>
    <div class="elementList">
      <list-element v-for="element in alldocs" :element="element" :refresh="spliceElements" :key="element._id">
      </list-element>
    </div>
    <br>
    <div>
      <div>
        <label for="newElementTitle">Title:</label>
        <input type="text" name="newElementTitle" id="newElementTitle" v-model="newElementTitle" placeholder="Insert title">
      </div>
      <div>
        <label for="newElementNote">Note:</label>
        <input type="text" name="newElementNote" id="newElementNote" v-model="newElementNote" placeholder="Insert note">
      </div>
      <button name="add" @click="add">Add</button>
    </div>
  </div>
</template>
<script>
import db from "../assets/PouchDBConnection";
import listElement from "./ListElement.vue";

export default {
  created() {
    this.getList();
  },
  data() {
    return {
      newElementTitle: "",
      newElementNote: "",
      alldocs: []
    };
  },
  computed: {},
  methods: {
    add() {
      if (this.newElementTitle !== "" && this.newElementNote !== "") {
        const note = { title: this.newElementTitle, note: this.newElementNote };
        db
          .post(note)
          .then(() => {
            return this.getList();
          })
          .then(() => {
            this.newElementTitle = "";
            this.newElementNote = "";
          });
      } else {
        alert("Title and details are both mandatory");
      }
    },
    spliceElements(doc) {
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
    listElement
  }
};
</script>
<style>
.elementList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>
