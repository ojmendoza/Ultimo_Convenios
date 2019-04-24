<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/PaginaPricipal.Master" CodeBehind="Sitios.aspx.vb" Inherits="Aplicacion_SICO_NAG.OtrosCentros" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>   
    <link href="/css/Diseno.css" rel="stylesheet"/>
    <script src="../Script/Sitios.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="Sitios">
      <br />
    <h5 class="center " style="font-family:Cooper">SITIOS</h5>  
     <br />
     <div class="row">
         <div class="col s12 m5 l5" >
         <%-- formulario para llenar los datos --%>
            <div class="card">
               <div class="card-content black-text ">
                <span class="card-title">Ingresar Datos</span>
                 <br />
                     <div class="valign-wrapper">
                      <div class="input-field col s3 m3 l3" style="margin:initial">
                          <input type="number" min="2019" class="black-text validate validanumericos" id="txt_Anio" data-length="4"  />
                        <label for="txt_Anio" class="black-text">Año</label>
                      </div>
                          <div class="input-field col s6 m6 l6">   
                        <a title="Agregar Datos Solicitud"  class=" small blue lighten-2 btn modal-trigger agrega" style="position: static" href="#modal2" ><i class="material-icons">add_circle</i></a>
                        </div>

                  </div>
                <div class="valign-wrapper">
                    <div class="input-field col s6 m6 l6">
                        <asp:TextBox  ID="id" CssClass="black-text validate id_Sitio" runat="server" Visible="FALSE"></asp:TextBox>
                         <asp:TextBox  ID="txt_Sitio" CssClass="black-text validate Nom_Sitios letras mayus"  runat="server"  ></asp:TextBox>
                         <label for="txt_Sitio" class="black-text">Nombre del Sitio</label>   
                    </div>
                    <div class="input-field col s6 m6 l6">
                         <select id="tipoSitio">
                                 <option value="" disabled="disabled" selected="selected">Seleccione...</option>
                                 <option value="Parques">Parques</option>
                                 <option value="Hospitales">Hospitales</option>
                                 <option value="Centro de Salud">Centro de Salud</option>
                                 <option value="Centros de Capacitación">Centros de Capacitación</option>
                                 <option value="Plaza Publicas">Plaza Publicas</option>
                                 <option value="Zona Turística">Zona Turística</option>
                                 <option value="Instituciones Gubernamentales">Instituciones Gubernamentales</option>
                                 <option value="Bases Militares">Bases Militares</option>
                                 <option value="Policias">Policias</option>
                                 <option value="ONG">ONG</option>
                                 <option value="INFOP">INFOP</option>
                                 <option value="Otros">Otros</option>
                          </select>
                          <label for="txt_codigo" class="black-text">Tipo de Sitio/Eventos Enlace Temporal</label>
                   </div>
              </div>    
           
            <div class="valign-wrapper">
                 <%-- <div class="input-field col s6 m6 l6">
                       <asp:TextBox  ID="txt_direc" CssClass="black-text validate" runat="server"></asp:TextBox>
                       <label for="txt_direc" class="black-text">Dirección del Sitio</label>
                  </div>--%>
                  <div class="input-field col s6 m6 l6" style="margin:initial">
                       <input type="text" class="datepicker" id="fecha"/>
                       <label for="txt_fechaInstr" class="black-text">Fecha de Instalción</label>
                  </div>                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
           </div>
      
          <div class="valign-wrapper">
               <div class="input-field col s2 m2 l2">
                  <a title="Agregar Operador"  class=" small blue lighten-2 btn modal-trigger agregar" style="position: static" href="#modal1" ><i class="material-icons">add_circle</i></a>
             </div>
              <div class="input-field col s6 m6 l6">
                     <asp:TextBox  ID="txt_oper" CssClass="black-text validate txt_Operador" runat="server" ReadOnly="true"></asp:TextBox>
                     <label for="txt_oper" class="black-text">Operador</label>
              </div>
           
             <div class="input-field col s6 m6 l6">
                  <asp:TextBox  ID="Tex_Cod" CssClass="black-text validate txt_Codigo"  runat="server"  ReadOnly="true"></asp:TextBox>
                  <label for="Tex_Codi" class="black-text">Código de Operador</label>
              </div>
         </div>
         
          <div class="valign-wrapper">
                <div class="input-field  col s6 m6 l6">
                   <select id="medio" class="black-text DDL_Medio"> 
                       <option value="" disabled="disabled" selected="selected">Seleccione...</option>
                          <optgroup label="Fijo Alambrico">
                                 <option value="Cable Módem">Cable Módem</option>
                                 <option value="Cable Coaxial">Cable Coaxial</option>
                                 <option value="Fibra Óptica">Fibra Óptica</option>
                                 <option value="ADSL">ADSL</option>
                                 <option value="WIMAX">WIMAX</option>
                                 <option value="Otros Alambrico">Otros</option>
                         </optgroup>
                         <optgroup label="Fijo Inalambrico">
                                  <option value="Estaciones Bases">Estaciones Bases</option>
                                  <option value="Satelital">Satelital</option>
                                  <option value="Otros Inalambrico">Otros</option>
                         </optgroup>
                             <optgroup label="Movil">
                                  <option value="2G"> 2G</option>
                                  <option value="3G">3G</option>
                                  <option value="4G">4G</option>
                                  <option value="Otros Movil">Otros</option>
                        </optgroup>
                     </select>
                     <label for="ddl_medio" class="black-text">Medio de Conexión</label>
                    </div>
              
              <div class="input-field  col s6 m6 l6">
                   <asp:TextBox  ID="txt_tecno" CssClass="black-text validate txt_Tecno" runat="server" ReadOnly="true"></asp:TextBox>
                     
                     <label for="ddl_medio" class="black-text">Cliente Reportado por Tecnología</label>
                    </div>
         </div>
         <div class="valign-wrapper">
              <div class="input-field col s6 m6 l6">
                    <input type="number" class="black-text validate" id="txt_anchoBan" />
                  <label for="txt_anchoBan" class="black-text">Megas Entregados</label>

             </div>
              <div class="input-field col s6 m6 l6">
                    <select id="Conectado" class="ddl_conectado">
                                 <option value="" disabled="disabled" selected="selected">Seleccione...</option>
                                 <option value="Proyectos FITT">Proyectos FITT</option>
                                 <option value="Acceso Gratuito de Internet">Acceso Gratuito de Internet</option>
                     </select>
                     <label for="txt_estatus" class="black-text"> Conectado Por:</label>
               </div>
              
          </div>
       
               <div class="valign-wrapper">
               <div class="input-field col s6 m6 l6">
                    <select id="estatus">
                                 <option value="" disabled="disabled" selected="selected">Seleccione...</option>
                                 <option value="Conectado">Conectado</option>
                                 <option value="Desconectado">Desconectado</option>
                     </select>
                     <label for="txt_estatus" class="black-text">Estado del Enlace</label>
               </div>
              
                  <div class="input-field col s6 m6 l6"  >
                        <textarea id="txt_obser"   rows="4" class="materialize-textarea"data-length="200"></textarea>
                        <label for="txt_obser" class="black-text">Observaciones</label>
                  </div>
               </div>
                   <div class="valign-wrapper" ">
                           <input  id="id_inst"  type="text" style="display:none"/>
                          </div>
           </div>    
                <div class="card-action center">
                     <button id="btn_GuardarS" class=" btn waves-effect waves-light btn_GuardarS1 blue lighten-2" type="submit"style="position: static">Guardar</button>&nbsp; 
                     <button  id="btn_CancelarS" class=" btn waves-effect waves-light btn_CancelarS1  red darken-1" type="submit"style="position: static">Cancelar</button> 
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
                   <table id="datatable" class="mdl-data-table display nowrap"   style="width:100%"  border: black 5px solid; >
                      <thead>
                        <tr>
                           <th>Acciones</th>
                           <th>Id Sitio</th>
                           <th>Nombre Sitio</th>
                           <th>Tipo Sitio</th>                           
                           <th>Fecha Instalación</th>                           
                           <th>Operador</th>
                           <th>Codigo</th>
                           <th>Medio de Conexión</th>
                           <th>Cliente Reportado por Tenología</th>
                           <th>Megas Entregados</th>
                           <th>Conectado Por</th>                           
                           <th>Estado del Enlace</th>
                           <th>Observaciones</th>
                           <th>Año</th>                         
                      </tr>
                     </thead>
                   </table>
             </div>
              <br />
          </div>
        </div>
    </div>

     <!-- Modal para cargar los operadores -->
   <div id="modal1" class="modal">
    <div class="modal-content">
      <span class="card-title center">Información Detallada</span>
                  <table id="dataModal" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead>
                         <tr> 
                             <th>Acción</th>
                              <th>Código del Operador</th>
                             <th>Nombre del Operador</th>
                         </tr>
                       </thead>
                </table>
    </div>
  </div>
     
    <!-- Modal para cargar los datos de las solicitudes -->
   <div id="modal2" class="modal">
    <div class="modal-content">
      <span class="card-title center">Información Detallada</span>
                  <table id="datosolic"  class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead>
                         <tr> 
                             <th>Acción</th>
                             <th>Codigo</th>  
                             <th>Nombre Institución</th>
                             <th>Tipo_Institución</th>
                                                        
                         </tr>
                       </thead>
                </table>
    </div>
  </div>

 </div>
</asp:Content>
