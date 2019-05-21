Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Imports Aplicacion_SICO_NAG

Partial Class Default2
    Inherits System.Web.UI.Page
    Public Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Private Sub Default2_Load(sender As Object, e As EventArgs) Handles Me.Load

    End Sub


#Region "select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function seleccionar() As PropiedadesContratoConvenio()
        Dim sql = "SELECT cod_cenv_tra, nombre_documento, tipo_documento, observacion From CONVENIOS_CONTRATOS  Where observacion !='NULL';"
        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()

                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Tip_Doc = rdr.Item("tipo_documento").ToString()
                    fila.Observacion = rdr.Item("observacion").ToString()
                    'fila.Est_Observacion = rdr.Item("estado_observacion").ToString()


                    filas.Add(fila)
                End While
            End Using
        End Using

        Return filas.ToArray()
    End Function
#End Region

#Region "Mostrar Datos a Modificar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function mandar_controles(ByVal Id As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT cod_cenv_tra, nombre_documento, observacion" &
            " FROM [dbo].[CONVENIOS_CONTRATOS]  where cod_cenv_tra = '" & Id & "'"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    'fila.Tip_Doc = rdr.Item("tipo_documento").ToString()
                    fila.Observacion = rdr.Item("observacion").ToString()
                    ' fila.Est_Observacion = rdr.Item("estado_observacion").ToString()

                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "guardar borrador modificado"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function modificar_borrador(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim insertString As String
        Try
            insertString = "begin tran " +
                " Update  CONVENIOS_CONTRATOS set registro_borrador=@registro_borrador,observacion=@observacion  where cod_cenv_tra=@id; " +
                " Update BOTONES set btn=@btn where cod_cenv_tra=@id;" +
                " commit tran"
            Dim param As SqlParameter() = New SqlParameter(3) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@registro_borrador", CStr(datos.Regis_borrador))
            param(2) = New SqlParameter("@observacion", "NULL")
            'param(3) = New SqlParameter("@etiqueta", datos.Datos)
            param(3) = New SqlParameter("@btn", datos.Btn)

            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

End Class
