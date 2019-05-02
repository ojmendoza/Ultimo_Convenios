Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Imports Aplicacion_SICO_NAG
Partial Class Views_AsignacionContratos
    Inherits System.Web.UI.Page
    Public Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

    End Sub
#Region "select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function seleccionar() As PropiedadesContratoConvenio()
        Dim sql = "SELECT [cod_cenv_tra],[nombre_documento],[estado_documento],[fech_inicio] FROM [dbo].[CONVENIOS_CONTRATOS] where [tipo_documento]='Contrato'"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Esta_Doc = rdr.Item("estado_documento").ToString()
                    fila.Fech_inicio = rdr.Item("fech_inicio").ToString()


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
        Dim sql = "SELECT [registro_borrador] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & codigo & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Regis_borrador = CStr("<div class='embed-container'><iframe width='560' height='315' src='" & rdr.Item("registro_borrador").ToString() & "' frameborder='0' allowfullscreen></iframe></div> ")
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region
End Class
