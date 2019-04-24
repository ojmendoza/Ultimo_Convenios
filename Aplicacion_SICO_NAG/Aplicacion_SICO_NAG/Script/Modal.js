var tabla;
var data;
var row;

$(document).ready(function () {
    ObtenerDatosOperador();
    function ObtenerDatosOperador() {
        // $('select').material_select('destroy');
        var dropCatalogo = {};
        $.ajax({
            type: "POST",
            url: "/vistas/Sitios.aspx/ObtenerDatosOperador",
            data: JSON.stringify({ 'dropInciso': dropCatalogo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {

                tabla = $("#dataModal").DataTable({
                    "scrollX": true,
                    "language": {
                        //"lengthMenu": "Mostrar _MENU_ registros por pagina",
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
                    //"lengthMenu": false,
                    data: r.d,

                    columns: [
                         {
                             //title: "Acciones",
                             defaultContent: '<a  title="Agregar Operado" class="btn-floating btn-large waves-effect btn_AgregarDatos waves-light green darken-1"><i class="material-icons">add</i></a>'

                             //'<button  title="Agregar Operado"  class="  waves-effect waves-light green darken-1 btn_AgregarDatos" type="submit" style="position: static"><i class="material-icons">add_circle_outline</i></button>'

                         },

                        {
                            data: "Value"
                        },
                        {
                            data: "Text"
                        }
                    ],

                });
                console.log(data);
            }
        });
    }



})