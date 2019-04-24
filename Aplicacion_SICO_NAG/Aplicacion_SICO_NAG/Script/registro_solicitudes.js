var tabla;
var data;
var fecha;
var row;
var cod_lab;
var cod_solic;
var cod_encar;
var cod_cont;
var datos;


$(document).ready(function () {
    $('select').material_select();
    $('.tooltipped').tooltip();
    $('input#input_text, textarea#textarea1').characterCounter();
    consultar();   
    //agregar datos deptos
    $(function () {
        $.ajax({
            type: "Post",
            url: "/vistas/Registro_solicitudes.aspx/ObtenerDepartamentos",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var datos = JSON.parse(JSON.stringify(msg.d));

                $(datos).each(function () {
                    var option = $(document.createElement('option'));

                    option.text(this.Text);
                    option.val(this.Value);

                    $("#depto").append(option);
                });

            },
            error: function (msg) {
                Materialize.toast('Error', 4000, 'rounded');
            },
        });
    });
    
    //  format: 'yyyy/mmm/dd' ,             
    $('#fech_recib').pickadate({
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

    //funcion para decodificar imagen
    function encodeImageFileAsURL() {

        var filesSelected = document.getElementById("file").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64
                $("[id*=binario]").val(srcData);
                
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    };   

    //funcion para vizualizar solo imagenes
    $("#file").on('change', function () {        
        var countFiles = $(this)[0].files.length;
        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf('.')+1).toLowerCase();       
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {            
            if (typeof (FileReader) != "undefined") {                
                //loop for each file selected for uploaded.
                for (var i = 0; i < countFiles; i++) {
                    encodeImageFileAsURL();
                }
            } else {
                Materialize.toast("No soporta archivos de lectura.", 2000, 'rounded');
            }
        } else {
            //$("[id*=binario]").val("");
            Materialize.toast("Por favor seleccione una imagen", 2000, 'rounded');            
            return false;
        }
    });

    // agregar datos de la tabla institucion
    function Agregarinstitucion(callback) {
        var datosInstitucion = {};
        datosInstitucion.Cod_sace = $("[id*=cod_sace]").val();
        datosInstitucion.Nom_inst = $("[id*=nom_inst]").val();      
        datosInstitucion.Tip_inst = $("[id*=tip_inst]").val();
        datosInstitucion.Email_inst = $("[id*=email]").val();
        datosInstitucion.Cod_dept = $("[id*=depto]").val();
        datosInstitucion.cod_muni = $("[id*=municipio]").val();
        datosInstitucion.Direc_inst = $("[id*=direccion]").val();
        datosInstitucion.latitud_inst = $("[id*=Latitud]").val();
        datosInstitucion.longitud_inst = $("[id*=Longitud]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Agregarinstitucion",
                data: JSON.stringify({ 'datos': datosInstitucion }),
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
        setTimeout(function () { callback(); }, 10);
        return true;
    };

    //agregar a la base datos delos encargados 
    function Agregarencargado_uno(callback) {
        var datosencargado = {};
        datosencargado.Nom_encar = $("[id*=nom_encarg_uno]").val();
        datosencargado.Ocupacion_encar = $("[id*=ocu_encar_uno]").val();

       // datosencargado.Tel_movil_encar = $("[id*=tel_encarg_movil_uno]").val();
        if ($("[id*=tel_encarg_movil_uno]").val() == "") {
            datosencargado.Tel_movil_encar = $("[id*=tel_encarg_movil_uno]").val(0);
        }
        else {
            datosencargado.Tel_movil_encar = $("[id*=tel_encarg_movil_uno]").val();
        }
        //datosencargado.Tel_fijo_encar = $("[id*=tel_encarg_uno]").val();
        if ($("[id*=tel_encarg_uno]").val() == "") {
            datosencargado.Tel_fijo_encar = $("[id*=tel_encarg_uno]").val(0);
        }
        else {
            datosencargado.Tel_fijo_encar = $("[id*=tel_encarg_uno]").val();
        }
        datosencargado.Email_encar = $("[id*=email_uno]").val();
        datosencargado.Nom_encar_dos = $("[id*=nom_encarg_dos]").val();
        datosencargado.Ocupacion_encar_dos = $("[id*=ocu_encar_dos]").val();
        //datosencargado.Tel_movil_encar_dos = $("[id*=tel_encarg_movil_dos]").val();
        if ($("[id*=tel_encarg_movil_dos]").val() == "") {
            datosencargado.Tel_movil_encar_dos = $("[id*=tel_encarg_movil_dos]").val(0);
        }
        else {
            datosencargado.Tel_movil_encar_dos = $("[id*=tel_encarg_movil_dos]").val();
        }
        //datosencargado.Tel_fijo_encar_dos = $("[id*=tel_encarg_dos]").val();
        if ($("[id*=tel_encarg_dos]").val() == "") {
            datosencargado.Tel_fijo_encar_dos = $("[id*=tel_encarg_dos]").val(0);
        }
        else {
            datosencargado.Tel_fijo_encar_dos = $("[id*=tel_encarg_dos]").val();
        }
        datosencargado.Email_encar_dos = $("[id*=email_dos]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Agregarencargados_uno",
                data: JSON.stringify({ 'datos_uno': datosencargado }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                   // Materialize.toast('Datos insertados correctamente', 2000, 'rounded');

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 2000, 'rounded');
                    //console.log(response.d);
                }
            });
        });
        setTimeout(function () { callback(); }, 20);
        return true;
    };

    //agregar a la base los datos del contacto inmediato
    function Agregarcontacto_in(callback) {
        var datosContac_in = {};
        datosContac_in.nom_cont = $("[id*=nom_contac]").val();
        //datosContac_in.tel_movil_cont = $("[id*=tel_contac_movil]").val();
        if ($("[id*=tel_contac_movil]").val() == "") {
            datosContac_in.tel_movil_cont = $("[id*=tel_contac_movil]").val(0);
        }
        else {
            datosContac_in.tel_movil_cont = $("[id*=tel_contac_movil]").val();
        }
        //datosContac_in.tel_fijo_cont = $("[id*=tel_contac]").val();
        if ($("[id*=tel_contac]").val() == "") {
            datosContac_in.tel_fijo_cont = $("[id*=tel_contac]").val(0);
        }
        else {
            datosContac_in.tel_fijo_cont = $("[id*=tel_contac]").val();
        }
        datosContac_in.ocu_cont = $("[id*=ocu_contac]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Agregar_contacto",
                data: JSON.stringify({ 'datos_CONT': datosContac_in }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos insertados correctamente', 4000, 'rounded');

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    //console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 30);
        return true;
    };
  
    //agregar a la base los datos de la solicitud
    function Agregarsolicitud(callback) {
        fecha = document.getElementById("fech_recib").value;
        var datosSolicitud = {};
        datosSolicitud.fin_solic = $("[id*=fin_solic]").val();
        datosSolicitud.est_solic = $("[id*=est_solic]").val();
        datosSolicitud.fech_recib = fecha;
        datosSolicitud.soli_escan = $("[id*=binario]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Agregar_Solicitud",
                data: JSON.stringify({ 'datos_SOLI': datosSolicitud }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                   // Materialize.toast('Datos insertados correctamente', 4000, 'rounded');

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                   // console.log(response.d)
                }

            });
        });
        setTimeout(function () { callback(); }, 40);
        //return true;
    };

    //agregar a la base los datos de los laboratorios
    function Agregar_laboratorio(callback) {
        var datos_laboratorio = {};
        datos_laboratorio.energia_electrica = $("[id*=ener_electrica]").val();
        datos_laboratorio.red_lab = $("[id*=Red_lab]").val();
        datos_laboratorio.tipo_re = $("[id*=tip_red]").val();       
        if ($("[id*=cant_lab]").val() == "") {
            datos_laboratorio.cant_lab = $("[id*=cant_lab]").val(0);
        }
        else {
            datos_laboratorio.cant_lab = $("[id*=cant_lab]").val();
        }
      //  datos_laboratorio.num_pc_buenas = $("[id*=pc_buenas]").val();
        if ($("[id*=pc_buenas]").val() == "") {
            datos_laboratorio.num_pc_buenas = $("[id*=pc_buenas]").val(0);
        }
        else {
            datos_laboratorio.num_pc_buenas = $("[id*=pc_buenas]").val();
        }
       // datos_laboratorio.num_pc_malas = $("[id*=pc_malas]").val();
        if ($("[id*=pc_malas]").val() == "") {
            datos_laboratorio.num_pc_malas = $("[id*=pc_malas]").val(0);
        }
        else {
            datos_laboratorio.num_pc_malas = $("[id*=pc_malas]").val();
        }
        datos_laboratorio.docente_inf = $("[id*=doc_inf]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Agregar_Laboratorio",
                data: JSON.stringify({ 'datos_lab': datos_laboratorio }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos insertados correcatamente', 4000, 'rounded');
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    console.log(response.d)
                }
            });
        });
        setTimeout(function () { callback(); }, 50);
        return true;
    };

    //funcion controladora de funciones insertar
    function Guardar_datos(callback) {
       
            Agregarinstitucion(function () {
                Agregarencargado_uno(function () {
                    Agregarcontacto_in(function () {
                        Agregar_laboratorio(function () {
                            Agregarsolicitud(function () {
                                Materialize.toast('Datos Guardados correctamente', 100, 'rounded');
                                tabla.destroy();
                                consultar();
                                limpiar();
                            });
                        });
                    });
                });
            });
            setTimeout(function () { callback(); }, 200);
       
    };

    //funcion controladora de funciones insertar
    function Actualizar_datos() {
        $(function () {
            $.confirm({
                title: 'Confirmar!',
                content: '¿Esta Seguro que desea actualizar los datos?',
                buttons: {
                    Aceptar: function () {                       
                        actualizar_institucion(function () {
                            Actualizar_encargados(function () {
                                actualizar_contacto(function () { 
                                    Actualizar_laboratorio(function () {
                                        actualizar_solicitud(function () {
                                            Materialize.toast('Datos Actualizados correctamente', 500, 'rounded');
                                            tabla.destroy();
                                            consultar();
                                            limpiar();
                                        });
                                    });
                                });
                            });
                        });

                    },
                    Cancelar: function () {
                    },
                    
                }
                   
            });
          
        });
          
    };

    //agregar datos de municipios
    function agregarmuni() {
        var dropCatalogo = $("[id*=depto]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Registro_Solicitudes.aspx/ObtenerMunicipios",
          
          data: JSON.stringify({ 'codigo': dropCatalogo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                var depto = $("[id*=municipio]");
                $.each(r.d, function () {
                    depto.append($("<option></option>").val(this['Value']).html(this['Text']));
                });
                $('select').material_select();
            }
        });
    }

    // Funcion Change de departamento que llama la funcion para llenar el drop municipio
    $('#depto').change(
        function (e) {
            e.preventDefault();
            agregarmuni();
            $('select').material_select('destroy');
            $('#municipio option').remove();
            $('select').material_select();
        });

    //llenar datos de las tablas
    function consultar() {
        $.ajax({
            type: "POST",
            url: "/vistas/Registro_Solicitudes.aspx/agregar_tabla",
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
                            "targets": [2],
                            "visible": false,
                            "searchable": false,
                        },
                        {
                            "targets": [3],
                            "visible": false,
                            "searchable": false,
                        },
                        {
                            "targets": [4],
                            "visible": false,
                            "searchable": false,
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
                            title: 'Reporte de Solicitudes',
                            exportOptions: {
                                columns: [':visible']
                            }

                        },
                        {
                            extend: 'excelHtml5',
                            title: 'Reporte de Solicitudes',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            download: 'open',
                            title: 'Reporte de Solicitudes',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Imprimir',
                            title: 'Reporte de Solicitudes',
                            exportOptions: {
                                columns: [':visible']
                            }
                        }
                    ],
                    data: response.d,

                    columns: [
                        {
                            defaultContent: '<button  title="Actualizar" class=" btn  waves-effect waves-light btn_Actualizar blue lighten-2" type="submit" style="position: static"><i class="material-icons">update</i></button>&nbsp;' +
                                '<button  title="Cambiar Estado" class=" btn  waves-effect waves-light btn_Estado  red" type="submit" style="position: static"><i class="material-icons">offline_pin</i></button>'
                        },
                        {
                            "className": "dt-center",
                            data: "Id"
                        },
                        {
                            "className": "dt-left",
                            data: "Id_cont"
                        },
                        {
                            "className": "dt-left",
                            data: "Id_encar"
                        },
                        {
                            "className": "dt-left",
                            data: "Id_lab"
                        },
                        {
                            "className": "dt-left",
                            data: "Id_soli"
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
                            data: "Correo_Electrónico"
                        },
                        {
                            "className": "dt-left",
                            data: "Departamento"
                        },
                        {
                            "className": "dt-left",
                            data: "Municipio"
                        },
                        {
                            "className": "dt-left",
                            data: "Dirección_Exacta"
                        },
                        {
                            "className": "dt-left",
                            data: "Latitud"
                        },
                        {
                            "className": "dt-left",
                            data: "Longitud"
                        },
                        {
                            "className": "dt-left",
                            data: "Estado"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre_Contacto"
                        },
                        {
                            "className": "dt-left",
                            data: "Ocupación_Contacto"
                        },
                        {
                            "className": "dt-left",
                            data: "Tel_fijo"
                        },
                        {
                            "className": "dt-left",
                            data: "Tel_Móvil"
                        },
                        {
                            "className": "dt-left",
                            data: "Finalidad_Solicitud"
                        },
                        {
                            "className": "dt-left",
                            data: "Estado_Solicitud"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre_Encargado_1"
                        },
                        {
                            "className": "dt-left",
                            data: "Correo_Electrónico_1"
                        },
                        {
                            "className": "dt-left",
                            data: "ocupacion_1"
                        },
                        {
                            "className": "dt-left",
                            data: "Tel_fijo_1"
                        },
                        {
                            "className": "dt-left",
                            data: "tel_Móvil_1"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre_Encargado_2"
                        },
                        {
                            "className": "dt-left",
                            data: "Correo_Electrónico_2"
                        },
                        {
                            "className": "dt-left",
                            data: "ocupacion_2"
                        },
                        {
                            "className": "dt-left",
                            data: "Tel_fijo_2"
                        },
                        {
                            "className": "dt-left",
                            data: "Tel_Móvil_2"
                        },
                        {
                            "className": "dt-left",
                            data: "Energía_Eléctrica"
                        },
                        {
                            "className": "dt-left",
                            data: "Red_Interna"
                        },
                        {
                            "className": "dt-left",
                            data: "Cant_Laboratorios"
                        },
                        {
                            "className": "dt-left",
                            data: "Pc_Buenas"
                        },
                        {
                            "className": "dt-left",
                            data: "Pc_Malas"
                        },
                        {
                            "className": "dt-left",
                            data: "Tipo_Red"
                        },
                        {
                            "className": "dt-left",
                            data: "Docente"
                        }

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
        var datos = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Registro_Solicitudes.aspx/ModificarDatos",
            data: JSON.stringify({ 'cod_inst': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                d: data.d
                $('select').material_select('destroy');
                $("[id*=id_cont]").val(data.d[0].Id_cont);
                $("[id*=id_lab]").val(data.d[0].Id_lab);
                $("[id*=id_encar]").val(data.d[0].Id_encar);
                $("[id*=id_soli]").val(data.d[0].Id_soli);
                $("[id*=nom_inst]").val(data.d[0].Nombre_Institución);
                $("[id*=tip_inst]").val(data.d[0].Tipo_Institución);
                $("[id*=depto]").append('<option value ="' + (data.d[0].CodDEP) + '" selected="selected" class="temp">' + (data.d[0].Departamento) + '</option>');
                $("[id*=municipio]").append('<option value ="' + (data.d[0].CodMuni) + '" selected="selected" class="temp">' + (data.d[0].Municipio) + '</option>');
                $("[id*=cod_sace]").val(data.d[0].Código_SACE);
                $("[id*=email]").val(data.d[0].Correo_Electrónico);
                $("[id*=direccion]").val(data.d[0].Dirección_Exacta);
                $("[id*=Latitud]").val(data.d[0].Latitud);
                $("[id*=Longitud]").val(data.d[0].Longitud);
                $("[id*=nom_contac]").val(data.d[0].Nombre_Contacto);
                $("[id*=ocu_contac]").val(data.d[0].Ocupación_Contacto);
                $("[id*=tel_contac]").val(data.d[0].Tel_fijo);
                $("[id*=tel_contac_movil]").val(data.d[0].Tel_Móvil);
                $("[id*=fin_solic]").val(data.d[0].Finalidad_Solicitud);
                $("[id*=est_solic]").val(data.d[0].Estado_Solicitud);
                $("[id*=nom_encarg_uno]").val(data.d[0].Nombre_Encargado_1);
                $("[id*=email_uno]").val(data.d[0].Correo_Electrónico_1);
                $("[id*=ocu_encar_uno]").val(data.d[0].ocupacion_1);
                $("[id*=tel_encarg_uno]").val(data.d[0].Tel_fijo_1);
                $("[id*=tel_encarg_movil_uno]").val(data.d[0].tel_Móvil_1);
                $("[id*=nom_encarg_dos]").val(data.d[0].Nombre_Encargado_2);
                $("[id*=email_dos]").val(data.d[0].Correo_Electrónico_2);
                $("[id*=ocu_encar_dos]").val(data.d[0].ocupacion_2);
                $("[id*=tel_encarg_dos]").val(data.d[0].Tel_fijo_2);
                $("[id*=tel_encarg_movil_dos]").val(data.d[0].Tel_Móvil_2);
                $("[id*=ener_electrica]").val(data.d[0].Energía_Eléctrica);
                $("[id*=Red_lab]").val(data.d[0].Red_Interna);
                $("[id*=cant_lab]").val(data.d[0].Cant_Laboratorios);
                $("[id*=pc_buenas]").val(data.d[0].Pc_Buenas);
                $("[id*=pc_malas]").val(data.d[0].Pc_Malas);
                $("[id*=tip_red]").val(data.d[0].Tipo_Red);
                $("[id*=doc_inf]").val(data.d[0].Docente);
                $('select').material_select();
            },
            error: function (data) {
                Materialize.toast('Error al cargar los datos. ' + data.d + '', 4000, 'rounded');
            }

        })
    };

    //funcion para guardar o actualizar los datos
    $('#btn_insertar').click(function (e) {
        e.preventDefault();

        if ($("[id*=nom_inst]").val() == "") {
            Materialize.toast('ERROR, Ingrese el nombre de la institucion', 6000, 'rounded');
            return false;
        }
        if ($("[id*=tip_inst]").val() == "") {
            Materialize.toast('ERROR, Seleccione el Tipo de Institucion ', 6000, 'rounded');
            return false;
        }

       
        if ($("[id*=depto]").val() == "") {
            Materialize.toast('ERROR,Seleccioneel Departamento y Municipio', 6000, 'rounded');
            return false;
        }


        if ($("[id*=nom_contac]").val() == "") {
            Materialize.toast('ERROR, Ingrese el nombre del contacto ', 6000, 'rounded');
            return false;
        }

        if ($("[id*=fin_solic]").val() == "") {
            Materialize.toast('ERROR, Ingrese la finalidad de la solicitud', 6000, 'rounded');
            return false;
        }
        if ($("[id*=nom_encarg_uno]").val() == "") {
            Materialize.toast('ERROR, Ingrese el nombre del Director', 6000, 'rounded');
            return false;
        }
         
        if ($("[id*=id]").val() == "") {
            
            Guardar_datos(function () { });
        }
        else {
            Actualizar_datos();

        }
        $('select').material_select();
    });

    //clic al dar en el btn  cancenlar 
    $('#btn_cancelar').click(function (e) {
        e.preventDefault();
        limpiar();
        actualizar();       
    });

    //abrir el modal para visualizar las solicitudes
    $('.agrega').click(function (e) {
        e.preventDefault();
        $('.modal').modal({
            dismissible: true,
            ready: function () {
                tabla.destroy();
                Obtenerfotos_Solicitudes();
            },
            complete: function () { tabla.destroy(); consultar(); }

        })
    });

   // obtener la imagen de la solicitud
    $('#buscar').click(function (e) {
        e.preventDefault();
        tabla.destroy();
        Obtenerfotos_Solicitudes();

    });

    //obtener imagenes de las solicitudes escaneadas
    function Obtenerfotos_Solicitudes() {

        var datos = $("[id*=txt_nombre_inst]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Registro_Solicitudes.aspx/modal_fotos",
            data: JSON.stringify({ 'nombre': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {

                tabla = $("#dataModal").DataTable({
                    "scrollX": true,
                    "scrollY": 400,
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
                    data: r.d,

                    columns: [


                        {
                           
                            "className": "dt-left",
                        data: "Solic_escan"
                        },
                    ],
                });
            }
        });
    }

     //actualizar pagina 
    function actualizar() {
        location.reload(true);
    };

    //funcion para mandar la imagen al archivo file
    $(document).on('click', '.btn_Actualizar', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        var cod_inst = $("[id*=id]").val(data.Id);

        if (data.Tipo_Institución != "Centros Educativos") {
            document.getElementById("cod_sace").style.display = "none";
            document.getElementById("inf_tecn").style.display = "none";
        } else {
            document.getElementById("cod_sace").style.display = "block";
            document.getElementById("inf_tecn").style.display = "block";
        }
        Modificar_datos();
    });

    //funcion para cambiar el estado de activo o inactivo
    $(document).on("click", '.btn_Estado', function (e) {
        e.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        var cod_inst = $("[id*=id]").val(data.Id);
        console.log(data);
        $.confirm({
            title: 'Confirmar!',
            content: '¿Esta Seguro que desea cambiar el estado Activo/Inactivo?',
            buttons: {
                Aceptar: function () {
                    if (data.Estado == 'Inactivo') {
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

    //ocultar el cod_sace y demas controles si no es centro educativo
    $(function () {
        $("#tip_inst").change(function () {
            var valor = document.getElementById("tip_inst").value;
            if (valor != "Centros Educativos") {
                document.getElementById("cod_sace").style.display = "none";
                document.getElementById("inf_tecn").style.display = "none";

            } else {
                document.getElementById("cod_sace").style.display = "block";
                document.getElementById("inf_tecn").style.display = "block";
            };
        });
    });

    // Funcion Para cambiar el estado a Activo
    function ActivarEstado() {
        var datos = {};
        datos.Id = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Registro_Solicitudes.aspx/ActivarEstado",
            data: JSON.stringify({ 'cod_inst': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "True") {
                    Materialize.toast('Estado Activo.', 6000, 'rounded');
                }
                else {
                    Materialize.toast('No se Activo el Estado. ' + response.d + '', 6000, 'red');
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
    };

    // Funcion Para cambiar el estado a Desconectado
    function DesactivarEstado() {
        var datos = {};
        datos.Id = $("[id*=id]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Registro_Solicitudes.aspx/DesactivarEstado",
            data: JSON.stringify({ 'cod_inst': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "True") {
                    Materialize.toast('Estado Inactivo.', 6000, 'rounded');
                }
                else {
                    Materialize.toast('No se Inactivo el Estado. ' + response.d + '', 6000, 'red');
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
    };

    // actualizar datos de la tabla institucion
    function actualizar_institucion(callback) {
        codigo = $("[id*=id]").val();
        var datosInstitucion = {};
        datosInstitucion.Cod_inst = codigo;
        datosInstitucion.Cod_sace = $("[id*=cod_sace]").val();
        datosInstitucion.Nom_inst = $("[id*=nom_inst]").val();
        datosInstitucion.Tip_inst = $("[id*=tip_inst]").val();
        datosInstitucion.Email_inst = $("[id*=email]").val();
        datosInstitucion.Cod_dept = $("[id*=depto]").val();
        datosInstitucion.Cod_muni = $("[id*=municipio]").val();
        datosInstitucion.Direc_inst = $("[id*=direccion]").val();
        datosInstitucion.latitud_inst = $("[id*=Latitud]").val();
        datosInstitucion.longitud_inst = $("[id*=Longitud]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Actualizarinstitucion",
                data: JSON.stringify({ 'datos': datosInstitucion }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos actualizados correctamente', 4000, 'rounded')
                    //console.log(response.d)
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 4000, 'rounded');
                    console.log(response)
                }

            });
        });
        setTimeout(function () { callback(); }, 400);
        return true;
    };

    //Actualizar datos de los encargados
    function Actualizar_encargados(callback) {
        cod_encar = $("[id*=id_encar]").val();
        var datosencargado = {};
        datosencargado.Cod_encar = cod_encar;
        datosencargado.Nom_encar = $("[id*=nom_encarg_uno]").val();
        datosencargado.Ocupacion_encar = $("[id*=ocu_encar_uno]").val();
        datosencargado.Tel_movil_encar = $("[id*=tel_encarg_movil_uno]").val();
        datosencargado.Tel_fijo_encar = $("[id*=tel_encarg_uno]").val();
        datosencargado.Email_encar = $("[id*=email_uno]").val();
        datosencargado.Nom_encar_dos = $("[id*=nom_encarg_dos]").val();
        datosencargado.Ocupacion_encar_dos = $("[id*=ocu_encar_dos]").val();
        datosencargado.Tel_movil_encar_dos = $("[id*=tel_encarg_movil_dos]").val();
        datosencargado.Tel_fijo_encar_dos = $("[id*=tel_encarg_dos]").val();
        datosencargado.Email_encar_dos = $("[id*=email_dos]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Actualizar_encargados",
                data: JSON.stringify({ 'datos_encar': datosencargado }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos actualizados correctamente', 2000, 'rounded');
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 2000, 'rounded');
                    console.log(response.d)
                }
            });
        });
        setTimeout(function () { callback(); }, 600);
        return true;
    };

    //actualizar datos de los contactos
    function actualizar_contacto(callback) {
        cod_cont = $("[id*=id_cont]").val();
        var datosContac_in = {};
        datosContac_in.cod_cont = cod_cont;
        datosContac_in.nom_cont = $("[id*=nom_contac]").val();
        datosContac_in.tel_movil_cont = $("[id*=tel_contac_movil]").val();
        datosContac_in.tel_fijo_cont = $("[id*=tel_contac]").val();
        datosContac_in.ocu_cont = $("[id*=ocu_contac]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Act_Contacto_Inme",
                data: JSON.stringify({ 'datos_cont': datosContac_in }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos actualizados correctamente', 4000, 'rounded')
                    //console.log(response.d)
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 4000, 'rounded');
                    console.log(response.d)
                }
            });
        });
        setTimeout(function () { callback(); }, 800);
        return true;
    };

    //actualizar datos de la solicitudes
    function actualizar_solicitud(callback) {
        cod_solic = $("[id*=id_soli]").val();
        var datosSolicitud = {};
        datosSolicitud.Cod_solic = cod_solic;
        datosSolicitud.fin_solic = $("[id*=fin_solic]").val();
        datosSolicitud.est_solic = $("[id*=est_solic]").val();
        //datosSolicitud.soli_escan = $("[id*=binario]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Actualizar_Solicitud",
                data: JSON.stringify({ 'datos_soli': datosSolicitud }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //Materialize.toast('Datos actualizados correctamente', 4000, 'rounded');

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 4000, 'rounded');
                    console.log(response.d)
                }
            });
        });
        setTimeout(function () { callback(); }, 1000);
        return true;
    };

    //actualizar a la base los datos de los laboratorios
    function Actualizar_laboratorio(callback) {
        cod_lab = $("[id*=id_lab]").val();
        var datos_laboratorio = {};
        datos_laboratorio.cod_lab = cod_lab;
        datos_laboratorio.energia_electrica = $("[id*=ener_electrica]").val();
        datos_laboratorio.red_lab = $("[id*=Red_lab]").val();
        datos_laboratorio.tipo_re = $("[id*=tip_red]").val();
        datos_laboratorio.cant_lab = $("[id*=cant_lab]").val();
        datos_laboratorio.num_pc_buenas = $("[id*=pc_buenas]").val();
        datos_laboratorio.num_pc_malas = $("[id*=pc_malas]").val();
        datos_laboratorio.docente_inf = $("[id*=doc_inf]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/vistas/Registro_solicitudes.aspx/Actualizar_Laboratorio",
                data: JSON.stringify({ 'datos_lab': datos_laboratorio }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser actualizados', 4000, 'rounded');
                    console.log(response.d)
                }
            });
        });
        setTimeout(function () { callback(); }, 1200);
        return true;
    };

    //funcion para limpiar los controloes
    var limpiar = function () {
        $('select').material_select('destroy');
        $("[id*=id]").val("");
        $("[id*=id_lab]").val("");
        $("[id*=id_cont]").val("");
        $("[id*=soli]").val("");
        $("[id*=id_encar]").val("");
        $("[id*=nom_inst]").val("");
        $("[id*=cod_sace]").val("");
        $('[id*=tip_inst]').val("");

        $('[id*=depto]').val;
        $('#municipio option').remove();
        $("[id*=email]").val("");
        $("[id*=direccion]").val("");
        $("[id*=Latitud]").val("");
        $("[id*=Longitud]").val("");
        $("[id*=nom_contac]").val("");
        $("[id*=ocu_contac]").val("");
        $("[id*=tel_contac]").val("");
        $("[id*=tel_contac_movil]").val("");
        $("[id*=fin_solic]").val("");
        $("[id*=est_solic]").val("");
        $("[id*=fech_recib]").val("");
        $("[id*=nom_encarg_uno]").val("");
        $("[id*=email_uno]").val("");
        $("[id*=ocu_encar_uno]").val("");
        $("[id*=tel_encarg_uno]").val("");
        $("[id*=tel_encarg_movil_uno]").val("");
        $("[id*=nom_encarg_dos]").val("");
        $("[id*=email_dos]").val("");
        $("[id*=ocu_encar_dos]").val("");
        $("[id*=tel_encarg_dos]").val("");
        $("[id*=tel_encarg_movil_dos]").val("");
        $("[id*=ener_electrica]").val("");
        $("[id*=Red_lab]").val("");
        $("[id*=cant_lab]").val("");
        $("[id*=pc_buenas]").val("");
        $("[id*=pc_malas]").val("");
        $("[id*=tip_red]").val("");
        $("[id*=doc_inf]").val("");
        $('select').material_select();
        Materialize.updateTextFields();
    };

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

});





