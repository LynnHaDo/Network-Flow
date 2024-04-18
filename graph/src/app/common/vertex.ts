export class Vertex {
    id!: number;
    x!: number;
    y!: number;
    name!: number;    

    constructor(id: number, x: number, y: number, name: number){
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
    }

    printVertex(){
        return "Vertex " + this.id;
    }

}
