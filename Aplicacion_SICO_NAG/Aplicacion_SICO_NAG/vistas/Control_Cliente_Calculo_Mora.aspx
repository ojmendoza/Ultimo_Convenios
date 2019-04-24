<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/PaginaPricipal.Master" CodeBehind="Control_Cliente_Calculo_Mora.aspx.vb" Inherits="Aplicacion_SICO_NAG.Control_Cliente_Calculo_Mora" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="../Script/Control_Cliente_Calculo_Mora.js"></script>
    <link href="/css/Diseno.css" rel="stylesheet"/>
 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

 <div class="ContCliYCalMora">
         <br />
      <h5 class="center" style="font-family:Cooper">CONTROL DE CLIENTES Y CALCULO DE MORA</h5>  
     <br />
 <div class="row">
    <div class="col s12 m5 l5" >
       <%-- formulario  para llenar los datos --%>
     <div class="card">
        <div class="card-content black-text ">
                 <span class="card-title">Ingresar Datos</span>
                     <div class=" valign-wrapper">
                    <div class="input-field col s3 m3 l3" style="margin:initial">
                          <input type="number" class="black-text validate validanumericos" id="txt_Anio" data-length="4" min="2007"/>
                        <label for="txt_Anio" class="black-text">Año Consultado</label>
                      </div>
                   <div class="input-field col s2 m2 l2">
                       <a title="Agregar Operador"  class=" small green darken-1 btn modal-trigger agregar" style="position: static" href="#modal1"><i class="material-icons">add_circle</i></a>
                  </div>
                          <div class="input-field col s6 m6 l6">
                        <asp:TextBox  ID="Tex_Cod" CssClass="black-text validate txt_Codigo"  runat="server"  ReadOnly="true"></asp:TextBox>
                        <label for="txt_nomOperador" class="black-text">Código del Operador</label>
                  </div>
              </div>
                 <div class=" valign-wrapper">
                    <div class="input-field col s6 m6 l6">
                        <asp:TextBox  ID="id" CssClass="black-text validate " runat="server" Visible="false"></asp:TextBox>
                        <asp:TextBox  ID="txt_oper" CssClass="black-text validate txt_Operador" runat="server" ReadOnly="true"></asp:TextBox>
                     <label for="txt_oper" class="black-text">Operador</label>
                   </div>
                   <div class="input-field col s6 m6 l6">
                      <select id="Cliente" class="Cliente_Repor">
                                 <option value="" disabled="disabled" selected="selected">Seleccione...</option>
                                 <option value="Internet Fijo Alambrico">Internet Fijo Alambrico</option>
                                 <option value="Internet Fijo Inalambrico">Internet Fijo Inalambrico</option>
                                 <option value="Internet Movil">Internet Movil</option>
                      </select>
                      <label for="txt_estatus" class="black-text">Cliente Reportado por Tecnología</label>
                 </div>
              </div>
              <div class="valign-wrapper">
                    <div class="input-field col s6 m6 l6 ">
                     <asp:TextBox  ID="txt_sumActual" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                     <label for="txt_velocidad" class="black-text">Usuario Reportado Año Consultado</label>
                 </div>
                   <div class="input-field col s6 m6 l6">
                      <asp:TextBox  ID="txt_sumAnterior" CssClass="black-text validate" runat="server" ReadOnly="True" ></asp:TextBox>
                      <label for="txt_calculo" class="black-text">Usuario Reportado Año Anterior</label>
                 </div>      
              </div>
              <div class="valign-wrapper">
                 <div class="input-field col s2 m2 l2" >
                   <button id="btn_resta" title="Agrega: La resta Usuario Reportado Año Consultado - Usuario Reportado Año Anterior, el 5% Año Consultado Y los Mbps Adeudados Año Anterior
                      " class=" btn waves-effect waves-light btn_Resta green darken-1" type="submit"style="position: static"><i class="material-icons">queue</i></button>
               </div>
                  <div class="input-field col s6 m6 l6">
                      <asp:TextBox  ID="txt_resultado" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                      <label for="txt_calculo" class="black-text">UR Consulatdo - UR Anterior </label>
                 </div>
                    <div class="input-field col s6 m6 l6 ">
                     <asp:TextBox  ID="txt_velocidad" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                     <label for="txt_velocidad" class="black-text">5% Año Consultado</label>
                 </div>
                   <div class="input-field col s6 m6 l6">
                      <asp:TextBox  ID="txt_Anterior" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                      <label for="txt_calculo" class="black-text">Mbps Adeudados Años Anteriores</label>
                 </div>
            </div>
            <div class="valign-wrapper ">
                <div class="input-field col s2 m2 l2" >
                   <button id=" btn_suma" title="Agrega la: Suma del 5% Año Actual + Año Anterior Y Mbps Entregados " class=" btn waves-effect waves-light btn_Suma green darken-1" type="submit"style="position: static"><i class="material-icons">queue</i></button>
               </div>
                 <div class="input-field col s4 m4 l4">
                      <asp:TextBox  ID="txt_Acumulada" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                      <label for="txt_Acumulada" class="black-text">5% Año Actual + Año Anterior</label>
                 </div>
               <div class="input-field col s6 m6 l6 ">
                      <asp:TextBox  ID="txt_megas" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                      <label for="txt_megas" class="black-text">Mbps Entregados Año Consultado</label>
                 </div>
            </div>
            <div class="valign-wrapper ">
               <div class="input-field col s2 m2 l2" style="margin:initial" >
                   <button id="Prueba" title="Calcular Mora Mbps Siguiente Año" class=" btn waves-effect waves-light btn_Prueba grey" type="submit"style="position: static"><i class ="material-icons ">list_alt</i></button>
               </div>
               <div class="input-field col s4 m4 l4" style="margin:initial">
                      <asp:TextBox  ID="txt_calculo" CssClass="black-text validate" runat="server" ReadOnly="True"></asp:TextBox>
                      <label for="txt_calculo" class="black-text"> Mora Mbps Siguiente Año</label>
                 </div>
            </div>
           </div>    
        <div class="card-action center">
                  <button id="btn_Guardar" class=" btn waves-effect waves-light btn_Guardar1 blue lighten-2" type="submit"style="position: static">Guardar</button>&nbsp; 
                   <button  id="btn_Cancelar" class=" btn waves-effect waves-light btn_Cancelar1  red darken-1" type="submit"style="position: static">Cancelar</button> 
                  <br />
                  <br />
                  <br /> 
                </div>   
     </div>
    </div>
 <%-- Para el mantenimiento en el datatble --%>
      <div class="col s12 m7 l7 " id="Div1">
          <div class="card responsive-table">
              <div class="card-content black-text">
                  <span class="card-title center">Información Detallada</span>
                  <table id="datatable" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead>
                         <tr> 
                             <th>Id</th>
                             <th>Año</th>
                             <th>Nombre del Operador</th>
                             <th>Código del Operador</th>
                             <th>Cliente Reportado</th>
                             <th>Usuario Reportado Año Consulatdo</th>
                             <th>Usuario Reportado Año Anterior</th>
                             <th>UR Consulatdo - UR Anterior</th>
                             <th>5% Año Consultado</th>
                             <th>Mbps Adeudados Años Anteriores</th> 
                             <th>5% Año Actual + Año Anterior</th>
                             <th>Mbps Entregados Año Consultado</th>
                             <th>Mora Mbps Siguiente Año</th> 
                             <th>Fecha de Ingreso de Datos</th>
                        </tr>
                       </thead>
                  </table>
            </div>
          </div>
        </div>
 </div>

    <!-- Modal para cargar los operadres -->
   <div id="modal1" class="modal">
    <div class="modal-content">
        <h4 class="center">Información Detallada</h4>
                  <table id="dataModal" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead class="center">
                         <tr > 
                             <th>Acción</th>
                              <th>Código del Operador</th>
                             <th>Nombre del Operador</th>
                            
                         </tr>
                      </thead>   
                  </table>
    </div>
  </div>
</div>
  
</asp:Content>
