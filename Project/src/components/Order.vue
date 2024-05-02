<template>
  <form class="bg-black" @submit.prevent="addOrUpdateExpense">
    <h2 class="text-xl text-center text-white font-bold">Expenses</h2>
    <div class="flex items-center justify-center h-[350px]">
      <div class="bg-white p-8 rounded-lg">
        <input
          type="text"
          v-model="editedData.name"
          id="name"
          placeholder="Customer Name"
          class="w-full bg-blue-200 text-blue-900 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-300 rounded-md px-4 py-2 mb-4"
        />
        <span v-if="nameError" class="text-red-500">{{ nameError }}</span>
        <input
          type="number"
          v-model="editedData.liter"
          id="liter"
          placeholder="Liter"
          class="w-full bg-blue-200 text-blue-900 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-300 rounded-md px-4 py-2 mb-4"
        />
        <span v-if="literError" class="text-red-500">{{ literError }}</span>
        <input
          type="number"
          v-model="editedData.price"
          id="price"
          placeholder="Price"
          class="w-full bg-blue-200 text-blue-900 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-300 rounded-md px-4 py-2 mb-4"
        />
        <span v-if="priceError" class="text-red-500">{{ priceError }}</span>
        <button type="submit" class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400">
          {{ isEditing ? 'Update' : 'Submit' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch,computed } from 'vue';
import { useExpenseStore } from '../store/Expense';

const props = defineProps({
  selectedItem: Number
});

let name = ref('');
const liter = ref('');
const price = ref('');
const nameError = ref('');
const literError = ref('');
const priceError = ref('');
let editedData = ref({ name: '', liter: '', price: '' });
let isEditing = ref(false);

const expenseStore = useExpenseStore();

const expenses = computed(() => expenseStore.expenses);

watch(() => props.selectedItem, () => {
  const seletedExpense = expenses.value.find((res, index)=>{
    if(index == props.selectedItem){
      return res;
    }
  })
  if (seletedExpense) {
    isEditing.value = true;
    editedData.value = { ...seletedExpense };
  } else {
    isEditing.value = false;
    editedData.value = { name: '', liter: '', price: '' };
  }
});


const addOrUpdateExpense = () => {
  nameError.value = '';
  literError.value = '';
  priceError.value = '';

  if (editedData.value.name.trim() === '') {
    nameError.value = 'Customer Name is required';
  }
  if (editedData.value.liter === '') {
    literError.value = 'Liter is required';
  }
  if (editedData.value.price === '') {
    priceError.value = 'Price is required';
  }
  if (!nameError.value && !literError.value && !priceError.value) {
    if (isEditing.value) {
      expenseStore.updateExpense(props.selectedItem, {
        id: editedData.value.id,
        name: editedData.value.name,
        liter: editedData.value.liter,
        price: parseFloat(editedData.value.price),
      });
    } else {
      expenseStore.addExpense({
        name: editedData.value.name,
        liter: editedData.value.liter,
        price: parseFloat(editedData.value.price),
      });
    }
    editedData.value = { name: '', liter: '', price: '' };
    isEditing.value = false;
  }
};

</script>
