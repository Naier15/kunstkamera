export default class Notification {
    public static readonly ChangesOff : string = 'CHANGE MODE OFF'
    
    private element: HTMLElement
    private timers:  NodeJS.Timer[] = []

    constructor(elementName: string) {
        this.element = document.getElementById(elementName) as HTMLElement
        this.element.style.display = 'none'
    }

    public async display(text: string) {
        this.element.textContent = text
        await this.disappear()
    }

    private async disappear() {
        let opacity = 1
        const step = 0.01
        this.element.style.display = 'block'
        if (this.timers.length > 0) {
            this.timers.forEach(timer => clearInterval(timer))
        }

        const intervalId = setInterval(async () => {
            opacity -= step
            if (opacity <= 0) {
                clearInterval(intervalId)
                this.element.style.display = 'none'
            }
            this.element.style.opacity = `${opacity}`
        }, 10)
        this.timers.push(intervalId)
    }
}