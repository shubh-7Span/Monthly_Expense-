
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
      this.persistToLocalStorage()

    },

 
    updateExpense(index, expense) {
      if (index >= 0) {
        this.expenses.splice(index, 1, expense);
        this.persistToLocalStorage();
      }
    },  
    
    
    deleteExpense(index) {
      this.expenses.splice(index,1);
      this.persistToLocalStorage()
    },
      
    persistToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.expenses));
    },
  },
});
