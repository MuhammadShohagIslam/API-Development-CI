import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
   statusCode = 404;

    constructor(message:string){
        super(message);
        this.message = message
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeError(){
        return [
            {
                message:this.message,
                statusCode:this.statusCode
            }
        ]
    }
}