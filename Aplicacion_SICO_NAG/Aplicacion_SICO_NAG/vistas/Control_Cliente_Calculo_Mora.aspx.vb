Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Public Class Control_Cliente_Calculo_Mora
    Inherits System.Web.UI.Page
    Private Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

#Region "Insertar"
    <WebMethod()> _
    Public Shared Function GuardarCalculo(datos As PropiedadesCalculo) As String
        Dim query As New Conexion
        Dim insertString As String
        Try
            insertString = "INSERT INTO Control_clinte_calculo_mora(Anio, Operador,Codigo,Cliente_reportado,Usuario_Re_AnioConsultado," & _
                           "Usuario_Re_AnioAnteior,Resta_Consulatdo_Anterior,Porcentaje_Año_Usuario_Reportado,Mbps_Adeudados, " & _
                           "Sum_porcentaje_Mas_Mbps_Adeudado,Megas_entregados,Calculo_mora,Fecha) " & _
                           "VALUES(@Anio,@Operador,@Codigo,@Cliente_reportado, @Usuario_Re_AnioConsultado," & _
                           "@Usuario_Re_AnioAnteior,@Resta_Consulatdo_Anterior,@Porcentaje_Año_Usuario_Reportado,@Mbps_Adeudados, " & _
                           "@Sum_porcentaje_Mas_Mbps_Adeudado,@Megas_entregados,@Calculo_mora,getdate())"

            Dim param As SqlParameter() = New SqlParameter(11) {}
            param(0) = New SqlParameter("@Anio", datos.Anio)
            param(1) = New SqlParameter("@Operador", datos.Operador)
            param(2) = New SqlParameter("@Codigo", datos.Codigo)
            param(3) = New SqlParameter("@Cliente_reportado", datos.Cliente_reportado)
            param(4) = New SqlParameter("@Usuario_Re_AnioConsultado", datos.Usuario_Re_AnioConsultado)
            param(5) = New SqlParameter("@Usuario_Re_AnioAnteior", datos.Usuario_Re_AnioAnteior)
            param(6) = New SqlParameter("@Resta_Consulatdo_Anterior", datos.Resta_Consulatdo_Anterior)
            param(7) = New SqlParameter("@Porcentaje_Año_Usuario_Reportado", datos.Porcentaje_Año_Usuario_Reportado)
            param(8) = New SqlParameter("@Mbps_Adeudados", datos.Mbps_Adeudados)
            param(9) = New SqlParameter("@Sum_porcentaje_Mas_Mbps_Adeudado", datos.Sum_porcentaje_Mas_Mbps_Adeudado)
            param(10) = New SqlParameter("@Megas_entregados", datos.Megas_entregados)
            param(11) = New SqlParameter("@Calculo_mora", datos.Calculo_mora)
           Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Select para cargar el datatable"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ObtenerCalculoMora(ByVal Id_Calculo As String) As PropiedadesCalculo()
        Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT Id_Cont_cli_cal_mo,Anio,Operador,Codigo,Cliente_reportado,Usuario_Re_AnioConsultado,Usuario_Re_AnioAnteior," & _
                  "Resta_Consulatdo_Anterior,Porcentaje_Año_Usuario_Reportado,Mbps_Adeudados,Sum_porcentaje_Mas_Mbps_Adeudado, " & _
                  "Megas_entregados,Calculo_mora,Fecha FROM Control_clinte_calculo_mora"
        Dim filas As List(Of PropiedadesCalculo) = New List(Of PropiedadesCalculo)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesCalculo()
                    fila.Id_Cont_cli_cal_mo = rdr.Item("Id_Cont_cli_cal_mo").ToString()
                    fila.Anio = rdr.Item("Anio").ToString()
                    fila.Operador = rdr.Item("Operador").ToString()
                    fila.Codigo = rdr.Item("Codigo").ToString()
                    fila.Cliente_reportado = rdr.Item("Cliente_reportado").ToString()
                    fila.Usuario_Re_AnioConsultado = rdr.Item("Usuario_Re_AnioConsultado").ToString()
                    fila.Usuario_Re_AnioAnteior = rdr.Item("Usuario_Re_AnioAnteior").ToString()
                    fila.Resta_Consulatdo_Anterior = rdr.Item("Resta_Consulatdo_Anterior").ToString()
                    fila.Porcentaje_Año_Usuario_Reportado = rdr.Item("Porcentaje_Año_Usuario_Reportado").ToString()
                    fila.Mbps_Adeudados = rdr.Item("Mbps_Adeudados").ToString()
                    fila.Sum_porcentaje_Mas_Mbps_Adeudado = rdr.Item("Sum_porcentaje_Mas_Mbps_Adeudado").ToString()
                    fila.Megas_entregados = rdr.Item("Megas_entregados").ToString()
                    fila.Calculo_mora = rdr.Item("Calculo_mora").ToString()
                    fila.Fecha = rdr.Item("Fecha").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Obtener Operadores con  Modal"
    <WebMethod()> _
    Public Shared Function ObtenerDatosOperador(ByVal dropInciso As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "SELECT  view_Operadores.Codigo as Value,  view_Operadores.Operador as Text FROM view_Operadores INNER JOIN " & _
                  "view_Registros ON view_Operadores.Codigo = view_Registros.CodigoOperador INNER JOIN " & _
                  "view_TB_Servicio ON view_TB_Servicio.Codigo = view_Registros.CodigoServicio WHERE view_TB_Servicio.Codigo = 'SVA-ARI'" & _
                  "and view_Registros.Periodo=4 and view_Registros.Anio='" & dropInciso & "' "

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

#Region "Suma de Megas de los Centros y Sitios"
    <WebMethod()> _
    Public Shared Function ObtenerMegas(ByVal dropInciso As String, ByVal dropcliente As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT  SUM(Ancho_Banda_Entregado) As Text FROM 
                       (SELECT Codigo, Ancho_Banda_Entregado, Tipo_Cliente FROM DATOS_CONECTIVIDAD) t
                 WHERE Codigo=@Codigo and Tipo_cliente=@Tipo_cliente
                group by Codigo,Tipo_cliente"

        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Codigo", dropInciso)
            cmd.Parameters.AddWithValue("@Tipo_Cliente", dropcliente)
            ' cmd.Parameters.AddWithValue("@Anio", dropanio)
            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())

                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo Alambrico"
    <WebMethod()> _
    Public Shared Function ObtenerAlambrico(ByVal dropInciso As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT sum(UsuariosAccesoFijoAlambrico)  as Text FROM " & _
                    "view_TB_RegistroUsuariosInternetFijoAlambricoInternet inner join view_Registros on " & _
                    "view_Registros.IDRegistro = view_TB_RegistroUsuariosInternetFijoAlambricoInternet.IdRegistro " & _
                    "WHERE VelocidadAcceso Not LIKE  '256 Kbps' and VelocidadAcceso Not LIKE  '512 Kbps' and VelocidadAcceso " & _
                    "Not LIKE  '128 Kbps' and view_Registros.CodigoOperador= @CodigoOperador and view_Registros.CodigoServicio='SVA-ARI' " & _
                    "and view_Registros.Periodo=4  and view_Registros.Anio=@Anio"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@CodigoOperador", dropInciso)

            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo Alambrico Año Anterior"
    <WebMethod()> _
    Public Shared Function ObtenerAlambricoAnterior(ByVal dropInciso As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT sum(UsuariosAccesoFijoAlambrico)  as Text FROM " & _
                    "view_TB_RegistroUsuariosInternetFijoAlambricoInternet inner join view_Registros on " & _
                    "view_Registros.IDRegistro = view_TB_RegistroUsuariosInternetFijoAlambricoInternet.IdRegistro " & _
                    "WHERE VelocidadAcceso Not LIKE  '256 Kbps' and VelocidadAcceso Not LIKE  '512 Kbps' and VelocidadAcceso " & _
                    "Not LIKE  '128 Kbps' and view_Registros.CodigoOperador= @CodigoOperador and view_Registros.CodigoServicio='SVA-ARI' " & _
                    "and view_Registros.Periodo=4  and view_Registros.Anio=(@Anio-1)"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@CodigoOperador", dropInciso)

            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region
   
#Region "calculo Inalambrico"
    <WebMethod()> _
    Public Shared Function ObtenerInalambrico(ByVal dropInciso As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT sum(UsuariosAccesoFijoInalambrico)  as Text FROM " & _
                    "view_TB_RegistroUsuariosInternetFijoInalambricoInternet inner join view_Registros on " & _
                    "view_Registros.IDRegistro = view_TB_RegistroUsuariosInternetFijoInalambricoInternet.IdRegistro " & _
                    "WHERE VelocidadAcceso Not LIKE  '256 Kbps' and VelocidadAcceso Not LIKE  '512 Kbps' " & _
                    "and VelocidadAcceso Not LIKE  '128 Kbps' and view_Registros.CodigoOperador= @CodigoOperador " & _
                    " and view_Registros.CodigoServicio='SVA-ARI' and view_Registros.Periodo=4  and view_Registros.Anio= @Anio"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@CodigoOperador", dropInciso)

            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo Inalambrico Año Anterior"
    <WebMethod()> _
    Public Shared Function ObtenerInalambricoAnterior(ByVal dropInciso As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT sum(UsuariosAccesoFijoInalambrico)  as Text FROM " & _
                    "view_TB_RegistroUsuariosInternetFijoInalambricoInternet inner join view_Registros on " & _
                    "view_Registros.IDRegistro = view_TB_RegistroUsuariosInternetFijoInalambricoInternet.IdRegistro " & _
                    "WHERE VelocidadAcceso Not LIKE  '256 Kbps' and VelocidadAcceso Not LIKE  '512 Kbps' " & _
                    "and VelocidadAcceso Not LIKE  '128 Kbps' and view_Registros.CodigoOperador= @CodigoOperador " & _
                    "and view_Registros.CodigoServicio='SVA-ARI' and view_Registros.Periodo=4  and view_Registros.Anio= (@Anio - 1)"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@CodigoOperador", dropInciso)

            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo Movil"
    <WebMethod()> _
    Public Shared Function ObtenerMovil(ByVal dropInciso As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT  sum(UsuariosAccesoFIjoAlambrico) as Text FROM " & _
                    "view_TB_RegistroUsuariosInternetMovilInternet inner join view_Registros on " & _
                    "view_Registros.IDRegistro = view_TB_RegistroUsuariosInternetMovilInternet.IdRegistro " & _
                    "WHERE view_Registros.CodigoOperador= @CodigoOperador and view_Registros.Periodo=4  " & _
                    "and view_Registros.CodigoServicio='SVA-ARI' and view_Registros.Anio= @Anio "
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@CodigoOperador", dropInciso)

            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo Movil Año Anterior"
    <WebMethod()> _
    Public Shared Function ObtenerMovilAnterior(ByVal dropInciso As String, ByVal dropanio As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT  sum(UsuariosAccesoFIjoAlambrico) as Text FROM " & _
                    "view_TB_RegistroUsuariosInternetMovilInternet inner join view_Registros on " & _
                    "view_Registros.IDRegistro = view_TB_RegistroUsuariosInternetMovilInternet.IdRegistro " & _
                    "WHERE view_Registros.CodigoOperador= @CodigoOperador and view_Registros.Periodo=4  " & _
                    "and view_Registros.CodigoServicio='SVA-ARI' and view_Registros.Anio= (@Anio-1)"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@CodigoOperador", dropInciso)

            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo Mora Anterior"
    <WebMethod()> _
    Public Shared Function ObtenerMoraAnterior(ByVal dropInciso As String, ByVal dropanio As String, ByVal dropcliente As String) As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT MAX(Calculo_mora) AS Text FROM Control_clinte_calculo_mora WHERE Anio=(@Anio-1) AND " & _
                  "Cliente_reportado = @Cliente_reportado AND Codigo= @Codigo"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            cmd.Parameters.AddWithValue("@Anio", dropanio)
            cmd.Parameters.AddWithValue("@Codigo", dropInciso)
            cmd.Parameters.AddWithValue("@Cliente_reportado", dropcliente)
            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Text").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region
End Class