export default class {

    #colors = [
        '#00D1B2',
        '#FF0062',
        '#00A4FF',
        '#A0E600',
        '#D30BFF',
        '#FF9C00',
        '#7A00FF',
        '#FF3900',
        '#00D7FF',
        '#FFE000',
    ]

    getNewColor(existingColors = []) {
        
        const availableColors = this.#colors.filter(color => !existingColors.includes(color));
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }

}