
const fs = require('fs')

//-------------------- removing unhandling text_parts ----------------------------

function get_all_double_find(string,first,end){
        first_found = false 
        index = 0
        strings_list = []

    for(let i = 0; i < string.length; i++){

        if(first_found == false && string[i] == first){
             first_found = true
             index = i 
        }

        if(first_found == true && string[i] == end){
            strings_list.push(string.slice(index,i + 1))
            first_found = false
        }
    
    }
    return strings_list
}

function get_a_randon_number_tag_that_is_not_on_string(string){

     while(true){
          number =  Math.floor(Math.random() * 100000)
          converted_number = number.toString()
          exist = string.indexOf(converted_number)
          if(exist == -1){
              break;
          }
     }
     return converted_number
}

function tag_all_double_find(double_find){
    valor = double_find.map(function(x){
        number = get_a_randon_number_tag_that_is_not_on_string(x)
       obj = {
             tag: number,
             value: x
        }
        return obj
      
    })
    return valor
}

function replace_double_finds_for_tags(taged_obj,string){

    taged_obj.map(function(x){
         string = string.replace(x.value,x.tag)
    })
    return string
}

function replace_tags_for_double_finds(taged_obj,string){

    taged_obj.map(function(x){
        string = string.replace(x.tag,x.value)
   })
   return string
}

//----------------------------- puts indent on in bracelets--------------------------------------------------
function make_bracklets(total){
    string = ""
    for(i = 0; i < total; i++){
        string = string + "}\n"
        
    }
    return string
}

function puts_bracelets_on_end_scope(string){
     elements = []
     total_chars = 0
     end_line_found = true
    for(let i = 0; i < string.length; i++){

        if(string[i] == ' ' && end_line_found == true){
           ++total_chars
        }
        if(string[i] != ' ' && end_line_found == true){
            end_line_found = false
            elements.push({
                size: total_chars,
                point: i 
             })
            total_chars = 0
          
         }
         if(string[i] == '\n'){
             end_line_found = true
         }
        
    }
    
    total_bracelets = 0
    open_scope = false
    
    for(let i = 0; i < elements.length; i++){
        if(elements[i].size > 0){
           open_scope = true
           ++total_bracelets
        }
        if(elements[i].size == 0 && open_scope == true){
            open_scope = false
                  string = string.substr(0,elements[i].point)
                  + make_bracklets(total_bracelets) 
                  + string.substr(elements[i].point, string.length)
                  
                  elements = elements.map(function(x){
                      x.point = x.point + total_bracelets * 2
                      return x
                  })
                 
            total_bracelets = 0
        }
    }
  
    return string

    
}

//------------------------------file dealing ------------------------------------

function open_file(file_name){
    let file = null

try{
    file  = fs.readFileSync(file_name,"utf8")
    }
    catch(e){
        return false 
    }

    return file
}

function write_file(file_name,content){
    fs.writeFile(file_name, content, function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      });
}

function get_file_name_without_dot(file_name){
    dot = file_name.indexOf(".")
   file = file_name.substr(0,dot)
   return file
}
//-------------------------------main code--------------------------------------

function main(){

file_name = process.argv[2]
output    = process.argv[3]

open_file = open_file(file_name)




if(file_name == undefined){
    console.log("no file for transpile")
    return
}
else if(open_file == false){
   console.log("cound't open the", file_name, "file")
   return
}

console.log(output)

//console.log(file)




}

write_file("teste","eai caralho")
//main()

