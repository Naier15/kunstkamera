import Dot, { Pos2D } from '../entities/dot'


export interface Link {
    id:         number
    position:   Pos2D
}

export default class Graph extends Map<number, Link[]> {
    public shownLinks: boolean

    constructor() {
        super()
        this.shownLinks = false
    }

    public async addLink(dot1: Dot, dot2: Dot) {
        if (!this.has(dot1.id)) { this.set(dot1.id, []) }
        if (!this.has(dot2.id)) { this.set(dot2.id, []) }
        this.get(dot1.id)?.push({id: dot2.id, position: {
            x: dot1.position.x - dot2.position.x,
            y: (dot1.position.y - dot2.position.y) * -1
        }})
        this.get(dot2.id)?.push({id: dot1.id, position: {
            x: dot2.position.x - dot1.position.x,
            y: (dot2.position.y - dot1.position.y) * -1
        }})
        if (this.shownLinks) {
            dot1.element.style.background = 'rgb(0, 79, 113)'
        }
    }

    public async updateLinkPositions(dotId: number, linkedDotId: number, position: Pos2D) {
        const link = this.get(dotId)?.find(link => link.id === linkedDotId) as Link
        link.position = position
    }


    public async removeLink(dot1: Dot, dot2: Dot) {
        const links1 = this.get(dot1.id)
        const links2 = this.get(dot2.id)
        if (!links1 || !links2) { return }
        const index1 = links1.findIndex(link => link.id === dot2.id)
        const index2 = links2.findIndex(link => link.id === dot1.id)
        if (index1 === -1 || index2 === -1) { return }
        links1.splice(index1, 1)
        links2.splice(index2, 1)
        if (this.shownLinks) {
            dot1.element.style.background = 'white'
        }
    }

    public async toggleLinks() {
        this.shownLinks = this.shownLinks ? false : true
        const id = Dot.activeDot?.id as number
        const links = Dot.graph.get(id) || []
        for (const link of links) {
            const linkedDot = Dot.dots.get(link.id)
            if (linkedDot) {
                linkedDot.element.style.background = this.shownLinks ? 
                    'rgb(0, 79, 113)' : 'white'
            }
        }
        return this.shownLinks
    }

    public async deleteLink(dot: Dot) {
        this.delete(dot.id)
        this.forEach((value: Link[], key: number, map: Map<number, Link[]>) => {
            map.set(key, value.filter(link => link.id !== dot.id))
        })
    }
}