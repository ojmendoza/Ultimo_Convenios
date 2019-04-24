var tabla;
var data;
var drop;
var row;
$(document).ready(function () {
    // Inicializacion para los select
    $('select').material_select();
    //LLamado de la Funcion que llena el datatable
    consultar();
    //LLamado de la Funcion que llena el drop departamento
    ObtenerDatosDrop();

    // solo permite que el año pueda ser de 2019 en adelante 
    var myInput = document.getElementById('txt_Anio');
    myInput.addEventListener('change', function (e) {
        var val = e.target.value;
        if (val < 2019) {
            e.target.value = "";
            Materialize.toast('Solo puede ingresar Año de 2019 en adelante.', 600, 'rounded');
        }
        else {
            val;
        }
    });

    //Inicializacion para el datepicker  
    $("#fecha").pickadate({
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

    //FUNCION DE LLENAR DATATABLE
    function consultar() {
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/ObtenerCentros",
            data: JSON.stringify({ 'Id_Centros': 1 }),
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
                    //paging: false,
                    //destroy: false,
                    retrieve: true,
                    dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" + "<'row'<'col-sm-12't>>" + "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-12'' '>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                    columnDefs: [
                        {
                            targets: 1,
                            className: 'noVis'
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
                            title: 'Reporte Centros Educativos',
                            exportOptions: {
                                columns: [':visible']
                            }

                        },
                        {
                            extend: 'excelHtml5',
                            title: 'Reporte Centros Educativos',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            download: 'open',
                            title: 'Reporte Centros Educativos',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Imprimir',
                            title: 'Reporte Centros Educativos',
                            exportOptions: {
                                columns: [':visible']
                            }
                        }
                    ],
                    data: response.d,

                    columns: [
                        {
                            defaultContent: '<button  title="Actualizar" class=" btn waves-effect waves-light btn_Actualizar blue lighten-2" type="submit" style="position: static"><i class="material-icons">update</i></button>&nbsp;' +
                                '<button  title="Cambiar Estado" class=" btn waves-effect waves-light btn_Estado  red" type="submit"style="position: static"><i class="material-icons">offline_pin</i></button>'
                        },
                       
                        {
                            "className": "dt-center",
                            data: "Id"
                        },
                        {
                            "className": "dt-center",
                            data: "Sace"
                        },

                        {
                            "className": "dt-left",
                            data: "Centro"
                        },
                        
                        {
                            "className": "dt-left",
                            data: "Total_Matricula"
                        },
                        
                        {
                            "className": "dt-left",
                            data: "Nivel"
                        },
                        {
                            "className": "dt-left",
                            data: "Fecha_Instalacion"
                        },
                        {
                            "className": "dt-left",
                            data: "Operador"
                        },
                        {
                            "className": "dt-left",
                            data: "Codigo"
                        },
                        {
                            "className": "dt-left",
                            data: "Medio_conexion"
                        },
                        {
                            "className": "dt-left",
                            data: "Tipo_Cliente"
                        },
                        {
                            "className": "dt-left",
                            data: "Ancho_Banda_Entregado"
                        },
                        {
                            "className": "dt-left",
                            data: "Conectado"
                        },
                        
                        {
                            "className": "dt-left",
                            data: "Estatus"
                        },
                        {
                            "className": "dt-left",
                            data: "Observaciones"
                        },
                        {
                            "className": "dt-left",
                            data: "Anio"
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

    //FUNCION DE GUARDAR 
    function GuardarCentros(callback) {
        var datos = {};
        datos.Id = $("[id*=id_inst]").val();
        datos.Anio = $("[id*=txt_Anio]").val();
       
        if ($("[id*=txt_totM]").val() == "") {
            datos.Total_Matricula = $("[id*=txt_totM]").val(0);
        }
        else {
            datos.Total_Matricula = $("[id*=txt_totM]").val();
        }        
        datos.Sace = $("[id*=txt_codigo]").val();
        datos.Nivel = $("[id*=nivel]").val();
        datos.Fecha_Instalacion = $('.datepicker').val();
        datos.Operador = $("[id*=txt_oper]").val();
        datos.Codigo = $("[id*=Tex_Cod]").val();
        datos.Medio_Conexion = $("[id*=medio]").val();
        datos.Tipo_Cliente = $("[id*=txt_tecno]").val();
        if ($("[id*=txt_anchoBan]").val() == "") {
            datos.Ancho_Banda_Entregado = $("[id*=txt_anchoBan]").val(0);
        }
        else {
            datos.Ancho_Banda_Entregado = $("[id*=txt_anchoBan]").val();
        }
        datos.Conectado = $("[id*=Conectado]").val();        
        datos.Estatus = $("[id*=estatus]").val();
        datos.Observaciones = $("[id*=txt_obser]").val();       

        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/GuardarCentros",
            data: JSON.stringify({ 'datosCentros': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "1") {
                    
                   
                    Materialize.toast('Datos Ingresados Correctamente.', 7000, 'rounded');
                  
                  
                }
                else {
                    Materialize.toast('No se ingresaron los datos, verifique que el Codigo sace no exita en el Año ingresado. ' + response.d + '', 7000, 'red', 'rounded');
                }
            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            },
            error: function (response, xhr) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            }
            
        });

        setTimeout(function () { callback(); },200)
    }

    //Funcion Actualizar todos los datos 
    function Update() {
        var datos = {};
        datos.Id = $("[id*=id]").val();        
        datos.Total_Matricula = $("[id*=txt_totM]").val();       
        datos.Nivel = $("[id*=nivel]").val();
        datos.Fecha_Instalacion = $('.datepicker').val();
        datos.Operador = $("[id*=txt_oper]").val();
        datos.Codigo = $("[id*=Tex_Cod]").val();
        datos.Medio_Conexion = $("[id*=medio]").val();
        datos.Tipo_Cliente = $("[id*=txt_tecno]").val();
        if ($("[id*=txt_anchoBan]").val() == "") {
            datos.Ancho_Banda_Entregado = $("[id*=txt_anchoBan]").val(0);
        }
        else {
            datos.Ancho_Banda_Entregado = $("[id*=txt_anchoBan]").val();
        }
        datos.Conectado = $("[id*=Conectado]").val();       
        datos.Estatus = $("[id*=estatus]").val();
        datos.Observaciones = $("[id*=txt_obser]").val();
        datos.Anio = $("[id*=txt_Anio]").val();       
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/UpdateDatosCE",
            data: JSON.stringify({ 'datosCE': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "1") {
                    Materialize.toast('Datos Actualizados Correctamente.', 6000, 'rounded');
                }
                else {
                    Materialize.toast('No se actualizaron los datos. verifique que el Codigo sace no exita en el Año ingresado.' + response.d + '', 6000, 'red');
                }
            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente. ', 4000, 'rounded');
            },
            error: function (xhr) {
                ;
                console.log(xhr.status);
                var jsonResponse = JSON.parse(xhr.responseText);
                console.log(jsonResponse);
            }
        });
    }

    // Boton que llama la funcion guardar y actualizar 
    $('.btn_GuardarCE1').click(function (e) {
       
        e.preventDefault();

       
        if ($("[id*=txt_totM]").val() == "") {
            Materialize.toast('ERROR, Ingrese el total de Matricula', 6000, 'rounded');
            return false;
        }
       
        if ($("[id*=nivel]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Nivel Educativo', 6000, 'rounded');
            return false;
        }
        if ($("[id*=txt_oper]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Nombre del Operador', 6000, 'rounded');

            return false;
        }
        if ($("[id*=Tex_Cod]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Codigo del Operador', 6000, 'rounded');

            return false;
        }
        if ($("[id*=medio]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Medio de Conexión', 6000, 'rounded');

            return false;
        }
        if ($("[id*=Conectado]").val() == "") {
            Materialize.toast('ERROR, Seleccione Conectado Por ', 6000, 'rounded');

            return false;
        }
        if ($("[id*=estatus]").val() == "") {
            Materialize.toast('ERROR, Seleccione el Estado del Enlace', 6000, 'rounded');

            return false;
        }


        if ($("[id*=id]").val() == "") {
           
            GuardarCentros(function () {
                //tabla.destroy();
                //consultar();
                //limpiar();
                actualizar();

            });
        }

        else {
            Update();
            tabla.destroy();
            consultar();
            limpiar();
        }
       
    });

     // actualizar pagina 
    function actualizar() {
        location.reload(true);
        
    };

    //Funcion para llenar los datos en los textbox a Modificar  
    function Modificar_datos() {
        var datos = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/ModificarDatos",
            data: JSON.stringify({ 'Id_Centros': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                d: data.d
                $('select').material_select('destroy');                
                $("[id*=txt_totM]").val(data.d[0].Total_Matricula);                
                $("[id*=nivel]").val(data.d[0].Nivel);
                $("[id*=fecha]").val(data.d[0].Fecha_Instalacion);
                $("[id*=txt_oper]").val(data.d[0].Operador);
                $("[id*=Tex_Cod]").val(data.d[0].Codigo);
                $("[id*=medio]").val(data.d[0].Medio_conexion);
                $("[id*=txt_tecno]").val(data.d[0].Tipo_Cliente);
                $("[id*=txt_anchoBan]").val(data.d[0].Ancho_Banda_Entregado);
                $("[id*=Conectado]").val(data.d[0].Conectado);                
                $("[id*=estatus]").val(data.d[0].Estatus);
                $("[id*=txt_obser]").val(data.d[0].Observaciones);
                $("[id*=txt_Anio]").val(data.d[0].Anio);
                $('select').material_select();

            },
            error: function (data) {
                Materialize.toast('Error al cargar los datos. ' + data.d + '', 4000, 'rounded');
            }

        })
    }

    // Boton actualizar llama la funcion que muestra los datos a modificar
    $(document).on("click", '.btn_Actualizar', function (e) {
        e.preventDefault();
        var row = $(this).parent().parent()[0];
        var data = tabla.row($(this).parents("tr")).data();
        //$('select').material_select('destroy');
        var Id_Centros_Educativos = $("[id*=id]").val(data.Id);
        $("[id*=txt_centro]").val(data.Centro);
        $("[id*=txt_codigo]").val(data.Sace);
        Modificar_datos();
    });

    //Boton que llama las Funciones para cambiar el estado Conectado/Desconectado 
    $(document).on("click", '.btn_Estado', function (e) {
        e.preventDefault();
        //var row = $(this).parent().parent()[0];
        var data = tabla.row($(this).parents("tr")).data();
        var Id_Centros_Educativos = $("[id*=id]").val(data.Id);
        console.log(data);
        $.confirm({
            title: 'Confirmar!',
            content: '¿Esta Seguro que desea cambiar el estado Conectado/Desconectado?',
            buttons: {
                Aceptar: function () {
                    if (data.Estatus == 'Desconectado') {
                        ActivarEstado();
                        tabla.destroy();
                        consultar();

                    }
                    else {
                        DesactivarEstado();
                        tabla.destroy();
                        consultar();
                    }

                },
                Cancelar: function () {

                }

            }
        });

    });

    // Funcion Para cambiar el estado a Conectado
    function ActivarEstado() {
        var datos = {};
        datos.Id = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/ActivarEstado",
            data: JSON.stringify({ 'datosCE': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "True") {
                    Materialize.toast('Estado Conectado.', 6000, 'rounded');
                }
                else {
                    Materialize.toast('No se Conecto el Estado. ' + response.d + '', 6000, 'red');
                }
            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente. ', 6000, 'rounded');
            },
            error: function (xhr) {
                ;
                console.log(xhr.status);
                var jsonResponse = JSON.parse(xhr.responseText);
                console.log(jsonResponse);
            }
        });
    }

    // Funcion Para cambiar el estado a Desconectado
    function DesactivarEstado() {
        var datos = {};
        datos.Id = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/DesactivarEstado",
            data: JSON.stringify({ 'datosCE': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "True") {
                    Materialize.toast('Estado Desconectado.', 6000, 'rounded');
                }
                else {
                    Materialize.toast('No se Conecto el Estado. ' + response.d + '', 6000, 'red');
                }
            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente. ', 6000, 'rounded');
            },
            error: function (xhr) {
                ;
                console.log(xhr.status);
                var jsonResponse = JSON.parse(xhr.responseText);
                console.log(jsonResponse);
            }
        });
    }

    // Funcion Limpiar los campos
    var limpiar = function () {
        $('select').material_select('destroy');
        $("[id*=id]").val("");
        $("[id*=txt_centro]").val("");
        $("[id*=txt_codigo]").val("");       
        $("[id*=txt_totM]").val("");              
        $("[id*=nivel]").val("");
        $("[id*=fecha]").val("");       
        $("[id*=medio]").val("");
        $("[id*=txt_anchoBan]").val("");
        $("[id*=txt_oper]").val("");
        $("[id*=Tex_Cod]").val("");
        $("[id*=estatus]").val("");
        $("[id*=txt_obser]").val("");
        $("[id*=txt_Anio]").val("");
        $("[id*=txt_tecno]").val("");        
        $("[id*=Conectado]").val("");       
        $('select').material_select();
        Materialize.updateTextFields();
    }

    // Boton para cancelar 
    $('#btn_CancelarCE').click(function (e) {
        limpiar();
        actualizar()
    })

    //Funcion para cargar el Drop para Departamento
    function ObtenerDatosDrop() {
        var dropCatalogo = {};
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/ObtenerDatosDrop",
            data: JSON.stringify({ 'dropInciso': dropCatalogo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var depto = $("[id*=DDL_depto]");
                $.each(r.d, function () {
                    depto.append($("<option></option>").val(this['Value']).html(this['Text']));
                });
                $('select').material_select('destroy');
                $('select').material_select();

            }
        });
    }

    // Funcion Change de departamento que llama la funcion para llenar el drop municipio
    $('.DDL_departamento').change(
        function (e) {
            e.preventDefault();
            ObtenerDatosDropM();
            $('select').material_select('destroy');
            $('.DDL_MUNICIPIO option').remove();
            $('select').material_select();
        });
    //Funcion para cargar el Drop para Municipio
    function ObtenerDatosDropM() {
        var dropCatalogo = $("[id*=DDL_depto]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/ObtenerDatosDropM",
            data: JSON.stringify({ 'dropInciso': dropCatalogo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var depto = $("[id*=Ddl_MUNI]");
                $.each(r.d, function () {
                    depto.append($("<option></option>").val(this['Value']).html(this['Text']));
                });
                $('select').material_select();
            }
        });
    }

    //Funcion para cargar los operadores en la modal
    function ObtenerDatosOperador() {
        drop = document.getElementById("id_inst").value;       
        $.ajax({
            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/ObtenerDatosOperador",
            data: JSON.stringify({ 'dropInciso': drop }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {

                tabla = $("#dataModal").DataTable({
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

    //Funcion para cargar los datos de solicitudes en la modal
    function ObtenerDatos_Solicitudes() {

        $.ajax({

            type: "POST",
            url: "/vistas/CentrosEducativos.aspx/modal_solicitudes",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {

                tabla = $("#datossolic").DataTable({
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
                    
                    ],
                });
            }
        });
    };

    // boton que muestra los datos de la solicitud en controles
    $(document).on('click', '.btn_Datos_solic', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=txt_codigo]").val(data.Código_SACE);
        $("[id*=id_inst]").val(data.Id);
        $("[id*=txt_centro]").val(data.Nombre_Institución);      
        $('select').material_select();
    });

    //Boton que llama la funcion para la modal de solicitdes
    $('.agrega').click(function (e) {
        e.preventDefault();
        if ($("[id*=txt_Anio]").val() == "") {
            Materialize.toast('Debe  Ingresar el Año', 2000, 'rounded');
            return false;
        }
        else {
            $('.modal').modal({
                dismissible: true,
                ready: function () {
                    ObtenerDatos_Solicitudes();
                },
                complete: function () {
                    tabla.destroy();
                    $('.btn_Actualizar').hide();
                    $('.btn_Estado').hide();
                }
            });
        }
    });

    //Boton que llama la funcion para la modal de Operadores
    $('.agregar').click(function (e) {
        e.preventDefault();       
        $('.modal').modal({
            dismissible: true,
            ready: function () {
                ObtenerDatosOperador();
            },
            complete: function () {
                tabla.destroy();
                $('.btn_Actualizar').hide();
                $('.btn_Estado').hide();
            }
        });
    });

    //Boton para agregar el operador seleccionado a los textbox
    $(document).on("click", '.btn_AgregarDatos', function (e) {
        e.preventDefault();
        var datos = tabla.row($(this).parents("tr")).data();
        $("[id*=Tex_Cod]").val(datos.Value);
        $("[id*=txt_oper]").val(datos.Text);
    });

    //Funcion que Agrega Cliente Reportado por Tecnologia dependiento del Medio de Conexion Seleccionado
    $('.DDL_Medio').change(
        function (e) {
            var datos = {};
            if ($("[id*= medio]").val() == 'Cable Módem') {
                datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Alambrico");
            }
            else
                if ($("[id*= medio]").val() == 'Cable Coaxial') {
                    datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Alambrico");
                }
                else
                    if ($("[id*= medio]").val() == 'Fibra Óptica') {
                        datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Alambrico");
                    }
                    else
                        if ($("[id*= medio]").val() == 'ADSL') {
                            datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Alambrico");
                        }
                        else
                            if ($("[id*= medio]").val() == 'WIMAX') {
                                datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Alambrico");
                            }
                            else
                                if ($("[id*= medio]").val() == 'Otros Alambrico') {
                                    datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Alambrico");
                                }
                                else
                                    if ($("[id*= medio]").val() == 'Estaciones Bases') {
                                        datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Inalambrico");
                                    }
                                    else
                                        if ($("[id*= medio]").val() == 'Satelital') {
                                            datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Inalambrico");
                                        }
                                        else
                                            if ($("[id*= medio]").val() == 'Otros Inalambrico') {
                                                datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Fijo Inalambrico");
                                            }
                                            else
                                                if ($("[id*= medio]").val() == '2G') {
                                                    datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Movil");
                                                }
                                                else
                                                    if ($("[id*= medio]").val() == '3G') {
                                                        datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Movil");
                                                    }
                                                    else
                                                        if ($("[id*= medio]").val() == '4G') {
                                                            datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Movil");
                                                        }
                                                        else
                                                            if ($("[id*= medio]").val() == 'Otros Movil') {
                                                                datos.Tipo_Cliente = $("[id*=txt_tecno]").val("Internet Movil");
                                                            }
        })

    //solo numeros
    $(function () {
        $('.validanumericos').keypress(function (e) {
            if (isNaN(this.value + String.fromCharCode(e.charCode)))
                return false;
        })

    });

    //funcion para lolgitud
    function long(string) {

        var out = '';
        var filtro = '-.1234567890';//Caracteres validos
        //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos 
        for (var i = 0; i < string.length; i++)
            if (filtro.indexOf(string.charAt(i)) != -1)
                //Se añaden a la salida los caracteres validos
                out += string.charAt(i);
        //Retornar valor filtrado
        return out;
    };

    $(function () {
        $('.Numeros').keypress(function () {//Solo numeros
            this.value = long(this.value);
            return this.value;
        });
    });

    //funcion solo letras MAYUS Y NUMEROS
    function SACE(string) {//solo letras y numeros

        var out = '';
        //Se añaden las letras validas
        var filtro = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';//Caracteres validos

        for (var i = 0; i < string.length; i++)
            if (filtro.indexOf(string.charAt(i)) != -1)
                out += string.charAt(i);
        return out;


    };

    $(function () {
        $(".mayus").keypress(function () {
            this.value = Mayusculas(this.value);
            return this.value;

        });

        $(".sace").keypress(function () {
            this.value = SACE(this.value);
            return this.value
        });

    });

    //convertir a mayusculas
    function Mayusculas(tx) {
        //Retornar valor convertido a mayusculas
        return tx.toUpperCase();
    };

    //solo texto y espacios
    $(function () {
        $(".letras").keypress(function (key) {
            //window.console.log(key.charCode)
            if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
                && (key.charCode < 65 || key.charCode > 90) //letras minusculas
                && (key.charCode != 45) //retroceso
                && (key.charCode != 241) //ñ
                && (key.charCode != 209) //Ñ
                && (key.charCode != 32) //espacio
                && (key.charCode != 225) //á
                && (key.charCode != 233) //é
                && (key.charCode != 237) //í
                && (key.charCode != 243) //ó
                && (key.charCode != 250) //ú
                && (key.charCode != 193) //Á
                && (key.charCode != 201) //É
                && (key.charCode != 205) //Í
                && (key.charCode != 211) //Ó
                && (key.charCode != 218) //Ú

            )

                return false;

        })
        $(".mayus").keypress(function () {
            this.value = Mayusculas(this.value);
            return this.value;

        });
    });

})