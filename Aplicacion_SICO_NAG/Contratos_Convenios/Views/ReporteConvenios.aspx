<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="ReporteConvenios.aspx.vb" Inherits="Views_ReporteConvenios" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="../Scripts/reporteConvenios.js"></script>
    <link href="../Css/estilos.css" rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
     <div class="col s12 m7 l7 " id="Div1">
        <div class="card responsive-table">
            <input type="text" style="display: none" id="id" />
            <input type="text" style="display: none" id="datos" />
            <textarea id="archivo" class="materialize-textarea" data-length="50000000" style="display: none"></textarea>
            <div class="card-content black-text">
                <div class="dataTable thead th">
                    <span class="card-title center">Reporte Convenios</span>
                    <table id="datatable1" class=" none-data-table display nowrap " style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Titulo del Contrato</th>
                                <th>Descripción</th> 
                                <th>Fecha Firma Contrato </th>
                                <th>Fecha Vencimiento</th>
                                <th>Archivos</th>
                                <th>Estado</th> 
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div id="modal2" class="modal" >
        <div class="modal-content">
            <span class="card-title center">Documentos PDF</span>
               <table id="dataModal" class="mdl-data-table display nowrap "   style="width:100%" border: black 5px solid; >
                     <thead class="center">
                           <tr >   
                               <th>Pdf </th>
                          </tr>
                    </thead>
               </table>   
              </div>
       </div>

    <div id="modal1" class="modal" >
        <div class="modal-content">
            <span class="card-title center">Documentos Word</span>
               <table id="dataModal1" class="mdl-data-table display nowrap "   style="width:100%" border: black 5px solid; >
                     <thead class="center">
                           <tr >   
                               <th>Word</th>
                          </tr>
                    </thead>
               </table>   
              </div>
       </div>

</asp:Content>

