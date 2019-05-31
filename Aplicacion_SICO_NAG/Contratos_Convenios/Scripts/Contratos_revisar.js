﻿var tabla;
var btn;
var etiqueta;
var estado;

var index = [];
var fechas = [];
var nombres = [];

var conver = {};
var meses = {};
var Diahoy = {};
var local;

$(document).ready(function () {
    $('.tooltipped').tooltip();
    $('select').material_select();
    $('.modal').modal();
   

    consultar(function () { });  

    $(function () {
        // Toast Notification
        setTimeout(function () {
            Materialize.toast('<span>Contrato a vencer</span><a class="btn-flat blue-text revisar">Revisar<a>');
        });

    })

    //FUNCION DE LLENAR DATATABLE
    function consultar(callback) {
        $.ajax({
            type: "POST",
            url: "/Views/AsignacionContratos.aspx/seleccionar",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                tabla = $("#datatable1").DataTable({
                    "scrollX": true,
                    "order": [[0, 'desc']],
                    "language": {
                        "lengthMenu": "",
                        "zeroRecords": "No se encontraron resultados en su busqueda",
                        "info": "Registros de _START_ al _END_ de un total de _TOTAL_ ",
                        "InforEmpty": "No existen Registros",
                        "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                        "search": "Buscar",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    },

                    retrieve: true,

                    data: response.d,

                    columns: [

                        {
                            "className": "dt-center",
                            data: "Id"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre"
                        },

                        {
                            defaultContent: ' <a title="Ver y Descargar Borrador" class="btn task-cat blue darken-2 modal-trigger ver_borrador" href="#modal1"  ><i class="material-icons">file_download</i></a>' +                                
                                ' <a title="Ver y Descargar Final" class= "btn task-cat blue darken-2 modal-trigger ver_final" href="#modal2" > <i class="material-icons">file_download</i></a> '
                        },

                        {
                            "className": "dt-left",
                            data: "Regis_firma"
                        },
                        {
                            "className": "dt-left",
                            data: "Btn"
                        },
                        {
                            "className": "dt-left",
                            data: "Fech_fin"
                        },
                        {
                            defaultContent: ' <a title="Agregar Comentarios" class="btn task-cat grey darken-2 modal-trigger Comentarios" href="#modal3" ><i class="material-icons">comment</i></a>' 
                                
                        },
                        {
                            "className": "dt-center",
                            data: "Estado"
                        },

                    ],
                });             

            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            },
            error: function (response, xhr) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            }
        });
        setTimeout(function () { callback() }, 500)
    };

    $(document).on('click', '.revisar', function (e) {
        e.preventDefault();
        Notificaciones();

    });

    

    //funciones fisualizar archivos
    function visualizar(callback) {
        var codigo = $("[id*=id]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Visualizar",
                data: JSON.stringify({ 'codigo': codigo }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {

                    tabla =   $("#dataModal1").DataTable({
                        "scrollX": true,                        
                        "searching": false,
                        "language": {
                            "lengthMenu": "",
                            "zeroRecords": "No se encontraron resultados en su busqueda",
                            "info": "Registros de _START_ al _END_ de un total de _TOTAL_ ",
                            "InforEmpty": "No existen Registros",
                            "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                            "paginate": {
                                "first": "Primero",
                                "last": "Ultimo",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                    },
                        retrieve: true,
                        data: r.d,
                        columns: [
                            {
                                data: "Regis_borrador"
                            },
                        ],
                    });

                },

                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser visualizados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); },200)
    };   

    function visualizar_final(callback) {
        var codigo = $("[id*=id]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Ver_final",
                data: JSON.stringify({ 'codigo': codigo }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {

                    tabla = $("#dataModal").DataTable({
                        "scrollX": true,
                        "searching": false,
                        "language": {
                            "lengthMenu": "",
                            "zeroRecords": "No se encontraron resultados en su busqueda",
                            "info": "Registros de _START_ al _END_ de un total de _TOTAL_ ",
                            "InforEmpty": "No existen Registros",
                            "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                            "paginate": {
                                "first": "Primero",
                                "last": "Ultimo",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        },
                        retrieve: true,
                        data: r.d,
                        columns: [
                            {

                                "className": "dt-left",
                                data: "Regis_final"
                            },
                        ],
                    });
                    d: r.d;
                    if (r.d[0].Regis_final == "NO EXISTE REGISTRO" ) {
                        $(function () {
                            alert('Error, No Se ha Subido el Archivo Final');
                        });
                    };                
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser visualizados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 200)

    };

    //funcion para actualizar btn de subida de datos
    function actualizar_prioridad(callback) {
        if ($("[id*=datos]").val() == '<a title="Nivel de prioridad Alto" class="btn task-cat red darken-2  btn_p1" id="btn_p1">Borrador</a>') {
            btn = '<a title="Nivel de prioridad Bajo" class="btn task-cat light-green darken-2  btn_p3" id="btn_p3">Contrato</a>'
            etiqueta = "<button  title='Subir Archivo final' class=' btn waves-effect waves-light Subir_final red lighten-2 modal-trigger' id='Subir_final' type='submit' style='position Static' href='#modal1' ><i class='material-icons'>file_upload</i></button>"
            estado = '<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Completo</div><div class="mdl-stepper-bar-left"></div></div></div></div>'
        } else {
                btn = '<a title="Nivel de prioridad Bajo" class="btn task-cat light-green darken-2  btn_p3" disabled="true" id="btn_p3">Contrato</a>'
                etiqueta = "<button  title='Subir Archivo final' class= ' btn waves-effect waves-light Subir_final red lighten-2 modal-trigger' hidden='hidden' id='Subir_final' type='submit' style='position Static' href='#modal1' ><i class='material-icons'>file_upload</i></button>"
                estado = '<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Completo</div><div class="mdl-stepper-bar-left"></div></div></div></div>'

         } 

        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Esta_Doc = $("[id*=datos]").val()
        datosContratos.Datos = etiqueta;
        datosContratos.Btn = btn;
        datosContratos.Estado = estado;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Actualizar_prioridad",
                data: JSON.stringify({ 'datos': datosContratos }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 200)

    };

    $('#modal1').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal   
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function () { // Callback for Modal open. Modal and trigger parameters available.
           
            visualizar(function () { });
          
        },
        complete: function () {// Callback for Modal close
            limpiar();
            tabla.destroy();
            consultar(function () { });
        } 
    });  
    $('#modal2').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal   
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function () {
            visualizar_final(function () {
                //tabla.destroy();
                //consultar(function () { });
            });
        },
        complete: function () {
            limpiar();
            tabla.destroy();
            consultar(function () { });
        }

    });
    $('#modal3').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal   
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function () {
           
        },
        complete: function () {
            limpiar();
            tabla.destroy();
            consultar(function () { });
        }

    });
     
    //visializar y descargar archivos en base
    $(document).on('click', '.ver_borrador', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id); 
        Descargar(function () { });
    });    
    $(document).on('click', '.ver_final', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);    

    });
    $(document).on('click', '.Comentarios', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id); 
    })

    //autorizacion de subida de archivos
    $(document).on('click', '.btn_p1', function (event) {
        event.preventDefault();         
       
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);       
        d = document.getElementById("btn_p1");        
        $("[id*=datos]").val(d.outerHTML)
        
        $.confirm({
            title: 'Confirmar!',
            content: '¿Esta Seguro que desea confirmar que suban el Archivo(Contrato)?',
            buttons: {
                Aceptar: function () {
                    actualizar_prioridad(function () {
                        Materialize.toast("se ha autorizado!", 2000, 'green')
                        tabla.destroy();
                        limpiar();
                        consultar(function () { });
                    });
                },
                Cancelar: function () {

                }

            }
        });
       
    });   
    $(document).on('click', '.btn_p3', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);
        d = document.getElementById("btn_p3");
        $("[id*=datos]").val(d.outerHTML)       

        $.confirm({
            title: 'Confirmar!',
            content: '¡Se han confirmado la subida de archivo! De clic en aceptar',
            buttons: {
                Aceptar: function () {
                    actualizar_prioridad(function () {
                        tabla.destroy();
                        limpiar();
                        consultar(function () { });

                    });
                },
                Cancelar: function () {

                }

            }
        });
       
    });
    $(document).on("click", ".descargar", function (e) {
        e.preventDefault();
        descargarArchivo($('[id*=archivo]').val(), "documento_editable", function () { });

    });   
    $("#ingesar_obs").click(function (e) {
        e.preventDefault();
        if ($("[id*=Observacion]").val() == "") {
            Materialize.toast("Error, Ingrese las observaciones ", 2000, 'red');
            return false;
        }
        Guardar_comentarios();
        limpiar();
    });  

    var limpiar = function () {
        $("[id*=id]").val("");
        $("[id*=datos]").val("");
        $("[id*=archivo]").val("");
        $("[id*=Observacion]").val("");
    };
    

    function descargarArchivo(contenidoEnBlob, nombreArchivo,callback) {
        //creamos un FileReader para leer el Blob
        var reader = new FileReader();
        //Definimos la función que manejará el archivo
        //una vez haya terminado de leerlo
        reader.onload = function (event) {
            //Usaremos un link para iniciar la descarga 
            var save = document.createElement('a');
            save.href = event.target.result;
            save.target = '_blank';
            //Truco: así le damos el nombre al archivo 
            save.download = nombreArchivo || 'archivo.dat';
            var clicEvent = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            //Simulamos un clic del usuario
            //no es necesario agregar el link al DOM.
            save.dispatchEvent(clicEvent);
            //Y liberamos recursos...
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        };
        var contenido = dataURItoBlob(contenidoEnBlob)
        //Leemos el blob y esperamos a que dispare el evento "load"
        reader.readAsDataURL(contenido); 
        setTimeout(function () { callback();},2000)
    };

    //descargar archivo
    function Descargar(callback) {
        var codigo = $("[id*=id]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/descargar",
                data: JSON.stringify({ 'codigo': codigo }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {                    
                    d: r.d;
                    var regis = r.d[0].Regis_borrador;
                    if ((regis != "null") || (regis != " ")) {
                        $("[id*=archivo]").val(r.d[0].Regis_borrador);
                    } 
                   
                    console.log(regis);
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser descargados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });     
        setTimeout(function () { callback(); }, 100)
    };     

    //descargar archivo
    function Guardar_comentarios() {
        btn = '<a class="btn task-cat yellow darken-2  btn_p2" id="btn_p2">En proceso</a>'        
        var datoscoment = {};
        datoscoment.Id = $("[id*=id]").val();
        datoscoment.Observacion = $("[id*=Observacion]").val();
        datoscoment.Btn = btn;        
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Modificar_borrador",
                data: JSON.stringify({ 'datos': datoscoment }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {
                    Materialize.toast('ENVIADOS CORRECTAMENTE', 4000, 'rounded green');
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, NO SE PUDO ENVIAR EL COMENTARIO', 4000, 'rounded red');
                    console.log(response.d);
                }

            });
        });
       
    };    

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], { type: mimeString });
        return bb;
    };

    function Notificaciones() {   
        
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Notificacion",
                data:"{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {
                    var datos = r.d
                    d: r.d;                  
                    //console.log(datos.length)
                    for (var i = 0; i < datos.length; i++) {                       
                        if (r.d[i].Fech_fin == "")  {
                            Materialize.toast("No existen contratos por vencer!!", 10000, "green rounded")
                        } else {
                            Materialize.toast("El contrato: " + r.d[i].Nombre + " Vence en: " + r.d[i].Fech_fin, 20000, "grey rounded")
                        }

                    }            
                    if (r.d.length==0) {
                        Materialize.toast("No existen contratos por vencer!!", 10000, "green rounded")
                    }
                    console.log(r.d)
                },
                failure: function (response) {
                    Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
                },
                error: function (response, xhr) {
                    Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
                }

            });
       

    };   

});