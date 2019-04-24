var tabla;

$(document).ready(function () {
    $('select').material_select();
    $(".modal").modal();
    $('input#input_text, textarea#textarea1').characterCounter();
    consultar();
    consultarconvenio();
    // Toast Notification
    setTimeout(function () {
        Materialize.toast('<span>Contrato a vencer</span><a class="btn-flat blue-text" href="#">Revisar<a>');
    });

      //FUNCION DE LLENAR DATATABLE
    function consultar() {
        $.ajax({
            type: "POST",
            url: "/Views/Registro_Contratos.aspx/seleccionar",
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
                        //{
                        //    defaultContent: '<button  title="Actualizar" class=" btn waves-effect waves-light btn_Actualizar blue lighten-2" type="submit" style="position: static"><i class="material-icons">update</i></button>&nbsp;' +
                        //        '<button  title="Subir Archivo Memo" class=" btn waves-effect waves-light Subir_memo red lighten-2 modal-trigger" type="submit" style="position: static" href="#modal"><i class="material-icons">file_upload</i></button>&nbsp;' +
                        //        '<button  title="Subir Archivo final" class=" btn waves-effect waves-light Subir_final red lighten-2 modal-trigger" type="submit" style="position: static" href="#modal1"><i class="material-icons">file_upload</i></button>&nbsp;'
                        //},

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
                            data: "Regis_borrador"
                        },

                        {
                            "className": "dt-left",
                            data: "Fech_inicio"
                        },
                        {
                            "className": "dt-left",
                            data: "Fech_fin"
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

    //FUNCION DE LLENAR DATATABLE
    function consultarconvenio() {
        $.ajax({
            type: "POST",
            url: " /Views/Registro_Convenios.aspx/seleccionar",
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

                    data: response.d,

                    columns: [
                        //{
                        //    defaultContent: '<button  title="Actualizar" class=" btn waves-effect waves-light btn_Actualizar blue lighten-2" type="submit" style="position: static"><i class="material-icons">update</i></button>&nbsp;' +
                        //        '<button  title="Subir Archivo Memo" class=" btn waves-effect waves-light Subir_memo red lighten-2 modal-trigger" type="submit" style="position: static" href="#modal"><i class="material-icons">file_upload</i></button>&nbsp;' +
                        //        '<button  title="Subir Archivo final" class=" btn waves-effect waves-light Subir_final red lighten-2 modal-trigger" type="submit" style="position: static" href="#modal1"><i class="material-icons">file_upload</i></button>&nbsp;'
                        //},

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
                            data: "Regis_borrador"
                        },

                        {
                            "className": "dt-left",
                            data: "Fech_inicio"
                        },
                        {
                            "className": "dt-left",
                            data: "Fech_fin"
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

});