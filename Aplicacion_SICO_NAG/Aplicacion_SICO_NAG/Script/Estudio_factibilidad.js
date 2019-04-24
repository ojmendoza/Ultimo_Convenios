var fech_asig;
var fech_Resp;
var factible;
var tabla;
$(document).ready(function () {
    $('select').material_select();

    consultar(); 
    
    //Funcion para cargar los operadores en la modal
    function ObtenerDatosOperador() {
        var dropCatalogo = {};
        $.ajax({

            type: "POST",
            url: "/vistas/Estudio_Factibilidad.aspx/ObtenerDatosOperador",
            data: JSON.stringify({ 'dropInciso': dropCatalogo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {

                tabla = $("#datatable2").DataTable({
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
                    data: r.d,

                    columns: [
                        {
                            defaultContent: '<a  title="Agregar Operado" class="btn-floating btn-large waves-effect btn_AgregarDatos waves-light green darken-1"><i class="material-icons">add</i></a>'
                        },
                        {
                            "className": "dt-center",
                            data: "Value"
                        },
                        {
                            "className": "dt-left",
                            data: "Text"
                        }
                    ],
                });
            }
        });
    };

    //Boton que llama la funcion para la modal de Operadores
    $('.agregar_operador').click(function (e) {
        e.preventDefault();
        $('.modal').modal({
            dismissible: true,
            ready: function () {
                ObtenerDatosOperador();
            },
            complete: function () {
                tabla.destroy();
                $('.btn_Actualizar').hide();
            }
        });
    });

    //Boton para agregar el operador seleccionado a los textbox
    $(document).on("click", '.btn_AgregarDatos', function (e) {
        e.preventDefault();
        var datos = tabla.row($(this).parents("tr")).data();
        $("[id*=Cod_Operador]").val(datos.Value);        
        $("[id*=Nom_operador]").val(datos.Text);
    });

    //Inicializacion para el datepicker  
    $("#fech_asig, #fech_Resp").pickadate({
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

    //Funcion para cargar los datos de solicitudes en la modal
    function ObtenerDatos_Solicitudes() {

        $.ajax({

            type: "POST",
            url: "/vistas/Estudio_Factibilidad.aspx/modal_solicitudes",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {

                tabla = $("#datatable1").DataTable({
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
                    data: r.d,

                    columns: [
                        {
                            defaultContent: '<a  title="Agregar Datos Solicitud" class="btn-floating btn-large waves-effect btn_Datos_solic waves-light green darken-1"><i class="material-icons">add</i></a>'
                        },
                        {
                            "className": "dt-left",
                            data: "Id"
                        },

                        {
                            "className": "dt-left",
                            data: "Código_SACE"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre_Institución"
                        },
                        {
                            "className": "dt-left",
                            data: "Tipo_Institución"
                        },

                        {
                            "className": "dt-left",
                            data: "Estado_Solicitud"
                        },
                        {
                            "className": "dt-left",
                            data: "Finalidad_Solicitud"
                        },

                    ],
                });
            }
        });
    };

    //Boton que llama la funcion para la modal de Instituciones
    $('.agregar').click(function (e) {
        e.preventDefault();
        $('.modal').modal({
            dismissible: true,
            ready: function () {
                ObtenerDatos_Solicitudes();
            },
            complete: function () {
                tabla.destroy();
                $('.btn_Actualizar').hide();
            }
        });
    });

    //Boton para agregar los datos de instituciones a los controles input
    $(document).on("click", '.btn_Datos_solic', function (e) {
        e.preventDefault();
        var datos = tabla.row($(this).parents("tr")).data();
        if (datos.Tipo_Institución != "Centros Educativos") {
            document.getElementById("cod_sace").style.display = "none";
            $("[id*=cod_sace]").val("");
        } else {
            document.getElementById("cod_sace").style.display = "block";
            $("[id*=cod_sace]").val(datos.Código_SACE);
        }
        $("[id*=id]").val(datos.Id);
        $("[id*=nom_inst]").val(datos.Nombre_Institución);
        $("[id*=Tip_inst]").val(datos.Tipo_Institución);
        $("[id*=Factibilidad]").val(datos.Estado_Solicitud);
        $("[id*=fin_solic]").val(datos.Finalidad_Solicitud);
    });

    //funcion para limpiar los controloes
    var limpiar = function () {
        $('select').material_select('destroy');
        $("[id*=id]").val("");
        $("[id*=inst]").val("");
        $("[id*=nom_inst]").val("");
        $("[id*=cod_sace]").val("");
        $('[id*=Tip_inst]').val("");
        $("[id*=Cod_Operador]").val("");
        $("[id*=fin_solic]").val("");
        $("[id*=Factibilidad]").val("");
        $('[id*=Nom_operador]').val("");
        $("[id*=fech_asig]").val("");
        $("[id*=fech_Resp]").val("");
        $("[id*=est_facti]").val("");
        $('select').material_select();
        Materialize.updateTextFields();
    };
    
    // agregar datos de la tabla institucion
    function GuardarEstudio(callback) {
        fech_asig = document.getElementById("fech_asig").value;
        fech_Resp = document.getElementById("fech_Resp").value;
        var datosFactibilidad = {};
        datosFactibilidad.Id = $("[id*=id]").val();
        datosFactibilidad.Cod_Operador = $("[id*=Cod_Operador]").val();
        datosFactibilidad.Nom_Operador = $("[id*=Nom_operador]").val();
        datosFactibilidad.Fec_Asig = fech_asig; 
        datosFactibilidad.Fec_Resp = fech_Resp;
        datosFactibilidad.Est_Facti = $("[id*=est_facti]").val();

        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Estudio_Factibilidad.aspx/Agregarfactibilidad",
                data: JSON.stringify({ 'datos': datosFactibilidad }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    // console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 100);
    
    };

    //actualizar la solicitud
    function actualizar_solicitud(callback) {
        factible = document.getElementById("Factibilidad").value;
        var datosSolicitud = {};
        datosSolicitud.Id = $("[id*=id]").val();
        datosSolicitud.Estado_Solicitud = factible;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Estudio_Factibilidad.aspx/actualizar_solicitud",
                data: JSON.stringify({ 'datos': datosSolicitud }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 4000, 'rounded');
                    // console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 200);
       
    };

    //funcion controladora para guardar
    function guardar_datos(callback) {
        GuardarEstudio(function () {
            actualizar_solicitud(function () {
                Materialize.toast('Datos guardados correctamente', 2000, 'rounded');
                tabla.destroy();
                consultar();
                limpiar();
            });
        });
        setTimeout(function () { callback(); },500)
    };

    //controladora de actualizaciones
    function Actualizar_datos() {
        $(function () {
            $.confirm({
                title: 'Confirmar!',
                content: '¿Esta Seguro que desea actualizar los datos?',
                buttons: {
                    Aceptar: function () {
                        Actualizar_Factibilidad(function () {
                            //actualizar_solicitud(function () {
                                Materialize.toast('Datos Actualizados correctamente', 500, 'rounded');
                                tabla.destroy();
                                consultar();
                                limpiar();
                            //});
                        });
                    },
                    Cancelar: function () {
                        actualizar();
                    },
                }
            });
        });
    };

    //funcion controladora para actualizar
    function Actualizar_Factibilidad(callback) {
        fech_asig = document.getElementById("fech_asig").value;
        fech_Resp = document.getElementById("fech_Resp").value;
        factible = document.getElementById("Factibilidad").value;
        var datosFac = {};
        datosFac.Id = $("[id*=inst]").val();
        datosFac.Cod_Operador = $("[id*=Cod_Operador]").val();
        datosFac.Nom_Operador = $("[id*=Nom_operador]").val();
        datosFac.Fec_Asig = fech_asig;
        datosFac.Fec_Resp = fech_Resp;
        datosFac.Est_Facti = $("[id*=est_facti]").val(); 
        datosFac.Estado = factible;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Estudio_Factibilidad.aspx/actualizar_fiablilidad",
                data: JSON.stringify({ 'datos': datosFac }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                   //Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 4000, 'rounded');
                    // console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 100);

    };    

    //funcion para guardar o actualizar los datos
    $('#btn_insertar').click(function (e) {
        e.preventDefault();

        if ($("[id*=inst]").val() == "") {
            guardar_datos(function () {});
        } else {
            Actualizar_datos();
        }

        $('select').material_select();
    });

    //funcion para cancelar lo que hacemos
    $("#btn_cancelar").click(function (e) {
        e.preventDefault();
        limpiar();
        actualizar();
    });

    //funcion actualiza la pagina
    function actualizar() {
        location.reload(true);
    };

    //cabiar de en proceso a aprobada
    $('.eval').change(
        function (e) {
            var datos = {};
            if ($("[id*=est_facti]").val() == 'FACTIBLE') {
                datos.FACTIBLE = $("[id*=Factibilidad]").val("Aprobada");
            }
            else
                if ($("[id*=est_facti]").val() == 'NO FACTIBLE') {
                    datos.FACTIBLE = $("[id*=Factibilidad]").val("No Aprobada");
                }
                else {
                    datos.FACTIBLE = $("[id*=Factibilidad]").val("");
                }
        });

    //agrgar datos a la tabla
    function consultar() {
        $.ajax({
            type: "POST",
            url: "/vistas/Estudio_Factibilidad.aspx/agregar_tabla",
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

                    // paging: false,
                    //destroy: false,
                    retrieve: true,

                    dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" + "<'row'<'col-sm-12't>>" + "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-12'' '>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                    columnDefs: [
                        {
                            targets: 1,
                            className: 'noVis'
                        },
                        {
                            "targets": [5],
                            "visible": false,
                            "searchable": false,
                        }
                    
                    ],
                    buttons: [
                        {
                            extend: 'colvis',
                            text: 'Campos Visibles',
                            postfixButtons: ['colvisRestore']
                        },
                        {
                            extend: 'copyHtml5',
                            title: 'Reporte de instituciones factibles',
                            exportOptions: {
                                columns: [':visible']
                            }

                        },
                        {
                            extend: 'excelHtml5',
                            title: 'Reporte de instituciones factibles',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            download: 'open',
                            title: 'Reporte de instituciones factibles',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Imprimir',
                            title: 'Reporte de instituciones factibles',
                            exportOptions: {
                                columns: [':visible']
                            }
                        }
                    ],
                    data: response.d,

                    columns: [
                        {
                            defaultContent: '<button  title="Actualizar" class=" btn  waves-effect waves-light btn_Actualizar blue lighten-2" type="submit" style="position: static"><i class="material-icons">update</i></button>&nbsp;' 
                          },
                        {
                            "className": "dt-center",
                            data: "Id"
                        },                       
                        {
                            "className": "dt-left",
                            data: "Nombre_Institución"
                        },
                        {
                            "className": "dt-left",
                            data: "Código_SACE"
                        },
                        {
                            "className": "dt-left",
                            data: "Tipo_Institución"
                        },
                        {
                            "className": "dt-left",
                            data: "Estado_Solicitud"
                        },

                        {
                            "className": "dt-left",
                            data: "Nom_Operador"
                        },
                        {
                            "className": "dt-left",
                            data: "Cod_Operador"
                        },
                        {
                            "className": "dt-left",
                            data: "Fec_Asig"
                        },
                        {
                            "className": "dt-left",
                            data: "Fec_Resp"
                        },
                        {
                            "className": "dt-left",
                            data: "Est_Facti"
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

    //seleccionar los datos de la tabla a los controles
    function Modificar_datos() {
        var datos = $("[id*=inst]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Estudio_Factibilidad.aspx/ModificarDatos",
            data: JSON.stringify({ 'cod_inst': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                d: data.d
                $('select').material_select('destroy');               
                $("[id*=nom_inst]").val(data.d[0].Nombre_Institución);
                $("[id*=cod_sace]").val(data.d[0].Código_SACE);         
                $("[id*=Factibilidad]").val(data.d[0].Estado_Solicitud);                
                $("[id*=Tip_inst]").val(data.d[0].Tipo_Institución);
                $("[id*=Nom_operador]").val(data.d[0].Nom_Operador);
                $("[id*=Cod_Operador]").val(data.d[0].Cod_Operador);
                $("[id*=fech_asig]").val(data.d[0].Fec_Asig);
                $("[id*=fech_Resp]").val(data.d[0].Fec_Resp);
                $("[id*=est_facti]").val(data.d[0].Est_Facti);              
                $('select').material_select();
            },
            error: function (data) {
                Materialize.toast('Error al cargar los datos. ' + data.d + '', 4000, 'rounded');
            }

        })
    };

    //funcion para mandar la imagen al archivo file
    $(document).on('click', '.btn_Actualizar', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=inst]").val(data.Id);
        if (data.Tipo_Institución != "Centros Educativos") {
            document.getElementById("cod_sace").style.display = "none";
            $("[id*=cod_sace]").val("");
        } else {
            document.getElementById("cod_sace").style.display = "block";
            $("[id*=cod_sace]").val(data.Código_SACE);
        }
        Modificar_datos();
    });

});