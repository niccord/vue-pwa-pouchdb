<template>
    <div class="card">
        <h3>{{element.title}}:</h3>
        <span v-if="!isUpdating">{{element.note}}</span>
        <span v-if="isUpdating"><input type="text" v-model="element.note"></span>
        <div>
            <button v-if="!isUpdating" @click="isUpdating = !isUpdating">Update</button>
            <button v-if="isUpdating" @click="updateElement">Save</button>
            <button name="deleteelement" @click="deleteElement">Delete</button>
        </div>
    </div>
</template>
<script>
import db from "../assets/PouchDBConnection";

export default {
  data() {
    return {
      isUpdating: false
    };
  },
  props: ["element", "refresh"],
  methods: {
    deleteElement() {
      db.remove(this.element).then(() => {
        this.refresh(this.element);
      });
    },
    updateElement() {
      const self = this;
      db.put(this.element).then(doc => {
        self.element._rev = doc.rev;
        self.isUpdating = !self.isUpdating;
      });
    }
  }
};
</script>
<style>
.card {
  min-width: 100px;
  max-width: 300px;
}
</style>
