<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="AsignacionConvenios.aspx.vb" Inherits="Views_AsignacionConvenios" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
     <script src="../Scripts/Convenios_revisar.js"></script>
    <link href="../Css/estilos.css" rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
  <div class="col s12 m7 l7 " id="Div1">
        <div class="card responsive-table">
            <ul id="issues-collection" class="collection">
                <li class="collection-item avatar">
                    <i class="mdi-action-bug-report circle red darken-2"></i>
                    <span class="collection-header">Convenios</span>
                    <p>Asignados a ti </p>
                   <input type="text" style="display:none" id="id" />
                    <input type="text" style="display:none" id="datos" />
                    <textarea id="archivo" class="materialize-textarea" data-length="50000000" style="display:none" ></textarea>
                </li>
            </ul>
            <div class="card-content black-text">
                <div class="dataTable thead th">
                    <span class="card-title center">CONVENIOS</span>
                    <table id="datatable1" class=" none-data-table display nowrap " style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Titulo del Convenio</th>
                                <th>Archivos</th>
                                <th>Fecha Firma Convenio </th>
                                <th>Prioridad </th>
                                <th>Fecha Vencimiento</th>
                                <th>Observaciones</th>
                                <th>Estado </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
   

     <div id="modal1" class="modal">
        <div class="modal-content">
            <span class="card-title center">Documentos de Word</span>
               <table id="dataModal1" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                     <thead class="center">
                           <tr >   
                               <th>Word</th>
                          </tr>
                    </thead>
               </table>   
              </div>
       </div>

    <div id="modal2" class="modal">
        <div class="modal-content">
            <span class="card-title center">Documentos PDF</span>
               <table id="dataModal" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                     <thead class="center">
                           <tr >   
                               <th>PDF</th>
                          </tr>
                    </thead>
               </table>   
              </div>
       </div>



    
    <div id="modal3" class="modal">
        <div class="modal-content">
           <h4> <span class="card-title center">Escribir observaciones del borrador</span></h4>
            <br />
            <br />
            <div class="row">
            <div class="valign-wrapper ">
                           <div class="input-field col s12" style="margin:initial">
                                <i class="material-icons prefix">directions</i>
                                 <textarea id="observacion" class="materialize-textarea tooltipped" data-length="500000" data-tooltip=" escriba observaciones aqui"></textarea>
                                 <label for="observacion">Escriba observaciones </label>
                             </div>
                        
                      </div>
                </div>
           

                 <div class="card-action center">
                             <div class="col s6 m6 l6" >
                                <button class="btn waves-effect waves-light " type="submit" name="action" id="ingresar_observaciones">Guardar
                                 <i class="material-icons right">file_upload</i>
                                </button>
                              </div>
                      </div>
              </div>
       </div>
    </div>
</asp:Content>

