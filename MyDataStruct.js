class Node{
    constructor(value){
        this.value = value;
        this.nextNode = null;       
    }  
}

export default class MyLinkedList{
    constructor(){
        this.length = 0;
        this.head = null;
        this.end = null;
    }
    
    insert(value, pos){
        var newNode = new Node(value),
            currentNode = this.head,
            count = 0,
            message = {failure: 'Failure: non-existent node in this list.'};

        if(pos < 0 || pos > this.length){
            throw new Error (message.failure);
        }
        if(pos == 0){
            if(!currentNode){
                this.head = newNode;
                this.length++;
                return newNode;
            }else{
                var headOld = this.head;
                this.head = newNode;
                this.head.nextNode = headOld;
                this.length++;
                return newNode;
            }
        }
        while(count < pos - 1){
            currentNode = currentNode.nextNode;
            count++;
        }
        var nodePos = currentNode.nextNode;
        currentNode.nextNode = newNode;
        newNode.nextNode = nodePos; 
        this.length++;
        return newNode;    
    }

    addLast(value){
        var newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.end = newNode;
            this.length++;
            return newNode;
        }
        this.end.nextNode = newNode;
        this.end = newNode;
        this.length++;
        return newNode;
    }
  
    at(pos){               
        var currentNode = this.head,
            message = {failure: 'Failure: non-existent node in this list.'};

        if(pos < 0 || pos >= this.length){
            throw new Error (message.failure);
        }
        while(pos--){
            currentNode = currentNode.nextNode;
        }
        return currentNode.value;
    }

    delete(pos){      
        var currentNode = this.head,
            count = 0;
        if(pos == 0){
            if(this.length == 1){
                this.head = null;
                this.end = null;
                this.length = 0;
                return currentNode;
            }
            var headOld = this.head,
                after1 = headOld.nextNode,
                after2 = after1.nextNode;
            
            headOld.nextNode = null;
            this.head = after1;
            this.head.nextNode = after2;
            this.length--;
            return headOld;
        }
        while(count < pos - 1){
            currentNode = currentNode.nextNode;
            count++;
        }
        var before = currentNode;
        currentNode = currentNode.nextNode;      
        var after = currentNode.nextNode;
        if(pos == this.length - 1){
            this.end = before;
            before.nextNode = null;
            this.length--;
            return currentNode;
        }
        currentNode.nextNode = null;
        before.nextNode = after;
        this.length--;        
        return currentNode;
    }
}

export default class MyStack{
    constructor(){
        this.storage = new MyLinkedList();
        this.size = 0;
    }
    isEmpty(){
        if(this.size == 0)
            return true;
        return false;
    }
    push(value){
        this.storage.addLast(value);
        this.size++;
    }
    top(){
        if(this.size == 0)
            return null;
        //return this.storage.at(this.size - 1);
        return this.storage.end.value;
    }
    pop(){
        if(this.size == 0){
            return false;
        }
        this.storage.delete(this.size - 1);
        this.size--;
        return true;
    }
}
