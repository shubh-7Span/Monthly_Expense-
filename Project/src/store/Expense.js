
import { defineStore } from 'pinia';

const localStorageKey = 'expenses';

export const useExpenseStore = defineStore({
  id: 'expenses',
  state: () => ({
    expenses: JSON.parse(localStorage.getItem(localStorageKey)) || [],
    editlist: {} 
  }),
  getters:{
    editExpense: (state) => (index) => state.expenses[index],
  }, 
  actions: {
    addExpense(expense) {
      this.expenses.push(expense);

    },

 
    updateExpense(index, expense) {
      if (index >= 0) {
        this.expenses.splice(index, 1, expense);
      }
    },  
    
    
    deleteExpense(index) {
      this.expenses.splice(index,1);
   
    },
      
   
  },
  persist: true,
});
