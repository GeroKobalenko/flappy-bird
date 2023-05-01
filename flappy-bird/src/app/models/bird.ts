export class Bird {
    height!: number;
    width!: number;
    top!: number;

    constructor(parameters: any = null){
        if (parameters) {
            this.height = parameters.height;
            this.width = parameters.width;
            this.top = parameters.top;
        }
    }

    public saltar(){
        if (this.top < this.height) this.top = 0;
        else this.top -= 60;
    }

    public caer(){
        let gravedad = 4.5;
        this.top += gravedad;
    }
}