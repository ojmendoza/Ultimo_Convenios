var fecha_inicio;
var fecha_final;
var base64;
var datos;
var tabla;
var archivo;
var bina;
$(document).ready(function () {
    $('select').material_select();
    $(".modal").modal();
    $('input#input_text,textarea#textarea1').characterCounter();

    consultar(function () { });
    $('.datepicker').on('mousedown', function (e) {
        e.preventDefault();
    });

    //  format: 'yyyy/mmm/dd' ,
    $('#fech_inicio, #fech_final,#fech_firma').pickadate({
        selectMonths: true,
        selectYears: 15,
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
        formatSubmit: 'dd/mm/yyyy',
        container: undefined,
    });

    // agregar datos de los contratos
    function guardarConvenio(callback) {
        fecha_inicio = document.getElementById("fech_inicio").value;
        bina = document.getElementById("bina").value;
        var datosConvenios = {};
        datosConvenios.Nombre = $("[id*=nom_contra]").val();
        datosConvenios.Regis_borrador = bina;
        datosConvenios.Fech_inicio = fecha_inicio;
        datosConvenios.Descripcion = $("[id*=descrip]").val();

        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Convenios.aspx/Guardar_Convenio",
                data: JSON.stringify({ 'datos': datosConvenios }),
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
        setTimeout(function () { callback(); }, 600);

    };

    function guardarbtn(callback) {
        datos = "<button title='Subir Archivo final' class=' btn waves-effect waves-light Subir_final red lighten-2 modal-trigger' disabled='true' id='Subir_final' type='submit' style='position Static' href='#modal1' > <i class='material-icons'>file_upload</i></button>"
        //< button  title = 'Subir Archivo Memo' class=' btn waves-effect waves-light Subir_memo red lighten-2 modal-trigger' disabled = 'true' id = 'Subir_memo' type = 'submit'  style = 'position: Static' href = '#modal' > <i class='material-icons'>file_upload</i></button >& nbsp; 

        btn = '<a title="Nivel de prioridad Alto" class="btn task-cat red darken-2  btn_p1" id="btn_p1">Borrador</a>'

        estado = '<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Convenio</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div></div></div></div>'

        var datosContratos = {};
        datosContratos.Datos = datos;
        datosContratos.Btn = btn;
        datosContratos.Estado = estado;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Convenios.aspx/Guardar_btn",
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
        setTimeout(function () { callback(); }, 900);
    };

    //funcion guardar memo
    function guardarFinal(callback) {
        fecha_final = document.getElementById("fech_final").value;
        fecha_firma = document.getElementById("fech_firma").value;
        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Regis_firma = fecha_firma;
        datosContratos.Regis_final = $("[id*=bina]").val();
        datosContratos.Fech_fin = fecha_final;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Convenios.aspx/Guardar_ArchivoF",
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

    //actualizar informacion del conVENIOS   
    function ActualizarConvenios(callback) {
        fecha_inicio = document.getElementById("fech_inicio").value;
        //fecha_final = document.getElementById("fech_final").value;
        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Nombre = $("[id*=nom_contra]").val();
        datosContratos.Fech_inicio = fecha_inicio;
        datosContratos.Esta_Doc = $("[id*=est_contra]").val();
        datosContratos.Descripcion = $("[id*=descrip]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Registro_Convenios.aspx/Actualizar_Convenio",
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
    function guardar() {
        guardarConvenio(function () {
            // guardarArchivo(function () {
            guardarbtn(function () {


                Materialize.toast('Datos insertados correctamente', 4000, 'rounded')
                //  limpiar()
            });
            //});
        });


    };

    //FUNCION DE LLENAR DATATABLE
    function consultar(callback) {
        $.ajax({
            type: "POST",
            url: "/Views/Registro_Convenios.aspx/seleccionar",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                tabla = $("#datatable").DataTable({
                    "scrollX": true,
                    "order": [[2, 'desc']],
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
                    //paging: false,
                    //destroy: false,
                    retrieve: true,
                    //dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" + "<'row'<'col-sm-12't>>" + "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-12'' '>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                    columnDefs: [
                        {
                            targets: 1,
                            className: 'noVis'
                        }
                    ],

                    data: response.d,

                    columns: [
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

        setTimeout(function () { callback() }, 500)

    };

    //Funcion para llenar los datos en los textbox a Modificar  
    function Modificar_datos() {
        var datos = $("[id*=id]").val();

        $.ajax({
            type: "POST",
            url: "/Views/Registro_Convenios.aspx/ModificarDatos",
            data: JSON.stringify({ "Id": datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                d: data.d
                $('select').material_select('destroy');
                $("[id*=id]").val(data.d[0].Id);
                $("[id*=nom_contra]").val(data.d[0].Nombre);
                $("[id*=fech_inicio]").val(data.d[0].Fech_inicio);
                $("[id*=descrip]").val(data.d[0].Descripcion);
                $("[id*=est_contra]").val(data.d[0].Esta_Doc);
                $('select').material_select();
            },
            error: function (data) {
                Materialize.toast('Error al cargar los datos. ' + data.d + '', 4000, 'rounded');
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
        if ($("[id*=descrip]").val() == "") {
            Materialize.toast('ERROR, Escriba una breve descripcion', 6000, 'rounded');
            return false;
        }
        if (document.getElementById('fech_inicio').value == "") {
            Materialize.toast('ERROR, Ingrese la Fecha', 6000, 'rounded');
            return false;
        }

        if (document.getElementById('borrador').value == "") {
            Materialize.toast('ERROR, Ingrese el documento', 6000, 'rounded');
            return false;
        }
       

        if (document.getElementById('fech_inicio').value < moment().format('DD/MM/YYYY')) {
            Materialize.toast('ERROR, La fecha deber Mayor o igual que hoy', 6000, 'rounded');
            return false;
        }

        if ($("[id*=id]").val() == "") {
            guardar();
            limpiar();
            tabla.destroy();
            consultar(function () { });
        } else {
            ActualizarConvenios(function () {

                Materialize.toast("Datos Actualizados", 2000, "rounded green");
                tabla.destroy();
                consultar(function () { });
            });
            limpiar();
        }

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

        if (document.getElementById('fech_firma').value == "") {
            Materialize.toast('ERROR, Ingrese la Fecha que se firma el Convenio', 6000, 'rounded');
            return false;
        }
        if (document.getElementById('fech_final').value == "") {
            Materialize.toast('ERROR, Ingrese la FEcha que se Vence el Convenio', 6000, 'rounded');
            return false;
        }

        if (document.getElementById('final').value == "") {
            Materialize.toast('ERROR, Ingrese el documento', 6000, 'rounded');
            return false;
        }

        if (document.getElementById('fech_final').value < document.getElementById('fech_firma').value) {
            Materialize.toast('ERROR, La fecha de firma debe ser menor que la fecha de vencimiento', 6000, 'rounded');
            return false;
        }

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
            Materialize.toast("Seleccione un archivo con formato pdf.", 2000, 'rounded');
            return false;

        }
    };

    //solo WORD
    function solo_word(datos) {
        var countFiles = $(datos)[0].files.length;
        var imgPath = $(datos)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        if ((extn == "docx") | (extn == "doc")) {
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
    }),

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

    });

    $('#modal1').modal({
        dismissible: true,
        ready: function () {

        },
        complete: function () {
            $('#preload1').removeClass('loader-page');
            $('#preload').removeClass('loader-page');
            $(".loader-page").css({ visibility: "hidden", opacity: "0" })
            
            limpiar();
            tabla.destroy();
            consultar(function () { });
        }
    });

    //preload
    $(document).on('change', '.finale', function (e) {
        e.preventDefault()
        while ($("[id*=bina]").val() == "") {
            $('#preload').addClass('loader-page');
            //$('#preload1').addClass('loader-page');
            $(".loader-page").css({ visibility: "visible", opacity: "100" })
            break;
        }
        if (document.getElementsByClassName('love').value != "") {
            setTimeout(function () {
                $(".loader-page").css({ visibility: "hidden", opacity: "0" })
                //$('#preload1').removeClass('loader-page');
                $('#preload').removeClass('loader-page');

            }, 1500);
        }

    });

    //preload
    $(document).on('change', '.borra', function (e) {
        e.preventDefault()
        while ($("[id*=bina]").val() == "") {
            //$('#preload').addClass('loader-page');
            $('#preload1').addClass('loader-page');
            $(".loader-page").css({ visibility: "visible", opacity: "100" })
            break;
        }
        if (document.getElementsByClassName('love').value != "") {
            setTimeout(function () {
                $(".loader-page").css({ visibility: "hidden", opacity: "0" })
                $('#preload1').removeClass('loader-page');
                //$('#preload').removeClass('loader-page');

            }, 1500);
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
        $("[id*=borrador]").val("");
        $("[id*=final]").val("");
        $("[id*=memo]").val("");
        $("[id*=descrip]").val("");
        $('select').material_select();
        Materialize.updateTextFields();
    };
});