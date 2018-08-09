<template>
    <div>
        <h3>{{bp.title}}:</h3>
        <span v-if="!isUpdating">{{bp.note}}</span>
        <span v-if="isUpdating"><input type="text" v-model="bp.note"></span>
        <div>
            <button v-if="!isUpdating" @click="isUpdating = !isUpdating">Update</button>
            <button v-if="isUpdating" @click="updateBp">Save</button>
            <button name="deleteBp" @click="deleteBp">Delete</button>
        </div>
    </div>
</template>
<script>
const configuration = require("../../config");

const PouchDB = require("pouchdb").default;
var db = new PouchDB(configuration.build.dbName);

export default {
  data() {
    return {
      isUpdating: false
    };
  },
  props: ["bp", "refresh"],
  methods: {
    deleteBp() {
      db.remove(this.bp).then(() => {
        this.refresh(this.bp);
      });
    },
    updateBp() {
      const self = this;
      db.put(this.bp).then(doc => {
        self.bp._rev = doc.rev;
        self.isUpdating = !self.isUpdating;
      });
    }
  }
};
</script>
<style>
</style>
