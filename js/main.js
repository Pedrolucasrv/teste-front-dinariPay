const setGender = (val) => {
    return `${val}`;
}



$(document).ready(function () { 

    var $cpf = $("#cpf");
    $cpf.mask('000.000.000-00', {reverse: false});

    $(' input').blur(function(){
        if(!$(this).val()){
            $(this).addClass("error");
        } else{
            $(this).removeClass("error");
            $(this).next().removeClass("d-block");
        }
    });

    $('#password-confirm').blur(function(){
        if($('#password').val() === $('#password-confirm').val()){
            $('#password-confirm').next().removeClass("d-block");
            $('#password-confirm').removeClass("error");
        } else{
            $('#password-confirm').next().addClass("d-block");
        }
    });

});

const resetForm = (e) => {
    e.preventDefault();
    document.querySelector("form").reset(); 
}

const submitForm = (e) => {
    e.preventDefault();



    

    let data = {
        name: validate("#name"),
        cpf: validate("#cpf"),
        nascimento: validate( "#born-date" ),
        genero:  validate("input[name='gender']:checked"),
        email: validate( "#email" ),
        senha: validate( "#password" ),
        senhaConfirm: validatePassword( "#password-confirm" )
    }

    
    
    var $nome = $( "#name" ).val();

    console.log(data)
};

const validate = (val) => {

    input = $(`${val}`).val()

    if(input){
        return input;
    }else{
        $(`${val}`).next().addClass('d-block')
        return null;
    }
}

const validatePassword = (val) => {

    password = $('#password').val();
    input = $(`${val}`).val();

    if (input){
        if(input === password){
            return true;
        }else{
            $(`${val}`).next().addClass('d-block');
            return false;
        }
    }else{
        $(`${val}`).next().addClass('d-block');
        return false;
    }

}