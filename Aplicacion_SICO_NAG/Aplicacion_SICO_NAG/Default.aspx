<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/PaginaPricipal.Master" CodeBehind="Default.aspx.vb" Inherits="Aplicacion_SICO_NAG.formularioCentrosEducativos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>

    <script type="text/javascript" src="Script/Pantalla_Inicio.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <div class="row">
        <div class="row col s12 m12 l12">
        <br />
          <br />
       <h5 class="center " style="font-family:Cooper">ESTADISTICAS DEL CALCULO DE MORA</h5> 
         <br />
            <br /> 
        <div class=" card col s4 m4 l4" style="height:auto,">
             <br />
              <h5 class="center " style="font-family:'Arial Rounded MT'">Mora de Internet Fijo Alambrico</h5> 
            <br />
             <br />
             <canvas id="canvas" width="40" height="35"></canvas>
            <br />
        <br /> 
        </div>

        <div class=" card col s4 m4 l4">
             <br />
              <h5 class="center " style="font-family:'Arial Rounded MT'">Mora de Internet Fijo Inalambrico</h5> 
             <br />
             <br />
             <canvas id="canvas1" width="40" height="35"></canvas>
            <br />
        <br />  
        </div>
        <div class="card col s4 m4 l4">
             <br />
             <h5 class="center " style="font-family:'Arial Rounded MT'">Mora de Internet  Movil</h5> 
             <br />
             <br />
             <canvas id="canvas2" width="40" height="35"></canvas>
            <br />
        <br /> 
        </div>
        </div>
        
    </div>
    
</asp:Content>
