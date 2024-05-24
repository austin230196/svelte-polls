import Dexie, {type Table} from "dexie";


export type Poll = {
    id: number;
    question: string;
    optionA: string;
    optionB: string;
    voteA: number;
    voteB: number;
    created_at: Date;
}


export class PollDatabase extends Dexie {
    public readonly polls!: Table<Poll>

    public constructor(dbName: string){
        super(dbName);
        this.version(1).stores({
            polls: '++id, question, optionA, optionB, voteA, voteB, created_at'
        })
    }
}



export const db = new PollDatabase("polls");