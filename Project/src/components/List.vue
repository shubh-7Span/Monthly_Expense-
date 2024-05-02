<template>
  <div class="items-center justify-center h-screen text-white bg-black">
    <h2 class="text-xl text-center font-bold mb-4">Milk Monthly Expenses</h2>
    <table class="w-full border-collapse">
      <thead>
        <tr class="text-black bg-white">
          <th class="p-2">Name</th>
          <th class="p-2">Liter</th>
          <th class="p-2">Price</th>
          <th class="p-2">Total Price</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="index" class="border-b text-center">
          <td class="p-2">{{ expense?.name || expense?.name }}</td>
          <td class="p-2">{{ expense?.liter }}</td>
          <td class="p-2">{{ expense?.price }}</td>
          <td class="p-2">{{ TotalPrice(expense) }}</td>
          <td class="p-2">
            <button @click="editExpense(index)" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Edit</button>
            <button @click="deleteExpense(index)" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-center bg-red-500 ">
          <td colspan="3" class="font-bold text-2xl ">Monthly TotalExpense :-</td>
          <td class="bg-red-500 text-2xl">₹{{ totalExpense }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';
import { useExpenseStore } from '../store/Expense.js';

const emits = defineEmits(['editdata']);

const expenseStore = useExpenseStore();

const expenses = computed(() => expenseStore.expenses);

const editExpense = (editIndex) => {
  emits('editdata', editIndex);
};

const deleteExpense = (index) => {
  expenseStore.deleteExpense(index);
};

const TotalPrice = (expense) => {
  return expense ? expense.liter * expense.price : '';
};

const totalExpense = computed(() => {
  return expenses.value.reduce((total, expense) => {
    return total + TotalPrice(expense);
  }, 0);
});
</script>
