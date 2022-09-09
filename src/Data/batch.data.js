export class BatchOverallData{
    constructor(id, title, startingYear, endingYear){
        this.id = id;
        this.title = title;
        this.startingYear = startingYear;
        this.endingYear = endingYear;
        this.session = `${startingYear}-${endingYear}`;
    }
}
