<template>
  <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker
    :date-format-options="{ year: 'numeric', day: '2-digit', month: 'long', weekday: 'long' }" 
    id="example-datepicker" 
    v-model="value" 
    class="mb-2"
    @context="selectCalender"
    ></b-form-datepicker>
    <p>Value: '{{ value }}'</p>
    <p>Context: {{ selectedCalendar }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        selectedCalendar: null
      }
    },
    methods: {
      selectCalender(ctx) {
        this.selectedCalendar = ctx.selectedFormatted
      }
    }
  }
</script>