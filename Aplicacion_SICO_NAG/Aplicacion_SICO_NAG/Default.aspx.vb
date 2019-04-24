Imports System
Imports System.Collections.Generic
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web
Imports System.Linq
Imports System.Web.UI
Imports System.Web.UI.WebControls


Public Class formularioCentrosEducativos

    Inherits System.Web.UI.Page
    Private Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load


    End Sub


#Region "calculo de Mora Internet Fijo Alambrico"
    <WebMethod()>
    Public Shared Function ObtenerDatos() As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT Operador,  Calculo_mora FROM Control_clinte_calculo_mora " &
                  "WHERE Cliente_reportado = 'Internet Fijo Alambrico' and Id_Cont_cli_cal_mo IN (SELECT MAX(Id_Cont_cli_cal_mo) " &
                  "FROM Control_clinte_calculo_mora GROUP BY Operador, Cliente_reportado) order by Calculo_mora desc"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read

                    result.Add(dr.Item("Operador").ToString())
                    result.Add(dr.Item("Calculo_mora").ToString())

                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo de Mora Internet Fijo Inalambrico"
    <WebMethod()>
    Public Shared Function ObtenerDatos1() As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT Operador,  Calculo_mora FROM Control_clinte_calculo_mora " &
                  "WHERE Cliente_reportado = 'Internet Fijo Inalambrico' and Id_Cont_cli_cal_mo IN (SELECT MAX(Id_Cont_cli_cal_mo) " &
                  "FROM Control_clinte_calculo_mora GROUP BY Operador, Cliente_reportado) order by Calculo_mora desc"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Operador").ToString())
                    result.Add(dr("Calculo_mora").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region

#Region "calculo de Mora Internet Movil"
    <WebMethod()>
    Public Shared Function ObtenerDatos2() As List(Of String)
        Dim result As List(Of String) = New List(Of String)()
        Dim sql = "SELECT Operador,  Calculo_mora FROM Control_clinte_calculo_mora " &
                  "WHERE Cliente_reportado = 'Internet Movil' and Id_Cont_cli_cal_mo IN (SELECT MAX(Id_Cont_cli_cal_mo) " &
                  "FROM Control_clinte_calculo_mora GROUP BY Operador, Cliente_reportado) order by Calculo_mora desc"
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using dr As SqlDataReader = cmd.ExecuteReader()
                While dr.Read
                    result.Add(dr("Operador").ToString())
                    result.Add(dr("Calculo_mora").ToString())
                End While
            End Using
        End Using

        Return result

    End Function
#End Region


End Class