Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Public Class Formulario_web1
    Inherits System.Web.UI.Page
    Private Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

#Region " Obtener Operadores en la Modal"
    <WebMethod()>
    Public Shared Function ObtenerDatosOperador(ByVal dropInciso As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "select distinct view_Operadores.Codigo as Value, view_Operadores.Operador as Text from view_Operadores inner join " &
                   "view_TB_TitulosHabilitantesOtorgados on view_Operadores.Codigo= view_TB_TitulosHabilitantesOtorgados.CodigoOperador " &
                   "inner join view_TB_Servicio on view_TB_Servicio.Codigo = view_TB_TitulosHabilitantesOtorgados.CodigoServicio " &
                    "WHERE view_TB_Servicio.Codigo = 'SVA-ARI'"
        Try
            Return query.ObtenerValoresDrop(consulta)
        Catch ex As Exception
            Dim errorBD As New List(Of ListItem)()
            errorBD.Add(New ListItem() With {
                           .Value = 1,
                           .Text = ex.Message.ToString()
                           })
            Return errorBD
        End Try
    End Function
#End Region

#Region " Obtener Datos solicitudes en la Modal datos obtenidos del modulo de registrosolicitudes"

    <WebMethod()>
    Public Shared Function modal_solicitudes() As Propiedadestabla()

        Dim sql = "SELECT [cod_inst],[cod_sace],[nom_inst],[tip_inst],[est_solic],[fin_solic] FROM [View_Solicitud] "
        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    fila.Id = rdr.Item("cod_inst").ToString()
                    fila.Código_SACE = rdr.Item("cod_sace").ToString()
                    fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Tipo_Institución = rdr.Item("tip_inst").ToString()
                    fila.Estado_Solicitud = rdr.Item("est_solic").ToString()
                    fila.Finalidad_Solicitud = rdr.Item("fin_solic").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "guardar la factibilidad "
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Agregarfactibilidad(datos As Propiedades_Factibilidad) As String
        Dim query As New Conexion
        Dim insertString As String

        Try

            insertString = "insert into ESTUDIO_FACTIVILIDAD(cod_inst,cod_operador,nom_operador,fech_asignacion,fech_respuesta,estado_factivilida)
                                values (@cod_inst,@cod_operador,@nom_operador,@fech_asignacion,@fech_respuesta,@estado_factivilida);"
            Dim param As SqlParameter() = New SqlParameter(5) {}
            param(0) = New SqlParameter("@cod_inst", datos.Id)
            param(1) = New SqlParameter("@cod_operador", datos.Cod_Operador)
            param(2) = New SqlParameter("@nom_operador", datos.Nom_Operador)
            param(3) = New SqlParameter("@fech_asignacion", datos.Fec_Asig)
            param(4) = New SqlParameter("@fech_respuesta", datos.Fec_Resp)
            param(5) = New SqlParameter("@estado_factivilida", datos.Est_Facti)
            Return query.insertar(insertString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function

#End Region

#Region "actualizar solicitud "
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function actualizar_solicitud(datos As Propiedadestabla) As String
        Dim query As New Conexion
        Dim updateString As String

        Try
            updateString = "update dbo.SOLICITUD set dbo.SOLICITUD.est_solic=@est_solic	from dbo.CONTACTO_INMEDIATO inner join dbo.SOLICITUD 
                            on dbo.CONTACTO_INMEDIATO.cod_cont=dbo.SOLICITUD.cod_cont inner join dbo.INSTITUCIONES 
                            on dbo.INSTITUCIONES.cod_inst= dbo.CONTACTO_INMEDIATO.cod_inst
                             where INSTITUCIONES.cod_inst=@cod_inst"
            Dim param As SqlParameter() = New SqlParameter(1) {}
            param(0) = New SqlParameter("@cod_inst", datos.Id)
            param(1) = New SqlParameter("@est_solic", datos.Estado_Solicitud)
            Return query.insertar(updateString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function

#End Region

#Region "select"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function agregar_tabla() As Propiedadestabla()
        Dim sql = "SELECT [dbo].[ESTUDIO_FACTIVILIDAD].[cod_factivilidad],[View_Solicitud].[cod_sace],
            [View_Solicitud].[nom_inst],[View_Solicitud].[tip_inst],[View_Solicitud].[est_solic],
             [dbo].[ESTUDIO_FACTIVILIDAD].[cod_operador],[dbo].[ESTUDIO_FACTIVILIDAD].[nom_operador],
             [dbo].[ESTUDIO_FACTIVILIDAD].[fech_asignacion],[dbo].[ESTUDIO_FACTIVILIDAD].[fech_respuesta]
            ,[dbo].[ESTUDIO_FACTIVILIDAD].[estado_factivilida]  FROM [View_Solicitud] inner join  
            [dbo].[ESTUDIO_FACTIVILIDAD] on View_Solicitud.cod_inst=ESTUDIO_FACTIVILIDAD.cod_inst"
        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    fila.Id = rdr.Item("cod_factivilidad").ToString()
                    fila.Código_SACE = rdr.Item("cod_sace").ToString()
                    fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Tipo_Institución = rdr.Item("tip_inst").ToString()
                    fila.Estado_Solicitud = rdr.Item("est_solic").ToString()
                    fila.Cod_Operador = rdr.Item("cod_operador").ToString()
                    fila.Fec_Asig = rdr.Item("fech_asignacion").ToString()
                    fila.Fec_Resp = rdr.Item("fech_respuesta").ToString()
                    fila.Est_Facti = rdr.Item("estado_factivilida").ToString()
                    fila.Nom_Operador = rdr.Item("nom_operador").ToString()

                    filas.Add(fila)
                End While
            End Using
            con.Close()

        End Using
        Return filas.ToArray()
    End Function

#End Region

#Region "Mostrar Datos a Modificar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ModificarDatos(ByVal cod_inst As String) As Propiedadestabla()
        Dim sql = "SELECT [dbo].[ESTUDIO_FACTIVILIDAD].[cod_factivilidad],[View_Solicitud].[cod_sace],[View_Solicitud].[nom_inst],[View_Solicitud].[tip_inst],
        [View_Solicitud].[est_solic],[dbo].[ESTUDIO_FACTIVILIDAD].[cod_operador]
         ,[dbo].[ESTUDIO_FACTIVILIDAD].[nom_operador],[dbo].[ESTUDIO_FACTIVILIDAD].[fech_asignacion],[dbo].[ESTUDIO_FACTIVILIDAD].[fech_respuesta]
         ,[dbo].[ESTUDIO_FACTIVILIDAD].[estado_factivilida]
         FROM [View_Solicitud] inner join  [dbo].[ESTUDIO_FACTIVILIDAD] on View_Solicitud.cod_inst=ESTUDIO_FACTIVILIDAD.cod_inst  where 
         [dbo].[ESTUDIO_FACTIVILIDAD].[cod_factivilidad]='" & cod_inst & "'"

        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    fila.Id = rdr.Item("cod_factivilidad").ToString()
                    fila.Código_SACE = rdr.Item("cod_sace").ToString()
                    fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Tipo_Institución = rdr.Item("tip_inst").ToString()
                    fila.Estado_Solicitud = rdr.Item("est_solic").ToString()
                    fila.Cod_Operador = rdr.Item("cod_operador").ToString()
                    fila.Nom_Operador = rdr.Item("nom_operador").ToString()
                    fila.Est_Facti = rdr.Item("estado_factivilida").ToString()
                    fila.Fec_Asig = rdr.Item("fech_asignacion").ToString()
                    fila.Fec_Resp = rdr.Item("fech_respuesta").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "actualizar datos de factibilidad "
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function actualizar_fiablilidad(datos As Propiedades_Factibilidad) As String
        Dim query As New Conexion
        Dim updateString As String

        Try
            updateString = "BEGIN TRANSACTION
                            BEGIN TRY
                            Update ESTUDIO_FACTIVILIDAD set cod_operador=@cod_operador,
                            nom_operador=@nom_operador,fech_asignacion=@fech_asig,fech_respuesta=@fech_resp,
                            estado_factivilida=@est_facti  from ESTUDIO_FACTIVILIDAD  where cod_factivilidad=@id;

                          Update dbo.SOLICITUD set dbo.SOLICITUD.est_solic=@estado from dbo.CONTACTO_INMEDIATO inner join dbo.SOLICITUD 
                          on dbo.CONTACTO_INMEDIATO.cod_cont=dbo.SOLICITUD.cod_cont inner join dbo.INSTITUCIONES 
                          on dbo.INSTITUCIONES.cod_inst= dbo.CONTACTO_INMEDIATO.cod_inst inner join dbo.ESTUDIO_FACTIVILIDAD 
                          on dbo.INSTITUCIONES.cod_inst=dbo.ESTUDIO_FACTIVILIDAD.cod_inst
                          where ESTUDIO_FACTIVILIDAD.cod_factivilidad=@id;

                            COMMIT TRANSACTION
                            END TRY
                            BEGIN CATCH
                            ROLLBACK TRANSACTION
                            END CATCH"
            Dim param As SqlParameter() = New SqlParameter(6) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@cod_operador", datos.Cod_Operador)
            param(2) = New SqlParameter("@nom_operador", datos.Nom_Operador)
            param(3) = New SqlParameter("@fech_asig", datos.Fec_Asig)
            param(4) = New SqlParameter("@fech_resp", datos.Fec_Resp)
            param(5) = New SqlParameter("@est_facti", datos.Est_Facti)
            param(6) = New SqlParameter("@estado", datos.Estado)

            Return query.insertar(updateString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function

#End Region

End Class