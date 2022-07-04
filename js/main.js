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

const validateCpf = (val) => {

    var lenght = document.getElementById(`${val}`).innerHTML.length;
    
    console.log(lenght)
    if (lenght < 15 && lenght > 13){
        return true;
    }else{
        return false;
        }
    }

const submitForm = (e) => {
    e.preventDefault();

    let data = {
        name: validate("#name"),
        cpf: validateCpf("cpf"),
        nascimento: validate( "#born-date" ),
        genero:  validate("input[name='gender']:checked"),
        email: validate( "#email" ),
        senha: validate( "#password" ),
        senhaConfirm: validatePassword( "#password-confirm" )
    }
    var tl = gsap.timeline;
    
    console.log(data.cpf)
    
    gsap.to('form', {y: 50, opacity: 0, duration: 1})
    gsap.to('.heading-custom', {y: 50, opacity: 0, duration: 1})
    gsap.to('form', {display: "none"})
    gsap.to('.heading-custom', {display: "none"})
    gsap.to('.congratulations', {display: 'block', opacity: 100, delay: 1},  )
    if( data.name && data.cpf.lenght < 19  ){
    }

    console.log(data)
};

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}
