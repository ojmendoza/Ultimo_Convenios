<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/PaginaPricipal.Master" CodeBehind="Estudio_Factibilidad.aspx.vb" Inherits="Aplicacion_SICO_NAG.Formulario_web1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script> 
     <link href="/css/Diseno.css" rel="stylesheet"/>
    <script src="../Script/Estudio_factibilidad.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="Estudio">
        <br />
         <div class="row">
              <div class="row col s12 m12 l12">                   
                  <h5 class="center" style="font-family:Cooper">ESTUDIO DE FACTIBILIDAD DE SOLICITUDES</h5>  
                    <div class="col s12 m5 l5" >
                        <div class="card">
                             <div class="card-content black-text">
                                <span class="card-title">Ingresar Datos Instituciones</span>
                                <br />

                                 <div class="valign-wrapper">
                                     
                                        <div class="input-field col s6 m6 l6" style="margin:initial">
                                            <a title="Agregar Datos de Instituciones"  class=" small blue lighten-2 btn modal-trigger agregar" style="position: static" href="#modal1" ><i class="material-icons">add_circle</i></a>
                                        </div>
                                     <input id="id" type="text" style="display:none" />
                                     <input id="inst" type="text" style="display:none" />
                                 </div>
                                 <br />
                                   <div class="valign-wrapper">                                     
                                        <div class="input-field col s6 m6 l6" style="margin:initial">
                                             <i class="material-icons prefix">account_balance</i>
                                                <input id="nom_inst"   type="text"  class="validate tooltipped letras mayus" data-tooltip="Nombre de la Institución" readonly="true"/>
                                                <label for="nom_inst">Nombre de la Institución</label>
                                        </div>
                                       
                                       <div class="input-field col s6 m6 l6" >
                                            <i class="material-icons prefix">lock</i>
                                            <input id="cod_sace" type="text" maxlength="12" class="validate mayus sace" data-length="12" readonly="true" style="display:none" />
                                            <label for="cod_sace" >Código SACE </label>
                                           
                                        </div>
                                 </div>
                                   <div class="valign-wrapper">                                     
                                        <div class="input-field col s6 m6 l6" style="margin:initial">
                                             <i class="material-icons prefix">list</i>
                                                <input id="Tip_inst"   type="text"  class="validate tooltipped letras mayus" data-tooltip="Tipo de Institución" readonly="true"/>
                                                <label for="Tip_inst">Tipo de Institución</label>
                                        </div>
                                       
                                       <div class="input-field col s6 m6 l6" >
                                            <i class="material-icons prefix">help</i>
                                            <input id="Factibilidad" type="text" maxlength="12" class="validate mayus sace" data-length="12" readonly="true" />
                                            <label for="Factibilidad" >Estado de la Solicitud </label>
                                        </div>
                                 </div>
                                   <div class="valign-wrapper ">
                                      <div class="input-field col s12" style="margin:initial">
                                            <i class="material-icons prefix">help</i>
                                            <textarea id="fin_solic" class="materialize-textarea tooltipped mayus" data-length="200" data-tooltip="Explique el objetivo para el cual se está haciendo la solicitud a CONATEL " readonly="readonly " ></textarea>
                                             <label for="fin_solic">Descripción de la Finalidad</label>
                                         </div>
                                    </div>
                                  <span class="card-title">Ingresar Datos de Operadores</span>
                                             <br />
                                             <div class="valign-wrapper">
                                                    <div class="input-field col s6 m6 l6" style="margin:initial">
                                                        <a title="Agregar Datos de Operadores"  class=" small blue lighten-2 btn modal-trigger agregar_operador" style="position: static" href="#modal2" ><i class="material-icons">add_circle</i></a>
                                                    </div>
                                             </div>
                                   <br />
                                     <div class="valign-wrapper">                                     
                                        <div class="input-field col s6 m6 l6" style="margin:initial">
                                             <i class="material-icons prefix">lock</i>
                                                <input id="Cod_Operador"   type="text"  class="validate tooltipped letras mayus" data-tooltip="Codigo del Operador" readonly="true"/>
                                                <label for="Cod_Operador">Codigo del Operador</label>
                                        </div>
                                       
                                       <div class="input-field col s6 m6 l6" >
                                            <i class="material-icons prefix">person</i>
                                            <input id="Nom_operador" type="text" class="validate tooltipped mayus sace" data-tooltip="Nombre del Operador " readonly="true" />
                                            <label for="Nom_operador" >Nombre del Operador </label>
                                        </div>
                                 </div>
                                 <div class="valign-wrapper"> 
                                          <div class=" input-field col s12 m6 l6" style="margin:initial">
                                            <i class="material-icons prefix">date_range</i>
                                            <label for="fech_asig">Fecha De Asignación</label>
                                            <input type="text" class="datepicker tooltipped" id="fech_asig" data-tooltip="Fecha en que se Asigna al Operador"/>                                 
                                         </div>
                                     <div class=" input-field col s12 m6 l6">
                                            <i class="material-icons prefix">date_range</i>
                                            <label for="fech_Resp">Fecha De Respuesta</label>
                                            <input type="text" class="datepicker tooltipped" id="fech_Resp" data-tooltip="Fecha de Respuesta del Operador"/>                                 
                                         </div>
                                 </div>
                                  <div class="valign-wrapper"> 
                                      <div class=" input-field col s12 m6 l6" style="margin:initial">
                                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                                           <select id="est_facti" class="eval" >                                
                                             <option value="" class="disabled selected" >Seleccione</option>
                                             <option value="FACTIBLE">FACTIBLE</option>
                                             <option value="NO FACTIBLE">NO FACTIBLE</option>                                            
                                          </select>
                                         <label> Estado de Factibilidad                       
                                         </label>
                                    </div>
                               </div>

                                    <div class="card-action center">
                         <div class="col s6 m6 l6" >
                            <button class="btn waves-effect waves-light " type="submit" name="action" id="btn_insertar">Guardar
                             <i class="material-icons right">send</i>
                            </button>
                          </div>
                         <div class="col s6 m6 l6" >
                            <button class="btn waves-effect waves-light red" id="btn_cancelar" type="submit" name="action1">Cancelar
                             <i class="material-icons right">close</i>
                            </button>
                         </div>
                        <br />
                        <br />
                        <br />  
                     </div>
                          </div>
                          
                        </div>
                            
                             </div>
                        
                    
                     <div class="col s12 m7 l7" id="Div1">
                          <div class="card responsive-table center">
                              <div class="card-content black-text" >
                                 <span class="card-title center">Información Detallada</span>
                                     <table id="datatable" class="mdl-data-table display nowrap center"   style="width:100%">
                    
                                         <thead> 
                                           <tr>
                                             <th>Acciones</th>
                                             <th>Id</th>
                                             <th>Nombre Institución</th> 
                                             <th>Codigo SACE</th>                                                  
                                             <th>Tipo Institución</th>                         
                                             <th>Estado Solicitud</th>                                             
                                             <th>Operador</th>
                                             <th>Codigo</th>
                                             <th>Fecha Asignación</th>
                                             <th>Fecha Respuesta</th>
                                             <th>Estado Factibilidad</th>                                                                
                                          </tr>
                                        </thead> 
                                    </table>
                             </div>
                         </div>
                      </div>
                  <%-- modal de instituciones --%>
                    <div id="modal1" class="modal">
                    <div class="modal-content">
                                 <span class="card-title center">Información Detallada</span>
                                     <table id="datatable1" class="mdl-data-table display nowrap center"   style="width:100%">
                    
                                         <thead> 
                                           <tr>
                                             <th>Acciones</th>
                                             <th>Id</th>
                                               <th>Codigo SACE</th>    
                                             <th>Nombre Institución</th> 
                                                                                           
                                             <th>Tipo Institución</th>                         
                                             <th>Estado Solicitud</th>                                             
                                             <th>Finalidad Solicitud</th>                                                                                                            
                                          </tr>
                                        </thead> 
                                    </table>
                             </div>
                         </div>
                    <%-- modal de operadores --%>
                     <div id="modal2" class="modal">
                        <div class="modal-content">
                                 <span class="card-title center">Información Detallada</span>
                                     <table id="datatable2" class="mdl-data-table display nowrap center"   style="width:100%">
                    
                                         <thead> 
                                           <tr>
                                             <th>Acciones</th>                                                                                                                                 
                                             <th>Nombre Operador</th>
                                             <th>Codigo de Operador</th>                                                                                                            
                                          </tr>
                                        </thead> 
                                    </table>
                             </div>
                         </div>


              </div>
      </div>
   </div>
</asp:Content>
