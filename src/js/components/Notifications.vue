<script setup>
    import { inject } from 'vue';
    const notifications = inject('notifications');
</script>

<template>
    <div class="section">
        <div
            v-for="notification in notifications.getAll()"
            :key="notification.id"
            class="notification"
            :class="{ 'is-primary': notification.type === 'info', 'is-danger': notification.type === 'error' }"
        >
            {{ notification.message }}
            <button
                class="delete"
                @click="() => notifications.delete(notification)"
            />
        </div>
    </div>
</template>