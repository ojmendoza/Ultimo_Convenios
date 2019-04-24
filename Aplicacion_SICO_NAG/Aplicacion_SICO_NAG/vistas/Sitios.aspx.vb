Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Public Class OtrosCentros
    Inherits System.Web.UI.Page
    Private Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

#Region "Insertar"
    <WebMethod()>
    Public Shared Function GuardarSitios(datosSitios As Propiedades) As String
        Dim query As New Conexion
        Dim insertString As String

        Try
            insertString = "INSERT INTO DATOS_CONECTIVIDAD(cod_inst,Anio,Fecha_Instalacion,Operador,Codigo,Medio_Conexion,Tipo_Cliente," &
                "Ancho_Banda_Entregado,Conectado,Estatus,Observaciones) values(@cod_inst,@Anio,@Fecha_Instalacion,@Operador,@Codigo,@Medio_Conexion,@Tipo_Cliente,@Ancho_Banda_Entregado," &
                "@Conectado,@Estatus,@Observaciones)"

            Dim param As SqlParameter() = New SqlParameter(10) {}
            param(0) = New SqlParameter("@Anio", datosSitios.Anio)
            param(1) = New SqlParameter("@Fecha_Instalacion", datosSitios.Fecha_Instalacion)
            param(2) = New SqlParameter("@Operador", datosSitios.Operador)
            param(3) = New SqlParameter("@Codigo", datosSitios.Codigo)
            param(4) = New SqlParameter("@Medio_conexion", datosSitios.Medio_conexion)
            param(5) = New SqlParameter("@Tipo_Cliente", datosSitios.Tipo_Cliente)
            param(6) = New SqlParameter("@Ancho_Banda_Entregado", datosSitios.Ancho_Banda_Entregado)
            param(7) = New SqlParameter("@Conectado", datosSitios.Conectado)
            param(8) = New SqlParameter("@Estatus", datosSitios.Estatus)
            param(9) = New SqlParameter("@Observaciones", datosSitios.Observaciones)
            param(10) = New SqlParameter("@cod_inst", datosSitios.Id)

            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ObtenerSitios(ByVal Id_Sitios As String) As Propiedades()
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT dbo.DATOS_CONECTIVIDAD.cod_conectiviada,dbo.INSTITUCIONES.nom_inst,dbo.INSTITUCIONES.tip_inst,dbo.DATOS_CONECTIVIDAD.Anio, dbo.DATOS_CONECTIVIDAD.Fecha_Instalacion, dbo.DATOS_CONECTIVIDAD.Operador, 
                  dbo.DATOS_CONECTIVIDAD.Codigo, dbo.DATOS_CONECTIVIDAD.Medio_Conexion, dbo.DATOS_CONECTIVIDAD.Tipo_Cliente, dbo.DATOS_CONECTIVIDAD.Ancho_Banda_Entregado, dbo.DATOS_CONECTIVIDAD.Conectado, 
                  dbo.DATOS_CONECTIVIDAD.Estatus, dbo.DATOS_CONECTIVIDAD.Observaciones
                  FROM     dbo.INSTITUCIONES INNER JOIN dbo.DATOS_CONECTIVIDAD ON dbo.INSTITUCIONES.cod_inst = dbo.DATOS_CONECTIVIDAD.cod_inst
                  WHERE  (dbo.INSTITUCIONES.cod_sace ='')"

        Dim filas As List(Of Propiedades) = New List(Of Propiedades)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedades()
                    fila.Id = rdr.Item("cod_conectiviada").ToString()
                    fila.Centro = rdr.Item("nom_inst").ToString()
                    fila.Sace = rdr.Item("tip_inst").ToString()
                    fila.Fecha_Instalacion = rdr.Item("Fecha_Instalacion").ToString()
                    fila.Operador = rdr.Item("Operador").ToString()
                    fila.Codigo = rdr.Item("Codigo").ToString()
                    fila.Medio_conexion = rdr.Item("Medio_conexion").ToString()
                    fila.Tipo_Cliente = rdr.Item("Tipo_Cliente").ToString()
                    fila.Ancho_Banda_Entregado = rdr.Item("Ancho_Banda_Entregado").ToString()
                    fila.Conectado = rdr.Item("Conectado").ToString()
                    fila.Estatus = rdr.Item("Estatus").ToString()
                    fila.Observaciones = rdr.Item("Observaciones").ToString()
                    fila.Anio = rdr.Item("Anio").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Update "
    <WebMethod()>
    Public Shared Function UpdateDatosSitios(datosSitios As Propiedades) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = "UPDATE DATOS_CONECTIVIDAD SET Fecha_Instalacion=@Fecha_Instalacion,Operador=@Operador,Codigo=@Codigo,Medio_conexion=@Medio_conexion " &
                             ",Tipo_Cliente=@Tipo_Cliente,Ancho_Banda_Entregado=@Ancho_Banda_Entregado,Conectado=@Conectado " &
                             ",Estatus=@Estatus,Observaciones=@Observaciones,Anio=@Anio" &
                             " WHERE cod_conectiviada=@Id"
            Dim param As SqlParameter() = New SqlParameter(10) {}
            param(0) = New SqlParameter("@Id", datosSitios.Id)
            param(1) = New SqlParameter("@Fecha_Instalacion", datosSitios.Fecha_Instalacion)
            param(2) = New SqlParameter("@Operador", datosSitios.Operador)
            param(3) = New SqlParameter("@Codigo", datosSitios.Codigo)
            param(4) = New SqlParameter("@Medio_conexion", datosSitios.Medio_conexion)
            param(5) = New SqlParameter("@Tipo_Cliente", datosSitios.Tipo_Cliente)
            param(6) = New SqlParameter("@Ancho_Banda_Entregado", datosSitios.Ancho_Banda_Entregado)
            param(7) = New SqlParameter("@Conectado", datosSitios.Conectado)
            param(8) = New SqlParameter("@Estatus", datosSitios.Estatus)
            param(9) = New SqlParameter("@Observaciones", datosSitios.Observaciones)
            param(10) = New SqlParameter("@Anio", datosSitios.Anio)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Update Estado_CONECTADO "
    <WebMethod()>
    Public Shared Function ActivarEstado(IdSitios As Propiedades) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = " UPDATE DATOS_CONECTIVIDAD " &
                           " SET Estatus = 'Conectado'  " &
                           " WHERE cod_conectiviada = @Id"
            Dim param As SqlParameter() = New SqlParameter(0) {}
            param(0) = New SqlParameter("@Id", IdSitios.Id)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Update Estado_Desconectado "
    <WebMethod()>
    Public Shared Function DesactivarEstado(IdSitios As Propiedades) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = " UPDATE DATOS_CONECTIVIDAD " &
                           " SET Estatus = 'Desconectado'  " &
                           " WHERE cod_conectiviada = @Id  "
            Dim param As SqlParameter() = New SqlParameter(0) {}
            param(0) = New SqlParameter("@Id", IdSitios.Id)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Departamentos"
    <WebMethod()> _
    Public Shared Function ObtenerDatosDrop(ByVal dropInciso As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "SELECT IDDept As Value, Nombre  As Text FROM view_Departamentos"

        Try
            Return query.ObtenerValoresDrop(consulta)
        Catch ex As Exception
            Dim errorBD As New List(Of ListItem)()
            errorBD.Add(New ListItem() With { _
                           .Value = 1, _
                           .Text = ex.Message.ToString() _
                           })
            Return errorBD
        End Try
    End Function
#End Region

#Region "Municipios"
    <WebMethod()> _
    Public Shared Function ObtenerDatosDropM(ByVal dropInciso As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "SELECT view_Municipios.IDMunicipio As Value, view_Municipios.Nombre As  Text FROM view_Departamentos " & _
            "INNER JOIN view_Municipios ON view_Departamentos.IDDept= view_Municipios.IDDept WHERE (view_Departamentos.IDDept='" & dropInciso & "')"
        Try
            Return query.ObtenerValoresDrop(consulta)
        Catch ex As Exception
            Dim errorBD As New List(Of ListItem)()
            errorBD.Add(New ListItem() With { _
                           .Value = 1, _
                           .Text = ex.Message.ToString() _
                           })
            Return errorBD
        End Try
    End Function
#End Region

#Region "Obtener Operadores con Modal"
    <WebMethod()> _
    Public Shared Function ObtenerDatosOperador(ByVal dropInciso As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "  SELECT cod_operador as Value,nom_operador as Text FROM ESTUDIO_FACTIVILIDAD 
                      WHERE estado_factivilida ='FACTIBLE' AND cod_inst ='" & dropInciso & "';"

        Try
            Return query.ObtenerValoresDrop(consulta)
        Catch ex As Exception
            Dim errorBD As New List(Of ListItem)()
            errorBD.Add(New ListItem() With { _
                           .Value = 1, _
                           .Text = ex.Message.ToString() _
                           })
            Return errorBD
        End Try
    End Function
#End Region

#Region "Mostrar Datos a Modificar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ModificarDatos(ByVal Id_sitios As String) As Propiedades()
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT  cod_conectiviada,Anio,Fecha_Instalacion,Operador,Codigo, Medio_Conexion, Tipo_Cliente, " &
        "Ancho_Banda_Entregado,Conectado,Estatus,Observaciones FROM DATOS_CONECTIVIDAD " &
        "where DATOS_CONECTIVIDAD.cod_conectiviada='" & Id_sitios & "'"

        Dim filas As List(Of Propiedades) = New List(Of Propiedades)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedades()
                    fila.Id = rdr.Item("cod_conectiviada").ToString()
                    fila.Fecha_Instalacion = rdr.Item("Fecha_Instalacion").ToString()
                    fila.Operador = rdr.Item("Operador").ToString()
                    fila.Codigo = rdr.Item("Codigo").ToString()
                    fila.Medio_conexion = rdr.Item("Medio_conexion").ToString()
                    fila.Tipo_Cliente = rdr.Item("Tipo_Cliente").ToString()
                    fila.Ancho_Banda_Entregado = rdr.Item("Ancho_Banda_Entregado").ToString()
                    fila.Conectado = rdr.Item("Conectado").ToString()
                    fila.Estatus = rdr.Item("Estatus").ToString()
                    fila.Observaciones = rdr.Item("Observaciones").ToString()
                    fila.Anio = rdr.Item("Anio").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region " Obtener Datos solicitudes en la Modal datos obtenidos del modulo de registrosolicitudes"
    <WebMethod()>
    Public Shared Function modal_solicitudes() As Propiedadestabla()
        'Dim cadenaConexion As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = " SELECT [cod_inst],[nom_inst],[tip_inst] FROM [View_Solicitud] 
                  where  View_Solicitud.cod_sace ='' ;"
        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Tipo_Institución = rdr.Item("tip_inst").ToString()
                    fila.Id = rdr.Item("cod_inst").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

End Class