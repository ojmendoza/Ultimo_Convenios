<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/PaginaPricipal.Master" CodeBehind="MapaSitios.aspx.vb" Inherits="Aplicacion_SICO_NAG.MapaSitios" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <link href="../../css/jquery.gmaps.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel='stylesheet' />
    <link href="//fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
    <script src="../js/jquery.gmaps.js"></script>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div data-key="AIzaSyBS_CXnJTj_hEo8zYJbZQz6TVJ7aVGJSRY"
        data-control-zoom="true"
        data-control-type="true"
        data-control-scale="true"
        data-control-streetview="true"
        data-control-rotate="true"
        data-event-mousewheel="true"
        data-control-fullscreen="true"
        data-clustering="true"
        data-control-pan="true"
        data-zoom="9" role="map" class="gmaps">



        <%--items de ubicaciones--%>
        <asp:Repeater ID="Repeater1" runat="server">
            <ItemTemplate>
                <div
                    data-lat="<%#DataBinder.Eval(Container.DataItem, "latitud_inst")%>"
                    data-lng="<%#DataBinder.Eval(Container.DataItem, "longitud_inst")%>"
                    data-marker-image="https://img.icons8.com/office/27/000000/graduation-cap.png"
                    data-marker-width="15"
                    data-marker-height="30"
                    class="marker">

                    <div class="map-card">

                        <h5>Centro Educativo: "<%#DataBinder.Eval(Container.DataItem, "nom_inst")%>"</h5>
                        <p>Codigo Sace: "<%#DataBinder.Eval(Container.DataItem, "cod_sace")%></p>
                        <p>Operador: "<%#DataBinder.Eval(Container.DataItem, "Operador")%>"</p>
                        <p>MB entregadas: "<%#DataBinder.Eval(Container.DataItem, "Ancho_Banda_Entregado")%>"</p>


                    </div>
                </div>
            </ItemTemplate>

        </asp:Repeater>


        <asp:Repeater ID="Repeater2" runat="server">
            <ItemTemplate>
                <div
                    data-lat="<%#DataBinder.Eval(Container.DataItem, "latitud_inst")%>"
                    data-lng="<%#DataBinder.Eval(Container.DataItem, "longitud_inst")%>"
                    data-marker-image="https://img.icons8.com/office/25/000000/coniferous-tree.png"
                    data-marker-width="15"
                    data-marker-height="30"
                    class="marker">

                    <div class="map-card">
                        
                        <h5>Sitio: "<%#DataBinder.Eval(Container.DataItem, "nom_inst")%>"</h5>
                        <p>Operador: "<%#DataBinder.Eval(Container.DataItem, "Operador")%>"</p>
                        <p>MB entregadas: "<%#DataBinder.Eval(Container.DataItem, "Ancho_Banda_Entregado")%>"</p>
                    </div>
                </div>

            </ItemTemplate>

        </asp:Repeater>

        <asp:Repeater ID="Repeater3" runat="server">

            <ItemTemplate>
                <div id="mapLegend">

                    <h6><b>Cobertura</b></h6>


                    <span>
                        <img src="https://img.icons8.com/office/18/000000/graduation-cap.png">&nbsp;Centros Educativos: &nbsp;<%#DataBinder.Eval(Container.DataItem, "escuelas")%></span><br />
                    <br />

                    <span>
                        <img src="https://img.icons8.com/office/18/000000/coniferous-tree.png">&nbsp;Sitios: &nbsp; <%#DataBinder.Eval(Container.DataItem, "lugares")%></span><br />
                </div>
            </ItemTemplate>

        </asp:Repeater>

        <script>

            $(document).ready(function () {

                $('.gmaps').gmaps();


            });

        </script>


        <style>
            .gmaps {
                height: 491px;
                width: 100%;
            }

            #mapLegend {
                position: fixed;
                top: 67%;
                left: -0.5%;
                background: #fdfdfd;
                color: #3c4750;
                padding: 0 10px 0 10px;
                margin: 10px;
                width: auto;
                height: auto;
                font-weight: normal;
                filter: alpha(opacity=80);
                opacity: 0.8;
                border: 2px solid #92a8d1;
                border-radius: 10px 10px 10px 10px;
                -moz-border-radius: 10px 10px 10px 10px;
                -webkit-border-radius: 10px 10px 10px 10px;
                font-family: Roboto;
            }

                #mapLegend div {
                    height: 30px;
                    line-height: 20px;
                    font-size: 0.9em;
                }

                    #mapLegend div img {
                        float: left;
                        margin-right: 10px;
                    }

                #mapLegend h2 {
                    text-align: center
                }
        </style>
            </div>

</asp:Content>
