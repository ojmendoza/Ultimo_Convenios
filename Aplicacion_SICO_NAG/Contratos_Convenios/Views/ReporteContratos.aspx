<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="ReporteContratos.aspx.vb" Inherits="Views_ReporteContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="../Scripts/Reporte.js"></script>
    <link href="../Css/Consulta.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="col s12 m7 l7 " id="Div1">
        <div class="card responsive-table">
            <div class="card-content black-text">
                <div class="dataTable thead th">
                    <span class="card-title center">CONTRATOS</span>
                    <table id="datatable" class=" none-data-table display nowrap " style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Titulo del Contrato</th>
                                <th>Primer Archivo(Borrador)</th>
                                <th>Fecha </th>
                                <th>Estado </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

