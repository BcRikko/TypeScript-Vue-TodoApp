/// <reference path="./typings/vue/vue.d.ts" />

import Vue = require('vue');

interface ITask {
    body: string
    done: boolean
}

class TodoApp extends Vue{
    // タスク一覧
    tasks: ITask[];
    // 新規タスク
    newTaskBody = '';
    
    constructor() {
        // to defer compilation in Vue
        super(false);
        
        this._init({
            el: '#todoapp',
            data: {
                tasks: this.tasks,
                newTaskBody: this.newTaskBody
            },
            computed: {
                getDoneCount: this.getDoneCount
            },
            created: () => {
                this.tasks = [
                    { body: 'do this 1', done: false },
                    { body: 'do this 2', done: false },
                    { body: 'do this 3', done: false },
                    { body: 'do this 4', done: false }
                ];
            },
            methods: {
                addNew: this.addNew,
                deleteTask: this.deleteTask,
                deleteDone: this.deleteDone
            }
        });
    }
    
    /**
     * タスクの追加
     */
    addNew(): void{
        var task = this.newTaskBody && this.newTaskBody.trim();
        if (!task) {
            return;
        }
        this.tasks.push({ body: task, done: false });
        this.newTaskBody = '';
    }
    
    /**
     * タスクの削除
     * @param index :削除する行番号
     */
    deleteTask(delIndex: number): void{
        this.tasks.splice(delIndex, 1);
    }
    
    /**
     * 済タスクの一括削除
     */
    deleteDone(): void{
        var oldTasks = this.tasks;
        this.tasks = [];
        
        oldTasks.forEach(task => {
            if (!task.done) this.tasks.push(task);
        });
    }
    
    /**
     * 完了済み件数の取得
     * @return 完了済み件数
     */
    getDoneCount(): number{
        var count = 0;
        this.tasks.forEach(task => {
            count += task.done ? 1 : 0;
        });
        
        return count;
    }
}

export var todoApp = new TodoApp();