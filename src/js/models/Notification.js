import createId from '../helpers/createId';

export default class {

    constructor(message, type = 'info') {
        if (!['info', 'error'].includes(type)) {
            throw new Error(`Invalid notification type: ${type}.`);
        }
        if (!message) {
            throw new Error(`Notification message is required, you passed ${JSON.stringify(message)} instead.`);
        }
        this.message = message;
        this.type = type;
        this.id = createId();
    }
};
