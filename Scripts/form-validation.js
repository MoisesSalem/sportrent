document.getElementById("contact-form").addEventListener("submit", function(event)
{
   //Obtención de los campos 
   var firstName = document.getElementById("inputName").value;
   var lastName = document.getElementById("inputLastName").value;
   var adress = document.getElementById("inputAdress").value;
   var email = document.getElementById("inputEmail").value;
   var phoneNumber = document.getElementById("inputPhoneNumber").value;
   var request = document.getElementById("inputRequest").value;
   //Creación de cadena que solo permite letras, acentos y espacios (no números), la cuál se usará para validar el nombre y el apellido.
   var namePattern = /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/;
   //Creación de cadena que permite los componentes básicos de una dirección de correo, así como también un dominio de al menos dos letras.
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   //Creación de cadena que solo posee dígitos y guiones, con una longitud mínima de 9 y máxima de 15.
   var phonePattern = /^[0-9-]{9,15}$/;

   //Validación del nombre
   if(firstName === ""){
    alert("Por favor ingrese su nombre.");
    event.preventDefault();
   }else{
    if(!namePattern.test(firstName)){
        alert("No se permiten números ni caracteres especiales en el nombre.");
        event.preventDefault();
    }
   }
   //Validación del apellido
   if(lastName === ""){
    alert("Por favor ingrese su apellido.");
    event.preventDefault();
   }else{
    if(!namePattern.test(lastName)){
        alert("No se permiten números ni caracteres especiales en el apellido.");
        event.preventDefault();
    }
   }
   //Validación de la dirección
   if(adress === ""){
    alert("Por favor ingrese una dirección.")
    event.preventDefault();
   }
   //Validación del email
   if(email === ""){
    alert("Por favor ingrese una dirección de correo.")
    event.preventDefault();
   }else{
    if(!emailPattern.test(email)){
        alert("Por favor ingrese una dirección de correo válida.")
        event.preventDefault();
       }
   }
   //Validación del teléfono
   if(phoneNumber === ""){
    alert("Por favor ingrese un número de teléfono.")
    event.preventDefault();
   }else{
    if(!phonePattern.test(phoneNumber)){
        alert("Por favor ingrese un número de teléfono válido.")
        event.preventDefault();
       }
   }
   //Validación del mensaje
   if(request === ""){
    alert("Por favor, ingrese un mensaje.")
    event.preventDefault();
   }

});


