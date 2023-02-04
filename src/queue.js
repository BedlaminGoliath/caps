class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.front = null;
        this.back = null;
    }

    enqueue(delivery){
        let newNode = new Node(delivery)
        if(this.back === null){
            this.back = newNode;
            this.front = newNode;
        } else {
            this.back.next = newNode
            this.back = newNode;
        }
    }
    dequeue(){
        if(this.front === null){
            throw new Error("nothing in queue");
        }
        let removedNode = this.front;
        this.front = removedNode.next;
        this.head = this.front;
        if(this.front === null){
            this.back === null;
        }
        return removedNode.value;
    }

    toString(){
        let str = ""
        let current = this.front;
        while(current!= null){
            str += `{ ${current.value} }=>`;

            current = current.next;
        }
        str+="NULL";
        return str;
    }
}

module.exports= Queue;