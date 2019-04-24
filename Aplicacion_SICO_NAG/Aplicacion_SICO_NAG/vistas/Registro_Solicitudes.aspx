<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/PaginaPricipal.Master" CodeBehind="Registro_Solicitudes.aspx.vb" Inherits="Aplicacion_SICO_NAG.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
  <link href="/css/Diseno.css" rel="stylesheet"/>
  <script src="../Script/registro_solicitudes.js"></script>   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div class="solicitudes">
        
        <div class="row">
            <div class="row col s12 m12 l12"> 
                <h4 class="center" style="font-family:Cooper">Registro de Solicitudes</h4>
                 <br />
            
            <div class="col s12 m5 l5">
             <div class="card">
                 <div class ="card-content black-text">
                     <span class="card-title">Ingresar Datos</span>
                    
                     <div class="valign-wrapper ">
                         <div class="input-field col s6 m6 l6" style="margin:initial" >
                            <i class="material-icons prefix">account_balance</i>
                            <input id="nom_inst"   type="text"  class="validate tooltipped letras mayus" data-tooltip="Nombre de la Institución" />
                            <label for="nom_inst">Nombre de la Institución</label>
                          </div>


                         <div class="input-field col s6 m6 l6" >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                               <select id="tip_inst">                                
                                 <option value="" class="disabled selected" >Seleccione una opción</option>
                                 <option value="Centros Educativos">Centros Educativos</option>
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
                             <label>Tipo de Institución                         
                             </label>
                           </div>
                     </div>
                    <div class="valign-wrapper ">
                         <div class="input-field col s6 m6 l6 " style="margin:initial">
                            <i class="material-icons prefix">lock</i>
                            <input id="cod_sace" type="text" maxlength="12" class="validate mayus sace" data-length="12" style="display:none" />
                            <label for="cod_sace"  >Código SACE </label>
                          </div>
                        <div class="input-field col s6 m6 l6 ">
                            <i class="material-icons prefix">email</i>
                            <input id="email" type="email" class="validate tooltipped" data-tooltip="Correo Electrónico"/>
                            <label for="email">Correo Electrónico</label>
                          </div>
                     </div>
                     <div class="valign-wrapper ">
                         <div class="input-field col s6 m6 l6" style="margin:initial" >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                             <select id="depto">
                                 <option value="" class="disabled selected">Seleccione una opción</option>

                             </select>
                             <label>Departamentos                        
                             </label>
                           </div>
                          <div class="input-field col s6 m6 l6" >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                              <select id="municipio" name="municipio">
                                 <option value="" class="disabled selected">Seleccione una opción</option>

                             </select>
                             <label>Municipios                        
                             </label>
                           </div>
                      </div>
                      <div class="valign-wrapper ">
                           <div class="input-field col col s12" style="margin:initial">
                                <i class="material-icons prefix">directions</i>
                                <textarea id="direccion" class="materialize-textarea tooltipped" data-length="120" data-tooltip="Dirección exacta de la Institución"></textarea>
                                 <label for="direccion">Dirección Exacta</label>
                             </div>
                        
                      </div>
                     <div class="valign-wrapper ">
                         <div class="input-field col s6 m6 l6 ">
                            <i class="material-icons prefix">room</i>
                            <input id="Latitud" type="text" class="validate tooltipped validanumericos " data-tooltip="Latitud donde se encuentra la Institución"/>
                            <label for="Latitud">Latitud</label>
                          </div>
                         <div class="input-field col s6 m6 l6 ">
                            <i class="material-icons prefix">room</i>
                            <input id="Longitud" type="text"  class="validate tooltipped Numeros" data-tooltip="Longitud donde se encuentra la Institución "/>
                            <label for="Longitud">Longitud</label>
                          </div>
                     </div>
                     <span class="card-title">Contacto Inmediato:</span>
                    <div class="valign-wrapper ">
                         <div class="input-field col s12 m6 l6 "  style="margin:initial">
                            <i class="material-icons prefix">person</i>
                            <input id="nom_contac" type="text" class="validate tooltipped letras mayus" data-tooltip="Nombre completo del contacto inmediato"/>
                            <label for="nom_contac">Nombre Completo</label>
                          </div>
                        <div class="input-field col s12 m6 l6 "  style="margin:initial">
                            <i class="material-icons prefix">layers</i>
                            <input id="ocu_contac" type="text" class="validate tooltipped letras mayus" data-tooltip="Ocupación del contacto inmediato"/>
                            <label for="ocu_contac">Ocupación</label>
                          </div>
                        </div>
                      <div class="valign-wrapper ">
                         <div class="input-field col s12 m6 l6 "  style="margin:initial">
                            <i class="material-icons prefix">phone</i>
                            <input id="tel_contac" type="tel" maxlength="8" class="validate tooltipped validanumericos" data-length="8" data-tooltip="Teléfono fijo del contacto inmediato"/>
                            <label for="tel_contac">Télefono Fijo</label>
                          </div>
                           <div class="input-field col s12 m6 l6 ">
                            <i class="material-icons prefix">phone_android</i>
                            <input id="tel_contac_movil" maxlength="8" type="tel" class="validate tooltipped validanumericos" data-length="8" data-tooltip="Teléfono móvil del contacto inmediato"/>
                            <label for="tel_contac_movil">Télefono Móvil</label>
                          </div>
                    </div>
                      <div class="valign-wrapper ">
                          <div class="input-field col s12" style="margin:initial">
                                <i class="material-icons prefix">help</i>
                                <textarea id="fin_solic" class="materialize-textarea tooltipped mayus" data-length="200" data-tooltip="Explique el objetivo para el cual se está haciendo la solicitud a CONATEL "></textarea>
                                 <label for="fin_solic">Finalidad de la Solicitud (Explique)</label>
                             </div>
                           </div>
                          
                          <div class="valign-wrapper ">
                               <div class="input-field col s12 m6 l6" style="margin:initial" >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                               <select id="est_solic">                                
                                 <option value="" class="disabled selected" >Seleccione una opción</option>
                                 <option value="En Proceso">En Proceso</option>
                                 <option value="Aprobada">Aprobada</option>
                                 <option value="No Aprobada">No Aprobada</option>
                              </select>
                             <label>Estado de la solicitud                         
                             </label>
                           </div>
                        <div class=" input-field col s12 m6 l6" style="margin:initial">
                            <i class="material-icons prefix">date_range</i>
                                <label for="fech_recib">Fecha de Recibido</label>
                                <input type="text" class="datepicker tooltipped" id="fech_recib" data-tooltip="Fecha en que se realizada la solicitud"/>
                                 
                              </div>
                        </div>
                      <span class="card-title">Encargados:</span>
                      <div class="valign-wrapper ">
                        
                           <div class="input-field col s12 m6 l6"  style="margin:initial">
                            <i class="material-icons prefix">person</i>
                            <input id="nom_encarg_uno" type="text" class="validate tooltipped letras mayus" data-tooltip="Nombre completo del primer encargado (Director)"/>
                            <label for="nom_encarg_uno">Nombre del Encargado</label>
                          </div>
                          <div class="input-field col s12 m6 l6" >
                            <i class="material-icons prefix">email</i>
                            <input id="email_uno" type="email" class="validate tooltipped" data-tooltip="Correo personal del primer encargado"/>
                            <label for="email_uno">Correo Electrónico</label>
                          </div>
                      </div>
                     <div class="valign-wrapper ">
                         <div class="input-field col s9 "  style="margin:initial">
                            <i class="material-icons prefix">layers</i>
                            <input id="ocu_encar_uno" type="text" class="validate tooltipped letras mayus" data-tooltip="Ocupación del primer encargado"/>
                            <label for="ocu_encar_uno">Ocupación</label>
                          </div>
                     </div>

                     <div class="valign-wrapper ">
                         <div class="input-field col s12 m6 l6"  style="margin:initial">
                            <i class="material-icons prefix">phone</i>
                            <input id="tel_encarg_uno" maxlength="8" type="tel" class="validate tooltipped validanumericos" data-length="8" data-tooltip="Número de teléfono de la casa del primer encargado"/>
                            <label for="tel_encarg_uno">Télefono Fijo</label>
                          </div>
                           <div class="input-field col s12 m6 l6"  >
                            <i class="material-icons prefix">phone_android</i>
                            <input id="tel_encarg_movil_uno" maxlength="8" type="tel" class="validate tooltipped validanumericos" data-length="8" data-tooltip="Número de teléfono celular del primer encargado"/>
                            <label for="tel_encarg_movil_uno">Télefono Móvil</label>
                               
                          </div>
                         <textarea id="binario"  class="materialize-textarea" data-length="50000000" style="display:none" ></textarea>
                         <input id="id" type="text"  style="display:none"/>
                         <input id="id_cont"  type="text" style="display:none"/>
                         <input id="id_encar" type="text"  style="display:none"/>
                         <input id="id_soli"  type="text" style="display:none"/>
                         <input id="id_lab"  type="text" style="display:none"/>
                    </div>
                       <div class="valign-wrapper ">
                         
                           <div class="input-field col s12 m6 l6"  style="margin:initial">
                            <i class="material-icons prefix">person</i>
                            <input id="nom_encarg_dos" type="text" class="validate tooltipped letras mayus" data-tooltip="Nombre completo del segundo encargado"/>
                            <label for="nom_encarg_dos">Nombre del Encargado</label>
                          </div>
                           <div class="input-field col s12 m6 l6 ">
                            <i class="material-icons prefix">email</i>
                            <input id="email_dos" type="email" class="validate tooltipped" data-tooltip="Correo personal del segundo encargado"/>
                            <label for="email_dos">Correo Electrónico</label>
                          </div>
                      </div>
                      <div class="valign-wrapper ">
                         <div class="input-field col s9 "  style="margin:initial">
                            <i class="material-icons prefix">layers</i>
                            <input id="ocu_encar_dos" type="text" class="validate tooltipped letras mayus" data-tooltip="Ocupación del segundo encargado"/>
                            <label for="ocu_encar_dos">Ocupación</label>
                          </div>
                     </div>
                     <div class="valign-wrapper ">
                         <div class="input-field col s12 m6 l6"  style="margin:initial">
                            <i class="material-icons prefix">phone</i>
                            <input id="tel_encarg_dos" maxlength="8" type="tel" class="validate tooltipped validanumericos" data-length="8" data-tooltip="Número de teléfono de la casa del segundo encargado"/>
                            <label for="tel_encarg_dos">Télefono Fijo</label>
                          </div>
                           <div class="input-field col s12 m6 l6" >
                            <i class="material-icons prefix">phone_android</i>
                            <input id="tel_encarg_movil_dos" type="tel" maxlength="8" class="validate tooltipped validanumericos" data-length="8" data-tooltip="Número de teléfono celular del segundo encargado"/>
                            <label for="tel_encarg_movil_dos">Télefono Móvil</label>
                          </div>
                    </div>



                      <div id="inf_tecn" style="display:none" >


                     <span class="card-title">Información Técnica:</span>
                     <br />
                     <div class="valign-wrapper ">

                         <div class="input-field col s12 m6 l6"  >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                               <select id="ener_electrica" >                                
                                 <option value="" class="disabled selected" >Seleccione</option>
                                 <option value="SI">SI</option>
                                 <option value="NO">NO</option>
                                   <option value="Por Confirmar">Por Confirmar</option>
                                
                              </select>
                             <label>¿Posee Energía Eléctrica?                        
                             </label>
                         </div>
                         <div class="input-field col s12 m6 l6" >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                               <select id="Red_lab" >                                
                                 <option value="" class="disabled selected" >Seleccione</option>
                                 <option value="SI">SI</option>
                                 <option value="NO">NO</option>
                                 <option value="Por Confirmar">Por Confirmar</option>
                              </select>
                             <label>¿Posee Red Interna?                        
                             </label>
                         </div>                       

                      </div>
                     <div class="valign-wrapper ">
                         <div class="input-field  col s12 m6 l6" " >
                            <i class="material-icons prefix">desktop_windows</i>
                            <input id="cant_lab" type="number"  class="validate validanumericos" data-length="1" />
                            <label for="cant_lab">Cantidad de Laboratorios</label>
                          </div>
                         <div class="input-field col s12 m6 l6 " >
                            <i class="material-icons prefix">check</i>
                            <input id="pc_buenas" type="number"  class="validate validanumericos" data-length="2"/>
                            <label for="pc_buenas">Cantidad de Pc Buenas</label>
                          </div>

                           
                         
                     </div>
                      <div class="valign-wrapper ">
                         <div class="input-field col s12 m6 l6"  >
                            <i class="material-icons prefix">close</i>
                            <input id="pc_malas" type="number"  class="validate validanumericos" data-length="2" />
                            <label for="pc_malas">Cantidad de Pc Malas</label>
                          </div>
                           <div class="input-field col s12 m6 l6"  >
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                               <select id="tip_red" ">                                
                                 <option value="" class="disabled selected" >Seleccione</option>
                                 <option value="Alámbrica">Alámbrica</option>
                                 <option value="Inalámbrica">Inalámbrica</option>
                                
                              </select>
                             <label>Tipo de Red que Utiliza                        
                             </label>
                         </div>

                         

                     </div>
                     <div class="valign-wrapper ">
                      <div class="input-field col s12 m6 l6"   style="margin:initial">
                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                               <select id="doc_inf" >                                
                                 <option value="" class="disabled selected" >Seleccione</option>
                                 <option value="SI">SI</option>
                                 <option value="NO">NO</option>
                                  <option value="Por Confirmar">Por Confirmar</option>
                                
                              </select>
                             <label>¿Posee Docente de Infórmatica?                        
                             </label>
                         </div>

                         </div>
                           </div>

                     <div class="valign-wrapper ">
                         <div class="file-field input-field col s12 m6 l6 ">
                              <div class="btn" >
                                <span>File</span>
                                <input type="file" id="file" />
                              </div>
                              <div class="file-path-wrapper" >
                                <input class="file-path validate" type="text" id="archivo" />
                              </div>           
                        </div>
                      <div class=" input-field col s12 m6 l6 ">
                         <a title="Visualizar solicitudes"  class=" small blue lighten-2 btn modal-trigger agrega" style="position: static" href="#modal2" ><i class="material-icons">add_circle</i></a>
                         </div>
                     </div>
                     </div>

                     <div class="valign-wrapper " >
                         <div class=" input-field col s12 m6 l6 " style="margin:initial">
                                 <div id="image-holder" class="col s12 m6 l6 " style="overflow:auto; height:200px; width:auto;" hidden="hidden" ></div>
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
             <%--</div>--%>

            <div class="col s12 m7 l7 " id="Div1">
          <div class="card responsive-table">
              <div class="card-content black-text">
                  <span class="card-title center">Información Detallada</span>
                  <table id="datatable" class=" mdl-data-table display nowrap no-row-border"   style="width:100%; "  border: black 5px solid; >
                      <thead>
                         <tr>
                            <th>Acciones</th>
                             <th>Id</th> 
                              <th>Id_cont</th> 
                              <th>Id_encar</th> 
                              <th>Id_lab</th> 
                              <th>Id_soli</th>                              
			                 <th>Código SACE</th>
                             <th>Nombre Institución</th>
                             <th>Tipo Institución</th>                             
                             <th>Correo Electrónico</th>
                             <th>Departamentos</th>
                             <th>Municipio</th>
                             <th>Dirección Exacta</th>
                             <th>Latitud</th> 
                             <th>Longitud</th>
                             <th>Estado</th>
                             <th>Nombre Contacto</th>
                             <th>Ocupación Contacto</th> 
                             <th>Tel fijo</th>
                             <th>Tel Móvil</th>
                             <th>Finalidad Solicitud</th>
                             <th>Estado de la Solicitud</th>
                             <th>Nombre del Encargado 1</th>
                             <th>Correo Electrónico</th>
                             <th>Ocupación</th>
                             <th>Tel fijo</th>
                             <th>Tel Móvil</th>
                             <th>Nombre del Encargado 2</th>
                             <th>Correo Electrónico</th>
                             <th>Ocupación</th>
                             <th>Tel fijo</th>
                             <th>Tel Móvil</th>
                             <th>Energía Eléctrica</th>
                             <th>Red Interna</th>
                             <th>Cant Laboratorios</th>
                             <th>Cantidad de Pc Buenas</th>
                             <th>Cantidad de Pc Malas</th>
                             <th>Tipo de Red</th>
                             <th>¿Docente?</th>
                            
                        </tr>
                   </thead>
                
              </table>
            </div>
          </div>
        </div>

             <div id="modal2" class="modal">
    <div class="modal-content">
        <br />
        <div class="valign-wrapper ">
        <div class="input-field col col s6 m6 l6 " >
               <i class="material-icons prefix">search</i>
               <input id="txt_nombre_inst" type="text" class="validate" />
               <label for="txt_nombre_inst">Nombre de la institución</label>
         </div>
            <div class="col s6 m6 l6" >
                            <button class="btn waves-effect waves-light red" id="buscar" type="button" >Buscar
                             <i class="material-icons right">search</i>
                            </button>
            </div>
            </div>
      <span class="card-title center">Información Detallada</span>
              <table id="dataModal" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead class="center">
                         <tr >   
                             
                             
                             <th>Solicitud</th>
                            
                        </tr>
                   </thead>
                 
                      
              </table>   
    </div>
  </div>
      </div>

         </div>
         </div>
</asp:Content>
