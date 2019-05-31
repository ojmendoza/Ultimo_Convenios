var tabla;
var data;
var datos;
var btn;
var etiqueta;

$(document).ready(function () {
    $('select').material_select();
   // $('input#input_text,textarea#textarea1').characterCounter();
    
    consultar(function () { });

     function consultar(callback) {
        $.ajax({
            type: "POST",
            url: "/Views/Modificar_Borrador.aspx/seleccionar",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                tabla = $("#datatable1").DataTable({
                    "scrollX": true,
                    "order": [[1, 'desc']],
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
                            data: "Id"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre"
                        },


                        {
                            "className": "dt-left",
                            data: "Tip_Doc"
                        },
                        {
                            "className": "dt-left",
                            data: "Observacion"
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

        setTimeout(function () { callback() }, 700)

    };

    //Funcion para llenar los datos en los textbox a Modificar  
    function Datos_amodificar() {
        var datos = $("[id*=id]").val();   

        $.ajax({
            type: "POST",
            url: "/Views/Modificar_Borrador.aspx/mandar_controles",
            data: JSON.stringify({ "Id": datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                d: data.d
               $('select').material_select('destroy');
                $("[id*=id]").val(data.d[0].Id);
                $("[id*=nom_contra]").val(data.d[0].Nombre);
                $("[id*=Observaciones]").val(data.d[0].Observacion);
                $('select').material_select();
            },
            error: function (data) {
                Materialize.toast('Error al cargar los datos. ' + data.d + '', 4000, 'rounded');
            }

        })
    };


    //mandar datos de la tabla a controles
    $(document).on("click", '.btn_Actualizar', function (e) {
        e.preventDefault();
        //$('select').material_select('destroy');
        var row = $(this).parent().parent()[0];
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);
        Datos_amodificar();
       // $('select').material_select();

    });


    //funcion guardar memo
    function guardar_modificaciones(callback) {
        btn = '<a title="Nivel de prioridad Alto" class="btn task-cat red darken-2  btn_p1" id="btn_p1">Borrador</a>'
        
        datos = document.getElementById("bina").value;
        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Regis_borrador = datos;
  
        datosContratos.Btn = btn;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/Modificar_Borrador.aspx/modificar_borrador",
                data: JSON.stringify({ 'datos': datosContratos }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    Materialize.toast('Borrador actualizado correctamente ', 4000, 'rounded green')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser subidos', 4000, 'rounded red');
                    console.log(response);
                }

            });
        });
        setTimeout(function () { callback(); }, 500);
    };

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

    $('#file').on('change', function () {
        solo_word(this);
    });

    //aca es para guardar o actualizar datosSubir_1
    $('#btn_insertar').click(function (e) {
        e.preventDefault();
        if ($("[id*=bina]").val() == "") {
            Materialize.toast("Error, No puede quedar vacío",2000,'red');
            return false;
        }
        if ($("[id*=id]").val() == "") {
            Materialize.toast("Error, No puede quedar vacío", 2000, 'red');
            return false;
        }
        if (document.getElementById('borrador').value == "") {
            Materialize.toast('ERROR, Ingrese el documento', 6000, 'rounded');
            return false;
        }
       
        guardar_modificaciones(function () {
            tabla.destroy();
            limpiar();
            consultar(function () { });
        });             

    });

    //preload
    $(document).on('change', '.file-path', function (e) {
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

    var limpiar = function () {
        $("[id*=nom_contra]").val(""); 
        $("[id*=Observaciones]").val(""); 
        $("[id*=borrador]").val("");
        $("[id*=bina]").val("");
        $("[id*=id]").val("");
    };

  });