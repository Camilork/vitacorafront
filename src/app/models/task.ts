export class Task{
    constructor(_id = null){
        this._id = _id;
        this.idTasks ='';
        this.task ='';
        this.status ='';
    }
    _id	: string;
    idTasks : string;
    task : string;
    status : string;
}
