class Gach{
    constructor(value, x, y){
        this.value = value;
        this.posX = x;
        this.posY = y;
    }
}

//main

function checkEnd(){
    var hasValue0 = random();
    if(hasValue0){
        return false;
    }
    for(var j = 0; j <= size - 2; j++){
        for(var i = size * j; i < size * (j + 1) - 1 ; i++){          
            if(list.at(i).value == list.at(i + 1).value || list.at(i).value == list.at(i + size).value){
                return false;
            }
        }
    }
    for(var i = size - 1; i < size * size - 1; i = i + size){
        if(list.at(i).value == list.at(i + size).value){
            return false;
        }
    }
    for(var i = size * (size - 1); i < size * size - 1; i++){
        if(list.at(i).value == list.at(i + 1).value){
            return false;
        }
    }
    return true;
}

function play(arrow){
    if(arrow == "u"){
        var check = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        var tmp;
        for(var i = size; i < size * size; i++){
            tmp = i;
            while(tmp >= size){
                tmp -= size;
                if(list.at(tmp).value == list.at(tmp + size).value && list.at(tmp).value != 0){
                    if(!check[tmp + size]){
                        list.at(tmp).value += list.at(tmp + size).value;
                        list.at(tmp + size).value = 0;
                        if(tmp < size) check[tmp + size] = true;
                        check[tmp] = true;
                    }
                }
                if(list.at(tmp).value == 0){
                    list.at(tmp).value += list.at(tmp + size).value;
                    list.at(tmp + size).value = 0;
                }
            }
        }       
        
    }
    else if(arrow == "d"){
        var check = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        var tmp;
        for(var i = size * (size - 1) - 1; i >= 0 ; i--){
            tmp = i;
            while(tmp < size * (size - 1)){
                tmp += size;
                if(list.at(tmp).value == list.at(tmp - size).value && list.at(tmp).value != 0){
                    if(!check[tmp - size]){
                        list.at(tmp).value += list.at(tmp - size).value;
                        list.at(tmp - size).value = 0;
                        if(tmp >= size * (size - 1)) check[tmp - size] = true;
                        check[tmp] = true;
                    }
                }
                if(list.at(tmp).value == 0){
                    list.at(tmp).value += list.at(tmp - size).value;
                    list.at(tmp - size).value = 0;
                }
            }
        }
        
    }
    else if(arrow == "l"){
        var check = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        var tmp;
        for(var j = 0; j <= size - 1; j++){
            for(var i = size * j + 1; i < size * (j + 1) ; i++){
                tmp = i;
                while(tmp > j * size){
                    tmp -= 1;
                    if(list.at(tmp).value == list.at(tmp + 1).value && list.at(tmp).value != 0){
                        if(!check[tmp + 1]){
                            list.at(tmp).value += list.at(tmp + 1).value;
                            list.at(tmp + 1).value = 0;
                            if(tmp == j * size) check[tmp + 1] = true; //bug
                            check[tmp] = true;
                        }
                    }
                    if(list.at(tmp).value == 0){
                        list.at(tmp).value += list.at(tmp + 1).value;
                        list.at(tmp + 1).value = 0;
                    }
                }
            }
        }                  
        
    }
    else if(arrow == "r"){
        var check = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        var tmp;
        for(var j = 0; j <= size - 1; j++){
            for(var i = size * (j + 1) - 2; i >= size * j ; i--){
                tmp = i;
                while(tmp < size * (j + 1) - 1){
                    tmp += 1;
                    if(list.at(tmp).value == list.at(tmp - 1).value && list.at(tmp).value != 0){
                        if(!check[tmp - 1]){
                            list.at(tmp).value += list.at(tmp - 1).value;
                            list.at(tmp - 1).value = 0;
                            if(tmp == size * (j + 1) - 1) check[tmp - 1] = true; //bug
                            check[tmp] = true;
                        }
                    }
                    if(list.at(tmp).value == 0){
                        list.at(tmp).value += list.at(tmp - 1).value;
                        list.at(tmp - 1).value = 0;
                    }
                }
            }
        }                  
        
    }
    endGame = checkEnd();
}

function random(){
    var count = 0, k = 0; 
    var arrPos = [];
    for(var i = 0; i < size * size; i++){
        if(list.at(i).value != 0){
            count++;
        }else{
            arrPos[k++] = i;
        }
    }
    if(count == size * size){
        return false;
    }
    var posRandom = arrPos[Math.floor(Math.random()*arrPos.length)];
    /*while(posRandom == -1){
        posRandom = Math.floor(Math.random()* 100) % (size * size);
        if(list.at(posRandom).value != 0) posRandom = -1;
    }*/
    var twoOrFour = Math.floor(Math.random()* 10) % 2;
    list.at(posRandom).value = (twoOrFour == 1? 4 : 2);
    if(k == 1) return false;
    return true;
}

function print(){
    var out = "";
    var k = 0;
    for(var i = 1; i <= size; i++){
        for(var j = 1; j <= size; j++){
            out += "  " + list.at(k++).value;
        }
        out += '\n';
    }
    console.log(out);
}

function toString(){
    var str = "";
    for(var i = 0; i < size * size; i++){
        switch(list.at(i).value){
            case 0: str += " ";break;
            case 2: str += "A";break;
            case 4: str += "B";break;
            case 8: str += "C";break;
            case 16: str += "D";break;
            case 32: str += "E";break;
            case 64: str += "F";break;
            case 128: str += "G";break;
            case 256: str += "H";break;
            case 512: str += "I";break;
            case 1024: str += "J";break;
            case 2048: str += "K";break;
        }
    }
    return str;
}
function toGane(str){
    for(var i = 0; i < size * size; i++){
        switch(str.charAt(i)){
            case " ": list.at(i).value = 0;break;
            case "A": list.at(i).value = 2;break;
            case "B": list.at(i).value = 4;break;
            case "C": list.at(i).value = 8;break;
            case "D": list.at(i).value = 16;break;
            case "E": list.at(i).value = 32;break;
            case "F": list.at(i).value = 64;break;
            case "G": list.at(i).value = 128;break;
            case "H": list.at(i).value = 256;break;
            case "I": list.at(i).value = 512;break;
            case "J": list.at(i).value = 1024;break;
            case "K": list.at(i).value = 2048;break;
        }
    }
}