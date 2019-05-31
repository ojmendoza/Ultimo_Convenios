<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="Modificar_Borrador.aspx.vb" Inherits="Default2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="../Scripts/Modificar_Borrador.js"></script>
      <link href="../Css/loader.css" rel="stylesheet" />
 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     <div class="convenios">
        <h4 class="center" style="font-family:Cooper">Actualizar Borrador</h4>
        <br />
        <div class="row">
           <div class="col s12 m12 l12">
            <div class="col s12 m5 l5">
                 <div class="card">
                     <div class ="card-content black-text">
                         <span class="card-title">Datos del Documento </span>
                         <br />
                             <div class="valign-wrapper ">
                               
                                 <div class="input-field col s6 m6 l9" style="margin:initial" >
                                    <i class="material-icons prefix">account_balance</i>
                                    <input id="nom_contra"   type="text"  class="validate tooltipped letras mayus" data-tooltip="Nombre del Contrato" /> 
                                    <label for="nom_contra">Nombre del Contrato o Convenio</label>
                                  </div>
                            </div>
                         <div class="valign-wrapper">
                              <div class="input-field col s6 m6 l9" style="margin:initial">
                                <i class="material-icons prefix">directions</i>
                                <textarea id="Observaciones" class="materialize-textarea tooltipped" data-length="100000" data-tooltip="observaciones del Documento "></textarea>
                                 <label for="observaciones">observaciones del Documento</label>
                             </div>
                          </div>
                    
                            <div class="valign-wrapper ">
                            
                                <textarea id="bina" class="materialize-textarea love"  data-length="500000000" style="display:none"></textarea>
                                <input id="id" type="text" style="display:none" />
                            </div>
                         <div class="valign-wrapper ">
                             <div class="file-field input-field col s12 m6 l9" style="margin:initial">
                              <div class="btn" >
                                <span>Documento</span>
                                <input type="file" id="file" />
                              </div>
                              <div class="file-path-wrapper" >
                                <input class="file-path validate" type="text" id="borrador"/>
                              </div>           
                            </div>                           
                             <div id="preload" class=""></div>
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
            <div class="col s12 m7 l7 " id="Div1">
          <div class="card responsive-table">
              <div class="card-content black-text">
                  <span class="card-title center">Información Detallada</span>
                  <table id="datatable1" class=" mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead>
                         <tr>
                            <th>Actualizar</th>
                             <th>Id</th>                                                          
			                 <th>Titulo del Documento</th>
                             <th>Tipo de Documento</th>  
                             <th>Obervaciónes </th>      
                             
                        
                        </tr>
                   </thead>
                
              </table>
            </div>
          </div>
        </div>
           </div>
    
        </div>
         </div>

</asp:Content>

