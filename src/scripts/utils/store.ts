import { DotState, DotStateOptions } from "../entities/dot"


export default class Store {
    constructor(
        private id:   number,
        private name: string
    ) { }

    public async load() {
        const data = localStorage.getItem(this.name)
        return (data ? JSON.parse(data) : {}) as DotState
    }
    
    public async save(data: DotStateOptions) {
        const state = await this.load()
        if (state) {
            data = { ...state, ...data } as DotState
        }
        data.id = this.id
        localStorage.setItem(this.name, JSON.stringify(data))
    }

    public static reset() {
        localStorage.clear()
    }
}