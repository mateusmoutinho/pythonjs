
const fs = require('fs')

function replace_all_strings(string,string_to_be_removed,string_to_replace){
         while(true){
             string = string.replace(string_to_be_removed,string_to_replace)
             index = string.indexOf(string_to_be_removed)
             if(index == -1){
                 break
             }
         }
         return string
}

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
         string = replace_all_strings(string,x.value,x.tag)
    })
    return string
}

function replace_tags_for_double_finds(taged_obj,string){

    taged_obj.map(function(x){
        string = replace_all_strings(string,x.tag,x.value)
   })
   return string
}

function get_a_double_find_and_tag_then(string,first,end){
       double_find = get_all_double_find(string,first,end)
       taged = tag_all_double_find(double_find)
       return taged
}

//----------------------------- puts indent on in bracelets--------------------------------------------------


function puts_bracelets_on_end_scope(string){

    function get_distance(string){
        for(i = 0; i < string.length; i++){
            if(string[i] != " "){
                return i
            }
        }
        return 0
    }
    
    function make_dinstance(x){
        string = ""
        for(i =0; i < x; i++){
            string = string + " " 
        }
        return string
    }
    strings  = string.split('\n')
    distance = strings.map(get_distance)
    
    for(let i = 0; i < distance.length; i++){
        if(distance[i] < distance[i -1]){
           strings[i] = make_dinstance(distance[i]) + "}\n" + strings[i]
        }
    }
    new_strings = strings.map(x => x + "\n")
     return  new_strings.join(" ")
 

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
      
      });
}

function get_file_name_without_dot(file_name){
    dot = file_name.indexOf(".")
   file = file_name.substr(0,dot)
   return file
}

function create_a_valid_file(file_name,string){
    without_dot = get_file_name_without_dot(file_name)
    extension = ".js"
    exist = open_file(without_dot + extension)

    if(exist == false){
        write_file(without_dot + extension,string)
        return 
    }
    let number = 0
    
    while(true){
        exist = open_file(without_dot + number.toString() + extension)
       
        if(exist == false){
            write_file(without_dot +  number.toString() + extension,string)
            return 
        }

        ++number

    }
    
   
}
//-------------------------------main code--------------------------------------

function main(){

file_name = process.argv[2]
output    = process.argv[3]
input     = "const input = require('prompt-sync')()\n"
opened_file = open_file(file_name)
end_string = opened_file

if(file_name == undefined){
    console.log("no file for transpile")
    return
}
else if(opened_file == false){
   console.log("cound't open the", file_name, "file")
   return
}

hash = get_a_double_find_and_tag_then(end_string,"{","}")
list = get_a_double_find_and_tag_then(end_string,"[","]")


end_string = replace_double_finds_for_tags(hash,end_string)
end_string = replace_double_finds_for_tags(list,end_string)


end_string = replace_all_strings(end_string,"def","function")
end_string = replace_all_strings(end_string,"#","//")
end_string = replace_all_strings(end_string,"):","){")
end_string = replace_all_strings(end_string,":","){")
end_string = replace_all_strings(end_string,"print(","console.log(")
end_string = replace_all_strings(end_string,"if","#se#")
end_string = replace_all_strings(end_string,"#se#","if(")



end_string = replace_tags_for_double_finds(hash,end_string)
end_string= replace_tags_for_double_finds(list,end_string)

end_string = input + end_string


end_string = puts_bracelets_on_end_scope(end_string)
if(output != undefined){
    write_file(output,end_string)
}
else{
   create_a_valid_file(file_name,end_string)
}
}


main()


