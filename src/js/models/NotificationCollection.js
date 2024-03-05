import { ref } from 'vue';
import Notification from './Notification'

class NotificationCollection {

    #notifications = ref([]);

    /**
     * Add notification from strings (instead of Notification object) in order to simplify the
     * usage from wherever we call this method.
     */
    add(message, type) {
        console.log('Add notification', message, type);
        this.#notifications.value.push(new Notification(message, type));
    }

    delete(notificationToRemove) {
        this.#notifications.value = this.#notifications.value
            .filter((notification) => notification !== notificationToRemove);
    }

    getAll() {
        return this.#notifications.value;
    }

};

/**
 * Make NotificationCollection available as a Vue plugin
 */
export default {
    install: (app) => {
        app.provide('notifications', new NotificationCollection());
    }
};