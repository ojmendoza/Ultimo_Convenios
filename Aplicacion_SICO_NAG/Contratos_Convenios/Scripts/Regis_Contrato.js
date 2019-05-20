﻿var fecha_inicio;
var fecha_firma;
var fecha_final;
var base64;
var datos;
var tabla;
var archivo;
var btn;
var estado;
$(document).ready(function () {
    $('select').material_select();
    $(".modal").modal();
    $('input#input_text, textarea#textarea1').characterCounter();
   
    consultar();      
   
    //  format: 'yyyy/mmm/dd' ,
    $('#fech_inicio, #fech_final,#fech_firma').pickadate({
        selectMonths: true,
        selectYears: true,
        //closeOnSelect: true,
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        today: 'hoy',
        clear: 'borrar',
        close: 'cerrar',
        closeOnSelect: false,
        firstDay: 1,
        format: 'dd/mm/yyyy',
        formatSubmit: 'dd/mm/yyyy'
        // hiddenName: true
    });

    // agregar datos de los contratos
    function guardarContratos(callback) {
        fecha_inicio = document.getElementById("fech_inicio").value;
        //fecha_final = document.getElementById("descripcion").value;
        var datosContratos = {};
        datosContratos.Nombre = $("[id*=nom_contra]").val();
        datosContratos.Fech_inicio = fecha_inicio;
        datosContratos.Descripcion = $("[id*=descripcion]").val();             
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Contratos.aspx/Guardar_Contrato",
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
        setTimeout(function () { callback(); }, 200);

    };

    //funcion guardar archivo
    function guardarArchivo(callback) {
        datos = document.getElementById("bina").value;
        var datosContratos = {};
        datosContratos.Regis_borrador = datos;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Contratos.aspx/Guardar_Archivo",
                data: JSON.stringify({ 'datos': datosContratos }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    console.log(response);
                }

            });
        });
        setTimeout(function () { callback(); }, 500);
    };

    function guardarbtn(callback) {
        datos = "<button  title='Subir Archivo final' class= 'btn waves-effect waves-light Subir_final red lighten-2 modal-trigger' disabled='true' id='Subir_final' type='submit' style='position Static' href='#modal1'><i class='material-icons'>file_upload</i></button>"
        btn = '<a title="Nivel de prioridad Alto" class="btn task-cat red darken-2  btn_p1" id="btn_p1">Borrador</a>'
        estado = '<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Completo</div><div class="mdl-stepper-bar-left"></div></div></div></div>'
        var datosContratos = {};
        datosContratos.Datos = datos;
        datosContratos.Btn = btn;
        datosContratos.Estado = estado;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Contratos.aspx/Guardar_btn",
                data: JSON.stringify({ 'datos': datosContratos }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    console.log(response);
                }

            });
        });
        setTimeout(function () { callback(); }, 700);
    };
   
    //funcion guardar memo
    function guardarFinal(callback) {
        fecha_final = document.getElementById("fech_final").value;
        fecha_firma = document.getElementById("fech_firma").value;
        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Regis_final = $("[id*=bina]").val(); 
        datosContratos.Fech_fin = fecha_final;
        datosContratos.Regis_firma = fecha_firma;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Contratos.aspx/Guardar_ArchivoF",
                data: JSON.stringify({ 'datos': datosContratos }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    Materialize.toast('Archivo de Final Subido Correctamente', 4000, 'rounded green')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser subidos', 4000, 'rounded red');
                    console.log(response);
                }

            });
        });
        setTimeout(function () { callback(); }, 500);
    };

    //actualizar informacion del contrato    
    function ActualizarContratos(callback) {
        fecha_inicio = document.getElementById("fech_inicio").value;      
        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Nombre = $("[id*=nom_contra]").val();
        datosContratos.Fech_inicio = fecha_inicio;
        datosContratos.Descripcion = $("[id*=descripcion]").val();;
        
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Contratos.aspx/Actualizar_Contrato",
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
        setTimeout(function () { callback(); }, 200);

    };

    //controladora para guardar
    function guardar(callback) {
        guardarContratos(function () {
            guardarArchivo(function () {
                guardarbtn(function () {
                    Materialize.toast('Datos insertados correctamente', 4000, 'rounded');
                    //limpiar();
                });
            });
        });
        setTimeout(function () { callback();}, 1000)
    };

    //FUNCION DE LLENAR DATATABLE
    function consultar() {       
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Contratos.aspx/seleccionar",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    tabla = $("#datatable").DataTable({
                        "scrollX": true,
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
                        columnDefs: [
                            {
                                targets: 1,
                                className: 'noVis'
                            }
                        ],
                     
                        data: response.d,
                       
                        columns:  [
                            {
                                defaultContent: '<button  title="Actualizar" class=" btn waves-effect waves-light btn_Actualizar blue lighten-2" type="submit" style="position: static"><i class="material-icons">update</i></button>&nbsp;' 
                                   
                                
                            },                           
                            {
                                "className": "dt-center",
                                data: "Datos"
                            },
                            {
                                "className": "dt-center",
                                data: "Id"
                            },
                            {
                                "className": "dt-center",
                                data: "Nombre"
                            },                               

                            {
                                "className": "dt-left",
                                data: "Tip_Doc"
                            },

                            {   
                                "className": "dt-left",
                                data: "Esta_Doc"
                            },
                            {
                                "className": "dt-left",
                                data: "Fech_inicio"
                            },
                            {
                                "className": "dt-left",
                                data: "Regis_firma"
                            },

                            {
                                "className": "dt-left",
                                data: "Fech_fin"
                            },
                            {
                                "className": "dt-left",
                                data: "Descripcion"
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
       
    };

    //Funcion para llenar los datos en los textbox a Modificar  
    function Modificar_datos() {
        var datos = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/Views/Registro_Contratos.aspx/ModificarDatos",
            data: JSON.stringify({ "Id": datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                d: data.d
                $('select').material_select('destroy');
                $("[id*=id]").val(data.d[0].Id);
                $("[id*=nom_contra]").val(data.d[0].Nombre);
                $("[id*=fech_inicio]").val(data.d[0].Fech_inicio);               
                $("[id*=descripcion]").val(data.d[0].Descripcion);
                $('select').material_select();
            },
            error: function (data) {
                Materialize.toast('Error al cargar los datos. ' + data.d + '', 4000, 'rounded');
                console.log(data.d)
            }

        })
    };

    //aca es para guardar o actualizar datosSubir_1
    $('#btn_insertar').click(function (e) {
        e.preventDefault();

        if ($("[id*=nom_contra]").val() == "") {
            Materialize.toast('ERROR, Ingrese el nombre del Convenio', 6000, 'rounded');
            return false;
        }


        if ($("[id*=descripcion]").val() == "") {
            Materialize.toast('ERROR, Escriba una breve descripcion', 6000, 'rounded');
            return false;
        }

        if ($("[id*=id]").val() == "") {
            guardar(function () { });            
            tabla.destroy();
            consultar();
        } else {
            ActualizarContratos(function () {
                Materialize.toast("Datos Actualizados", 2000, "rounded green");
                tabla.destroy();
                consultar();
            });
            limpiar();
           
            
        }
        consultar();
    });

    //mandar datos de la tabla a controles
    $(document).on("click", '.btn_Actualizar', function (e) {
        e.preventDefault();
        $('select').material_select('destroy');
        var row = $(this).parent().parent()[0];
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);
        Modificar_datos();   
       
        $('select').material_select();

    });

      //aca es para subir el final
    $('#Subir_2').click(function (e) {
        e.preventDefault();
        guardarFinal(function () { });
        limpiar();
    });

    //convertir a base64
    function convertToBase64(archivo) {
        //Read File 
        var selectedFile = archivo;
        //Check File is not Empty 
        if (selectedFile.length > 0) {
            // Select the very first file from list 
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file. 
            var fileReader = new FileReader();

            // Onload of file read the file content 
            fileReader.onload = function (fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                $("[id*=bina]").val(base64);
            };
            // Convert data to base64 
            fileReader.readAsDataURL(fileToLoad);
        }
    };

    //solo pdf
    function solo_pdf(datos) {
        var countFiles = $(datos)[0].files.length;
        var imgPath = $(datos)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if (extn == "pdf") {
            if (typeof (FileReader) != "undefined") {
                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {
                    convertToBase64(datos.files);
                    //reader.readAsDataURL($(this)[0].files[i]);
                }
            } else {
                Materialize.toast("Este buscador no soporta archivos de lectura.", 2000, 'rounded');
            }
        } else {
            $("[id*=file]").val("");
            Materialize.toast("Seleccione un archivo con formato pdf.", 2000, 'rounded' );
            return false;
           
        }
    };   

    //solo WORD
    function solo_word(datos) {
        var countFiles = $(datos)[0].files.length;
        var imgPath = $(datos)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if ((extn == "docx") | (extn == "doc") ) {
            if (typeof (FileReader) != "undefined") {
                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {
                    convertToBase64(datos.files);
                    //reader.readAsDataURL($(this)[0].files[i]);
                }
            } else {
                Materialize.toast("Este buscador no soporta archivos de lectura.", 2000, 'rounded');
            }
        } else {
            $("[id*=file]").val("");
            Materialize.toast("Seleccione un archivo con formato docx o doc.", 2000, 'rounded');
            return false;

        }
    };   

    $(document).on("change", '#file', function (e) {
        e.preventDefault();       
        $('.btn_Actualizar').hide();       
        $('.Subir_final').hide();
    });

    $('#file').on('change', function () {
        solo_word(this);             
    });
   
    $('#file_final').on('change', function () {
        solo_pdf(this);
    });
       
    //subir el archivo final    
     $(document).on("click", '.Subir_final', function (e) {
        e.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);        
        $('.btn_Actualizar').hide();
        //$('.Subir_memo').hide();   
    });

    $('#modal1').modal({
        dismissible: true,
        ready: function () {
           
        },
        complete: function () {
            limpiar();
            tabla.destroy();
            consultar();
        }
    });


    //Funcion para limpiar los Campos
    var limpiar = function () {
        $('select').material_select('destroy');
        $("[id*=id]").val("");
        $("[id*=bina]").val("");
        $("[id*=nom_contra]").val("");
        $("[id*=fech_inicio]").val("");
        $("[id*=fech_final]").val("");
        $("[id*=fech_firma]").val("");
        $("[id*=est_contra]").val("");
        $("[id*=file]").val("");
        //$("[id*=file_memo]").val("");
        $("[id*=descripcion]").val("");
        $("[id*=file_final]").val("");   
        //$("[id*=file_frma]").val(""); 
        $('select').material_select();
        Materialize.updateTextFields();
    };

});