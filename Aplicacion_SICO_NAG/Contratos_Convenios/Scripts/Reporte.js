var tabla;
var btn;
var etiqueta;
var estado;
var index = [];
var fechas = [];
var nombres = [];
var local = [];
var conver = {};
var meses = {};
var mes = 6;

$(document).ready(function () {

   $('.tooltipped').tooltip();
   $('select').material_select();
   $('.modal').modal();


    consultar(function () { });  

    //FUNCION DE LLENAR DATATABLE
    function consultar(callback) {
        $.ajax({
            type: "POST",
            url: "/Views/ReporteContratos.aspx/seleccionar",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
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
                            "className": "dt-left",
                            data: "Descripcion"
                        },

                        

                        {
                            "className": "dt-left",
                            data: "Regis_firma"
                        },
                        //{
                        //    "className": "dt-left",
                        //    data: "Btn"
                        //},
                        {
                            "className": "dt-left",
                            data: "Fech_fin"
                        },
                        //{
                        //    defaultContent: ' <a title="Agregar Comentarios" class="btn task-cat grey darken-2 modal-trigger Comentarios" href="#modal3" ><i class="material-icons">comment</i></a>'

                        //},
                        {
                            defaultContent: ' <a title="Ver y Descargar Borrador" class="btn task-cat blue darken-2 modal-trigger ver_borrador" href="#modal1"  ><i class="material-icons">file_download</i></a>' +
                                ' <a title="Ver y Descargar Final" class= "btn task-cat blue darken-2 modal-trigger ver_final" href="#modal2" > <i class="material-icons">file_download</i></a> '
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

        //var data = response.d;

        //var dataObject = new Object();
        var rows = $("#datatable1").dataTable().fnGetNodes();
        for (var i = 0; i < rows.length; i++) {
            index.push($(rows[i]).find("td:eq(0)").html());
            fechas.push($(rows[i]).find("td:eq(5)").html());
            nombres.push($(rows[i]).find("td:eq(1)").html());
            local.push($(rows[i]).find("td:eq(3)").html());

        }

        //local = moment().format('DD/MM/YYYY');

        for (var i = 0; i < index.length; i++) {
            conver[i] = formato(fechas[i])
            var dt = new Date(moment(formato(fechas[i]), "DD/MM/YYYY"));

            meses[i] = moment(dt).subtract(mes, 'months').format('DD/MM/YYYY')

            if (((meses[i] >= local[i]) && (fechas[i] > meses[i])) && (meses[i] != "Invalid date")) {
                Materialize.toast("El convenio: " + nombres[i] + " vence en: " + fechas[i], 50000, 'red rounded');
            }

        };

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

                    tabla = $("#dataModal1").DataTable({
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

                    d: r.d;
                    var datos = r.d[0].Regis_borrador;
                    if ((datos == 'null') | (datos == ' ')) {
                        r.d[0].Regis_borrador = "<a class='descargar btn' Title='descargar' disable='true' >descargar</a>"

                    }
                },




                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser visualizados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 200)

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
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser visualizados', 4000, 'rounded');
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

    
    $(document).on("click", ".descargar", function (e) {
        e.preventDefault();
        descargarArchivo($('[id*=archivo]').val(), "documento_editable", function () { });

    });
    $("#ingesar_obs").click(function (e) {
        e.preventDefault();
        Guardar_comentarios();
        $("[id*=Observacion]").val("");
    });

    var limpiar = function () {
        $("[id*=id]").val("");
        $("[id*=datos]").val("");
        $("[id*=archivo]").val("");
        $("[id*=Observacion]").val("");
    };

    function formato(texto) {

        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    }

    function descargarArchivo(contenidoEnBlob, nombreArchivo, callback) {
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
        setTimeout(function () { callback(); }, 2000)
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
                    if ((regis != "null") | (regis != " ")) {
                        $("[id*=archivo]").val(r.d[0].Regis_borrador);
                    }

                    //console.log(r.d[0].Regis_borrador);
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
        var datoscoment = {};
        datoscoment.Id = $("[id*=id]").val();
        datoscoment.Observacion = $("[id*=Observacion]").val();
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

});
    