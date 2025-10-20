import { defineStore } from 'pinia'

export const useNotify = defineStore('notify', {
  state: () => ({ open: false, text: '', color: 'success', timeout: 3000 }),
  actions: {
    show(text: string, color = 'success', timeout = 3000) {
      this.text = text; this.color = color; this.timeout = timeout; this.open = true;
    }
  }
})