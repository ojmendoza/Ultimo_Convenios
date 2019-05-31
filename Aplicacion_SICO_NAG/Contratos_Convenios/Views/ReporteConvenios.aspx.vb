Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Imports Aplicacion_SICO_NAG
Partial Class Views_ReporteConvenios
    Inherits System.Web.UI.Page
    Public Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

    End Sub
#Region "select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function seleccionar() As PropiedadesContratoConvenio()
        Dim sql = "SELECT CONVENIOS_CONTRATOS.[cod_cenv_tra],[nombre_documento],[descrip],[btn],[estado],[fech_final],[fecha_firma] FROM CONVENIOS_CONTRATOS inner join BOTONES on (CONVENIOS_CONTRATOS.cod_cenv_tra = BOTONES.cod_cenv_tra)  where [tipo_documento]='Convenio';"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Descripcion = rdr.Item("descrip").ToString()
                    fila.Btn = rdr.Item("btn").ToString()
                    fila.Estado = rdr.Item("estado").ToString()
                    fila.Regis_firma = rdr.Item("fecha_firma").ToString()
                    fila.Fech_fin = rdr.Item("fech_final").ToString()


                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Visualizar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function Visualizar(ByVal codigo As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [registro_borrador] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & CInt(codigo) & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    Dim valor As String = rdr.Item("registro_borrador").ToString()
                    If valor = "" Or valor = "null" Then
                        fila.Regis_borrador = CStr("<a class='descargar btn disabled'  Title = 'descargar' >descargar</a>")
                    Else
                        fila.Regis_borrador = CStr("<a class='descargar btn'  Title = 'descargar' >descargar</a>")
                    End If
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "descargar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function descargar(ByVal codigo As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [registro_borrador] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & CInt(codigo) & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Regis_borrador = rdr.Item("registro_borrador").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Visualizar final"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function Ver_final(ByVal codigo As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [registro_inal] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & CInt(codigo) & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    Dim valor As String = rdr.Item("registro_inal").ToString()
                    If valor = "" Or valor = "null" Then
                        fila.Regis_final = "NO EXISTE REGISTRO"

                    Else
                        fila.Regis_final = CStr("<div class='embed-container'><iframe width='600' height='415' src='" & rdr.Item("registro_inal").ToString() & "' frameborder='0' allowfullscreen></iframe></div> ")

                    End If
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

End Class
