

$(document).ready(function () { 

    var cpfInput = $("#cpf");
    cpfInput.mask('000.000.000-00', {reverse: false});

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

    $('#password').blur(function(){
        if($('#password').val() === $('#password-confirm').val()){
            $('#password-confirm').next().removeClass("d-block");
            $('#password-confirm').removeClass("error");
        } else{
            $('#password-confirm').next().addClass("d-block");
        }
    });

});

//limpa o formulário

const resetForm = (e) => {
    e.preventDefault();
    document.querySelector("form").reset(); 
}

// validaçao generica (verifica se o campo é vazio ou nao)

const validate = (val) => {

    input = $(`${val}`).val()

    if(input){
        return input;
    }else{
        $(`${val}`).next().addClass('d-block')
        return null;
    }
}


// validaçao nome
const validateName = () => {

    input = $(`#name`).val()


    var expressao = /^[A-Za-z\s]+$/;
    if(!expressao.test(input)){
        $(".name-error").addClass("d-block");
        return false
    }else{
        $(".name-error").removeClass("d-block");
        return true
    }
   
}

// validaçao data

const validateDate = () => {

    input = $(`#born-date`).val()

    data = new Array
    data = input.split('-');

    var diaSelecionado = data[2]
    var mesSelecionado = data[1]
    var anoSelecionado = data[0]



    var now = new Date;
    var day =  now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    d1 = `${anoSelecionado}-${mesSelecionado}-${diaSelecionado}`
    d2 = `${year}-${month}-${day}`

    if(anoSelecionado && mesSelecionado && diaSelecionado){
        return dateCompare(d1, d2);
    }else{
        $(".date-error").addClass("d-block");
         return false
        }

    console.log(d1)
    console.log(d2)
    
    

}

function dateCompare(d1, d2){
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    if(date1.getTime() > date2.getTime()){
        $(".date-error").addClass("d-block");
        return false;
    } else if(date1.getTime() < date2.getTime()){
        $(".date-error").removeClass("d-block");
        return true;
    } else{
        $(".date-error").removeClass("d-block");
        return true;
    }
}

//valida genero

const validateGender = () => {
    input = $("input[name='gender']:checked").val();
    if (input) {
        $(".gender-error").removeClass("d-block");
        return input
    }else{
        $(".gender-error").addClass("d-block");
        return input
    }
}

//validaçao do email

const isEmail = () => {
    email = $("#email").val()
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)){
        $(".email-error").removeClass("d-block")
        return regex.test(email);
    }else{
        $(".email-error").addClass("d-block")
        return regex.test(email);
    }
  }


//validaçao das senhas

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


//checagem do cpf
const validateCpfInput = () => {
    e = $("#cpf").val()
    cpf = e.replace(",","");
    if (validateCpf(cpf)){
        $(".cpf-error").removeClass("d-block");
        return true;
    }else{
        $(".cpf-error").addClass("d-block");
        return false
    }
}

const validateCpf = (cpf) => {
    
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

//confirmar

const submitForm = (e) => {
    e.preventDefault();

    let isValid = {
        name: validateName("#name"),
        cpf: validateCpfInput(),
        nascimento: validateDate(),
        genero:  validateGender(),
        email: isEmail( $("#email").val() ),
        senha: validate( "#password" ),
        senhaConfirm: validatePassword( "#password-confirm" )
    }
    
    console.log(isValid.nascimento)

    if( isValid.name && isValid.cpf && isValid.email && isValid.genero && isValid.nascimento && isValid.senha && isValid.senhaConfirm ){
        gsap.to('form', {y: 50, opacity: 0, duration: 1})
        gsap.to('.heading-custom', {y: 50, opacity: 0, duration: 1})
        gsap.to('form', {display: "none"})
        gsap.to('.heading-custom', {display: "none"})
        gsap.to('.congratulations', {display: 'block', opacity: 100, delay: 1},  )
    }

};