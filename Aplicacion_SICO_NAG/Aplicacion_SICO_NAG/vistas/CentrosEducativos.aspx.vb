Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Public Class CentrosEducativos
    Inherits System.Web.UI.Page
    Private Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      
    End Sub

#Region "Insertar"
    <WebMethod()> _
    Public Shared Function GuardarCentros(datosCentros As Propiedades) As String
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim res As Integer = 0
        Dim cone As New Conexion
        Dim insertString As String
        
        Try
            Using conexion As SqlConnection = New SqlConnection(cadena)
                conexion.Open()
                insertString = "IF NOT EXISTS( SELECT dbo.instituciones.cod_Sace, dbo.datos_conectividad.Anio FROM dbo.datos_conectividad inner join dbo.instituciones on 
                dbo.instituciones.cod_inst = dbo.datos_conectividad.cod_inst WHERE dbo.datos_conectividad.Anio=@Anio AND dbo.instituciones.cod_sace=@Codigo_Sase)
                INSERT INTO DATOS_CONECTIVIDAD(cod_inst,Anio,Total_Matricula,Nivel,Fecha_Instalacion,Operador,Codigo,Medio_Conexion,Tipo_Cliente," &
                "Ancho_Banda_Entregado,Conectado,Estatus,Observaciones) values(@cod_inst,@Anio,@Total_Matricula,@Nivel,@Fecha_Instalacion,@Operador,@Codigo,@Medio_Conexion,@Tipo_Cliente,@Ancho_Banda_Entregado," &
                "@Conectado,@Estatus,@Observaciones) 
                ELSE  
                Print 'Ya existe' "
                Dim comando As SqlCommand = New SqlCommand(insertString, conexion)
                comando.Parameters.AddWithValue("@cod_inst", datosCentros.Id)
                comando.Parameters.AddWithValue("@Codigo_Sase", datosCentros.Sace)
                comando.Parameters.AddWithValue("@Anio", datosCentros.Anio)
                comando.Parameters.AddWithValue("@Total_Matricula", datosCentros.Total_Matricula)
                comando.Parameters.AddWithValue("@Nivel", datosCentros.Nivel)
                comando.Parameters.AddWithValue("@Fecha_Instalacion", datosCentros.Fecha_Instalacion)
                comando.Parameters.AddWithValue("@Operador", datosCentros.Operador)
                comando.Parameters.AddWithValue("@Codigo", datosCentros.Codigo)
                comando.Parameters.AddWithValue("@Medio_conexion", datosCentros.Medio_conexion)
                comando.Parameters.AddWithValue("@Tipo_Cliente", datosCentros.Tipo_Cliente)
                comando.Parameters.AddWithValue("@Ancho_Banda_Entregado", datosCentros.Ancho_Banda_Entregado)
                comando.Parameters.AddWithValue("@Conectado", datosCentros.Conectado)
                comando.Parameters.AddWithValue("@Estatus", datosCentros.Estatus)
                comando.Parameters.AddWithValue("@Observaciones", datosCentros.Observaciones)

                res = comando.ExecuteNonQuery
                conexion.Close()

            End Using

            Return res
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ObtenerCentros(ByVal Id_Centros As String) As Propiedades()
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT dbo.DATOS_CONECTIVIDAD.cod_conectiviada,dbo.INSTITUCIONES.cod_sace,dbo.INSTITUCIONES.nom_inst,dbo.DATOS_CONECTIVIDAD.Anio, dbo.DATOS_CONECTIVIDAD.Total_Matricula, dbo.DATOS_CONECTIVIDAD.Nivel, dbo.DATOS_CONECTIVIDAD.Fecha_Instalacion, dbo.DATOS_CONECTIVIDAD.Operador, 
                  dbo.DATOS_CONECTIVIDAD.Codigo, dbo.DATOS_CONECTIVIDAD.Medio_Conexion, dbo.DATOS_CONECTIVIDAD.Tipo_Cliente, dbo.DATOS_CONECTIVIDAD.Ancho_Banda_Entregado, dbo.DATOS_CONECTIVIDAD.Conectado, 
                  dbo.DATOS_CONECTIVIDAD.Estatus, dbo.DATOS_CONECTIVIDAD.Observaciones
                  FROM     dbo.INSTITUCIONES INNER JOIN dbo.DATOS_CONECTIVIDAD ON dbo.INSTITUCIONES.cod_inst = dbo.DATOS_CONECTIVIDAD.cod_inst
                  WHERE  (dbo.INSTITUCIONES.cod_sace <> ' ')"

        Dim filas As List(Of Propiedades) = New List(Of Propiedades)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedades()
                    fila.Id = rdr.Item("cod_conectiviada").ToString()
                    fila.Centro = rdr.Item("nom_inst").ToString()
                    fila.Sace = rdr.Item("cod_sace").ToString()
                    fila.Anio = rdr.Item("Anio").ToString()
                    fila.Total_Matricula = rdr.Item("Total_Matricula").ToString()
                    fila.Nivel = (rdr.Item("Nivel").ToString())
                    fila.Fecha_Instalacion = rdr.Item("Fecha_Instalacion").ToString()
                    fila.Operador = rdr.Item("Operador").ToString()
                    fila.Codigo = rdr.Item("Codigo").ToString()
                    fila.Medio_conexion = rdr.Item("Medio_Conexion").ToString()
                    fila.Tipo_Cliente = rdr.Item("Tipo_Cliente").ToString()
                    fila.Ancho_Banda_Entregado = rdr.Item("Ancho_Banda_Entregado").ToString()
                    fila.Conectado = rdr.Item("Conectado").ToString()
                    fila.Estatus = rdr.Item("Estatus").ToString()
                    fila.Observaciones = rdr.Item("Observaciones").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Update "
    <WebMethod()>
    Public Shared Function UpdateDatosCE(datosCE As Propiedades) As String
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim res As Integer = 0
        Dim UpdateString As String
        Try
            Using conexion As SqlConnection = New SqlConnection(cadena)
                conexion.Open()
                UpdateString = "UPDATE DATOS_CONECTIVIDAD SET Total_Matricula=@Total_Matricula,Nivel=@Nivel " &
                             ",Fecha_Instalacion=@Fecha_Instalacion,Operador=@Operador,Codigo=@Codigo,Medio_conexion=@Medio_conexion " &
                             ",Tipo_Cliente=@Tipo_Cliente,Ancho_Banda_Entregado=@Ancho_Banda_Entregado,Conectado=@Conectado " &
                             ",Estatus=@Estatus,Observaciones=@Observaciones,Anio=@Anio" &
                             " WHERE cod_conectiviada=@Id"

                Dim comando As SqlCommand = New SqlCommand(UpdateString, conexion)
                comando.Parameters.AddWithValue("@Id", datosCE.Id)
                comando.Parameters.AddWithValue("@Total_Matricula", datosCE.Total_Matricula)
                comando.Parameters.AddWithValue("@Nivel", datosCE.Nivel)
                comando.Parameters.AddWithValue("@Fecha_Instalacion", datosCE.Fecha_Instalacion)
                comando.Parameters.AddWithValue("@Operador", datosCE.Operador)
                comando.Parameters.AddWithValue("@Codigo", datosCE.Codigo)
                comando.Parameters.AddWithValue("@Medio_conexion", datosCE.Medio_conexion)
                comando.Parameters.AddWithValue("@Tipo_Cliente", datosCE.Tipo_Cliente)
                comando.Parameters.AddWithValue("@Ancho_Banda_Entregado", datosCE.Ancho_Banda_Entregado)
                comando.Parameters.AddWithValue("@Conectado", datosCE.Conectado)
                comando.Parameters.AddWithValue("@Estatus", datosCE.Estatus)
                comando.Parameters.AddWithValue("@Observaciones", datosCE.Observaciones)
                comando.Parameters.AddWithValue("@Anio", datosCE.Anio)

                res = comando.ExecuteNonQuery
            End Using
            Return res
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Mostrar Datos a Modificar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ModificarDatos(ByVal Id_Centros As String) As Propiedades()
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT  cod_conectiviada,Total_Matricula, Nivel, Fecha_Instalacion,Operador,Codigo, Medio_Conexion, Tipo_Cliente, " &
        "Ancho_Banda_Entregado,Conectado,Estatus,Observaciones,Anio FROM DATOS_CONECTIVIDAD " &
        "where DATOS_CONECTIVIDAD.cod_conectiviada= '" & Id_Centros & "'"

        Dim filas As List(Of Propiedades) = New List(Of Propiedades)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedades()
                    fila.Id = rdr.Item("cod_conectiviada").ToString()
                    fila.Total_Matricula = rdr.Item("Total_Matricula").ToString()
                    fila.Nivel = rdr.Item("Nivel").ToString()
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

#Region "Update Estado_CONECTADO "
    <WebMethod()>
    Public Shared Function ActivarEstado(datosCE As Propiedades) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = " UPDATE DATOS_CONECTIVIDAD " &
                           " SET Estatus = 'Conectado'  " &
                           " WHERE cod_conectiviada = @Id  "
            Dim param As SqlParameter() = New SqlParameter(0) {}
            param(0) = New SqlParameter("@Id", datosCE.Id)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Update Estado_DESCONECTADO "
    <WebMethod()>
    Public Shared Function DesactivarEstado(datosCE As Propiedades) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = " UPDATE DATOS_CONECTIVIDAD " &
                           " SET Estatus = 'Desconectado' " &
                           " WHERE cod_conectiviada = @Id  "
            Dim param As SqlParameter() = New SqlParameter(0) {}
            param(0) = New SqlParameter("@Id", datosCE.Id)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Departamento"
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

#Region " Obtener Operadores en la Modal"

    <WebMethod()> _
    Public Shared Function ObtenerDatosOperador(ByVal dropInciso As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "  SELECT cod_operador as Value,nom_operador as Text FROM ESTUDIO_FACTIVILIDAD 
                      WHERE estado_factivilida='FACTIBLE' AND cod_inst=" & dropInciso & ";"
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

#Region " Obtener Datos solicitudes en la Modal datos obtenidos del modulo de registrosolicitudes"

    <WebMethod()>
    Public Shared Function modal_solicitudes() As Propiedadestabla()
        'Dim cadenaConexion As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT [cod_inst],[cod_sace],[nom_inst] FROM [View_Solicitud] where  View_Solicitud.cod_sace !='' ;"
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

                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

End Class