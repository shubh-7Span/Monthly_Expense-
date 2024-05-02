<template>
<div id="app">
  <Order  :selectedItem="selectedItemIndex"  update="updateItem" />
<List @editdata="edit" />
</div>
</template>

<script setup>
import {ref} from 'vue';

import List from './components/List.vue';
import Order from './components/Order.vue'

let selectedItemIndex = ref(null);


const edit = (editIndex) => {
  selectedItemIndex.value = editIndex
}


</script>