"use strict";

module.exports = function solution(A) {

    let missing = 0;

    for(let x=0; x<A.length; x++){
        if(A.indexOf(A[x]-1)==-1){
            missing = A[x]-1;
            continue;
        }
        if(A.indexOf(A[x]+1)===-1){
            missing = A[x]+1;
            continue;
        }
        if(missing)
            break;
    }

    return missing;
};
