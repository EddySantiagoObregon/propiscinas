/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function(){
    listarVenta();
    tipoDocumento();
    $("#btnBuscar").click(function(){
       
        var fecha = $("#fecha").val();
        var buscar = $("#txt_Buscar").val();
        var idTipoDocumento = $("#cb_TipoDocumento").val();
        if(fecha!==''&&buscar!==''&&idTipoDocumento>'0'){
            BuscarPorProductoYTipoDocumentoYFecha();
          
        }
        else if(fecha!==''&&buscar===''&&idTipoDocumento<'1'){
          
            buscarInventarioVentaPorFecha();
        }
        else if(fecha===''&&buscar!==''&&idTipoDocumento<'1'){
            
            buscarVenta();
        }
        else if(fecha!==""&&buscar!==''&&idTipoDocumento<'1'){
            
            buscarInventarioVentaPorProductoYFecha();
        }else if(fecha===""&&buscar===""&&idTipoDocumento>'0'){
          
            BuscarPorTipoDocumento();
        }
        else if (fecha!==""&&buscar===""&&idTipoDocumento>'0'){
            
            BuscarPorTipoDocumentoYFecha();
        }
       else if(fecha===''&&buscar!==''&&idTipoDocumento>'1'){
           
            BuscarPorProductoYTipoDocumento();
        }
    });
    $("#btnListar").click(function(){
        $("tbody tr").remove();
        $("#txt_Buscar").val(null);
        $("#cb_TipoDocumento").val(0);
        $("#fecha").val(null);
        listarVenta(); 
    });
});

