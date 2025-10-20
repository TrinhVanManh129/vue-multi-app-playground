<template>
  <section class="mx-auto w-full max-w-xl bg-white shadow-sm rounded-xl p-4">
    <!-- Add new -->
    <form class="flex gap-2" @submit.prevent="add">
      <input
        v-model.trim="draft"
        placeholder="Thêm việc cần làm rồi nhấn Enter"
        @keyup.enter="add"
        class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
    </form>
    <!-- Filters -->
    <div class="flex gap-2 mt-4">
      <button :class="btn(filter==='all')" @click="filter='all'">All</button>
      <button :class="btn(filter==='active')" @click="filter='active'">Active</button>
      <button :class="btn(filter==='completed')" @click="filter='completed'">Completed</button>
    </div>
    <!-- List -->
    <ul class="mt-3 divide-y">
      <li v-for="t in filtered" :key="t.id" class="flex items-center gap-2 py-2" :class="t.completed ? 'opacity-70' : ''">
        <input type="checkbox" v-model="t.completed" class="h-4 w-4" />
        <span v-if="editingId!==t.id" @dblclick="startEdit(t)" class="flex-1 select-none"
              :class="t.completed ? 'line-through text-gray-500' : ''">{{ t.title }}</span>
        <input v-else v-model.trim="editText" @keyup.enter="confirmEdit(t)" @keyup.esc="cancelEdit"
               @blur="confirmEdit(t)"
               class="flex-1 border rounded px-2 py-1" />
        <button class="ml-auto text-red-600 hover:text-red-700" @click="remove(t.id)">✕</button>
      </li>
    </ul>

    <!-- Footer -->
    <footer class="flex justify-between items-center pt-3 text-sm text-gray-600">
      <span>{{ remaining }} items left</span>
      <button @click="clearCompleted" :disabled="!hasCompleted" class="disabled:opacity-40">Clear completed</button>
    </footer>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue'
const todos = ref([
  { id: 1, title: 'Học Vue events', completed: false },
  { id: 2, title: 'Làm bài TodoList', completed: true }
])
const draft = ref('')
const filter = ref('all') // all | active | completed

const editingId = ref(null)
const editText = ref('')

const filtered = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})

const remaining = computed(() => todos.value.filter(t => !t.completed).length)
const hasCompleted = computed(() => todos.value.some(t => t.completed))

function add() {
  const title = draft.value
  if (!title) return
  todos.value.unshift({ id: Date.now(), title, completed: false })
  draft.value = ''
}

function remove(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearCompleted() {
  todos.value = todos.value.filter(t => !t.completed)
}

function startEdit(t) {
  editingId.value = t.id
  editText.value = t.title
}

function confirmEdit(t) {
  if (editingId.value !== t.id) return
  const txt = editText.value
  if (!txt) { remove(t.id); return cancelEdit() }
  t.title = txt
  cancelEdit()
}

function cancelEdit() {
  editingId.value = null
  editText.value = ''
}

function btn(active){
  return [
    'px-3 py-1 rounded border',
    active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'
  ]
}
</script>
