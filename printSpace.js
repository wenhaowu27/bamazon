var x = 0;
var y = 0;

console.log(space(2,7) + " | " + space(12,36) + " | " + space(13,15) + " | " + space(15,17) + " | "  + space(5,7) + " | " + space(14,16));

function space(x, y){
   var whitespace = " "
   var return_space = ""
    var new_length = y-x;
    for (let i = 0; i < new_length; i++){
       return_space += whitespace
    }
    return return_space

}