function listarVenta(){
     var parametros = {
               accion: "listarInventarioVenta"
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
      success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}

function buscarVenta(){
    $("tbody tr").remove();
     var txtBuscar =$("#txt_Buscar").val().trim();
    var buscar=txtBuscar.substring(0,13);
    
     var parametros = {
               accion: "buscarIventarioVenata",
               buscar:buscar
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
    success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}
function buscarInventarioVentaPorFecha(){
    $("tbody tr").remove();
     var parametros = {
               accion: "buscarInventarioVentaPorFecha",
               fecha: $("#fecha").val()
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
        success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}

function buscarInventarioVentaPorProductoYFecha(){
    $("tbody tr").remove();
      var txtBuscar =$("#txt_Buscar").val().trim();
    var buscar=txtBuscar.substring(0,13);
    
     var parametros = {
               accion: "buscarInventarioVentaPorProductoYFecha",
               fecha: $("#fecha").val(),
                 buscar:buscar
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
         success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}
function BuscarPorTipoDocumento(){
    $("tbody tr").remove();
     var parametros = {
               accion: "BuscarPorTipoDocumento",
               TipoDocumento: $("#cb_TipoDocumento").val()
               
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
        success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}
function BuscarPorTipoDocumentoYFecha(){
    $("tbody tr").remove();
     var parametros = {
               accion: "BuscarPorTipoDocumentoYFecha",
               TipoDocumento: $("#cb_TipoDocumento").val(),
               fecha:$("#fecha").val()
               
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
         success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}
function BuscarPorProductoYTipoDocumentoYFecha(){
    $("tbody tr").remove();
     var txtBuscar =$("#txt_Buscar").val().trim();
    var buscar=txtBuscar.substring(0,13);
    
     var parametros = {
               accion: "BuscarPorProductoYTipoDocumentoYFecha",
               TipoDocumento: $("#cb_TipoDocumento").val(),
               fecha:$("#fecha").val(),
               buscar:buscar
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
        success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}
function tipoDocumento()
{
    var parametros={
        accion:"listarTipoDocumento"
    };
    $.ajax({
        url: '../ControllerVenta',
        data:parametros,
        type: 'post',
        dataType: 'json',
        cache: false,
        success: function(resultado){
            console.log(resultado);
            var TipoDocumentos= resultado;
            $.each(TipoDocumentos, function(i, TipoDocumento){
                $('#cb_TipoDocumento').append(
                        $('<option>',{
                            
                            value: TipoDocumento.idTipoDocumento,
                            text: TipoDocumento.descripcion
                        })
                      );
             });
        },
        error: function(ex)
        {
            console.log(ex.responseText);
        }
    });
     
}
function BuscarPorProductoYTipoDocumento(){
   $("tbody tr").remove();
     var txtBuscar =$("#txt_Buscar").val().trim();
    var buscar=txtBuscar.substring(0,13);
    
     var parametros = {
               accion: "BuscarPorProductoYTipoDocumento",
               TipoDocumento: $("#cb_TipoDocumento").val(),
                buscar:buscar
              
    };    
    $.ajax({          
        url: '../ControllerInventarioVenta',         
        data:parametros,
        dataType:'json',
        type: 'post',        
        cache: false,
         success: function (resultado) {
        console.log(resultado);
            
            inventarioventas=resultado;          
            var cantidad;
            cantidad= inventarioventas.length;
              var pag = 1;
            var totales = inventarioventas.length;
            var xPag = 15;
            var nPag = Math.ceil(totales / xPag);
            var offset = (pag - 1) * xPag;
            var hasta = pag * xPag;
$("#botones button").remove();
 

    function mostrarLista(desde,hasta){     
        $("tbody tr").remove();
      for(var i = desde; i < hasta; i++){
 var body =document.getElementsByTagName("tbody")[0];
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
 
    for (var j = 0; j < 11; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j===0){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.idProducto);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  var cantidadU =inventarioventas[i].unDetalleProducto.cantidadUnidad;
 
  var forma=inventarioventas[i].unDetalleProducto.unaForma.descripcion;
  if(forma==="SOLO"){
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }
  }else{
       if(j===1){
      var textoCelda = document.createTextNode(inventarioventas[i].unDetalleProducto.unaForma.descripcion+" DE "+inventarioventas[i].unDetalleProducto.nombre+" "+inventarioventas[i].unDetalleProducto.cantidadUnidad+" "+inventarioventas[i].unaUnidadMedida.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  }

  }

  if(j===2){
     var textoCelda = document.createTextNode(inventarioventas[i].fecharegistro);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
  if(j===3){
     var textoCelda = document.createTextNode(inventarioventas[i].cantidadTotal);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
  }
 if(j===4){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.unTipoDocumento.descripcion);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }    
if(j===5){
     var textoCelda = document.createTextNode(inventarioventas[i].unDocumento.numerodocumento);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }  
if(j===6){
     var textoCelda = document.createTextNode(inventarioventas[i].estado);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     

if(j===7){
     var textoCelda = document.createTextNode(inventarioventas[i].unUsuario.nombre);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
  
                        }     



 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
  
    body.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  
  // appends <table> into <body>
 
  // modifica el atributo "border" de la tabla y lo fija a "2";
 



        }
    }
          function mostrarBotones(t){
                var botones = '';
                for(var i = 0; i < t; i++){
                    var cada = '';
                    cada = "<button id='btnPagination' type='button' "+
                        "class='btn btn-info'>"+(i+1)+
                        "</button>";
                    botones += cada;
                }
                
                $('#botones').append(botones);
            }
            
            function quitarActivo(){
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    $(losBotones[i]).removeClass('active');
                }
            }
            
            mostrarLista(offset,hasta);
            mostrarBotones(nPag);
            
          $( document ).ready(function(){
                // Activar el primer botón
                $('#botones button:first-child').addClass('active');
                
                // Poner oyentes a cada botón
                var losBotones = document.querySelectorAll('#botones button');
                for(var i = 0; i < losBotones.length; i++){
                    losBotones[i].addEventListener('click',function(){
                        quitarActivo();
                        var indice = parseInt(this.textContent);
                        var o = (indice -1) * xPag;
                        var h = indice * xPag;
                        mostrarLista(o,h);
                        $(this).addClass('active');
                    });
                }
            });
    }
     
        
    });
   
}