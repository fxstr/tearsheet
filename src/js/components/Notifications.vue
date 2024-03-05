<script setup>
    import { inject } from 'vue';
    const notifications = inject('notifications');
</script>

<template>
    <div class="section">
        <div class="notification" :class="{ 'is-primary': notification.type === 'info', 'is-danger': notification.type === 'error' }" v-for="notification in notifications.getAll()">
            {{ notification.message }}
            <button class="delete" @click="() => notifications.delete(notification)"></button>
        </div>
    </div>
</template>