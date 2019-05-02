var tabla;

$(document).ready(function () {

    $('select').material_select();
    $(".modal").modal();

    consultar();

    // Toast Notification
    setTimeout(function () {
        Materialize.toast('<span>Contrato a vencer</span><a class="btn-flat blue-text" href="#">Revisar<a>');
    });

    //FUNCION DE LLENAR DATATABLE
    function consultar() {
        $.ajax({
            type: "POST",
            url: "/Views/AsignacionContratos.aspx/seleccionar",
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
                            defaultContent: '<a title="Descargar" class="btn task-cat green darken-2 modal-trigger  descargar">Descargar</a>' +
                                ' <a title="Ver" class="btn task-cat blue darken-2 modal-trigger ver" href="#modal2" >Visualizar</a>'
                        },

                        {
                            "className": "dt-left",
                            data: "Fech_inicio"
                        },
                        {
                            defaultContent: '<a title="Nivel de prioridad Alto" class="btn task-cat red darken-2  btn_p1">P1</a>' +
                                ' <a title="Nivel de prioridad Medio" class="btn task-cat yellow darken-2 btn_p2">P2</a>' +
                                ' <a title="Nivel de prioridad Bajo" class="btn task-cat light-green darken-2  btn_p3">P3</a>'
                        },
                        {
                            "className": "dt-left",
                            data: "Esta_Doc"
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

    function visualizar() {
        var codigo = $("[id*=id]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Visualizar",
                data: JSON.stringify({ 'codigo': codigo }),
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

    };

    $('.ver').click(function (e) {
        e.preventDefault();
        $('.modal').modal({
            dismissible: true,
            ready: function () {
                tabla.destroy();
                visualizar();
            },
            complete: function () { tabla.destroy(); consultar(); }

        })
    });

    $(document).on('click', '.ver', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id)

    });
});