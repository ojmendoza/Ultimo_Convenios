Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic

Public Class MapaSitios
    Inherits System.Web.UI.Page
    Private Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter
    Dim tabla As DataTable
    Dim tabla1 As DataTable
    Dim tabla2 As DataTable
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If IsPostBack = False Then

            cadena = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
            Dim cn As New SqlConnection(cadena)
            mycommand = New SqlCommand()

            mycommand.CommandText = "SELECT [cod_sace],[nom_inst],[Operador],[Ancho_Banda_Entregado],[latitud_inst],[longitud_inst] FROM [dbo].[INSTITUCIONES] INNER JOIN [dbo].[datos_conectividad]  on [dbo].[INSTITUCIONES].cod_inst = [dbo].[datos_conectividad].cod_inst 
            WHERE [cod_sace]<>'';"


            mycommand.CommandType = CommandType.Text
            mycommand.Connection = cn
            cn.Open()

            tabla = New DataTable()
            tabla.Load(mycommand.ExecuteReader())
            Repeater1.DataSource = tabla
            Repeater1.DataBind()
            cn.Close()
        End If

        If IsPostBack = False Then

            cadena = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
            Dim cn As New SqlConnection(cadena)
            mycommand = New SqlCommand()
            mycommand.CommandText = "SELECT [nom_inst],[Operador],[Ancho_Banda_Entregado],[latitud_inst],[longitud_inst] FROM [dbo].[INSTITUCIONES] INNER JOIN [dbo].[datos_conectividad]  on [dbo].[INSTITUCIONES].cod_inst = [dbo].[datos_conectividad].cod_inst 
            WHERE [cod_sace]='';"

            mycommand.CommandType = CommandType.Text
            mycommand.Connection = cn
            cn.Open()

            tabla1 = New DataTable()
            tabla1.Load(mycommand.ExecuteReader())
            Repeater2.DataSource = tabla1
            Repeater2.DataBind()
            cn.Close()
        End If

        If IsPostBack = False Then

            cadena = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
            Dim cn As New SqlConnection(cadena)
            mycommand = New SqlCommand()
            mycommand.CommandText = "Select COUNT([cod_sace]) as escuelas,(select COUNT([cod_inst]) from [dbo].[INSTITUCIONES] 
							 where [cod_sace] ='') as lugares from[dbo].[INSTITUCIONES] where cod_sace<>''"

            mycommand.CommandType = CommandType.Text
            mycommand.Connection = cn
            cn.Open()

            tabla2 = New DataTable()
            tabla2.Load(mycommand.ExecuteReader())
            Repeater3.DataSource = tabla2
            Repeater3.DataBind()
            cn.Close()

        End If


    End Sub

End Class