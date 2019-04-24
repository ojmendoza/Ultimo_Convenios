Imports System.Data.SqlClient
Imports System.Data
Imports System.Web.Services
Imports System.Configuration
Imports System.IO
Imports System.Text
Imports System.Security.Cryptography
Imports System.Web.Script.Serialization

Public Class Conexion
    'Private cadena As String = ConfigurationManager.ConnectionStrings("SICONAG_BDConnectionString").ConnectionString
    Public cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Public cn As SqlConnection
    Public Ds As New DataSet
    Public da As SqlDataAdapter

    Private cmsql As SqlCommandBuilder
    Dim dr As SqlDataReader
    Dim myconnection As SqlConnection
    Dim myCommand As SqlCommand

    Private Sub Conectar()
        cn = New SqlConnection(cadena)
    End Sub

    Public Sub New()
        Conectar()
    End Sub

    Protected Sub conectado()
        Try
            cn = New SqlConnection(cadena)
            cn.Open()

        Catch ex As Exception
            MsgBox(ex.Message)
        End Try
    End Sub

    Protected Sub desconectado()
        Try
            If cn.State = ConnectionState.Open Then
                cn.Close()

            End If
        Catch ex As Exception
            MsgBox(ex.Message)
        End Try
    End Sub

    'insertar'
    Public Function insertar(ByVal sql As String, parametros As SqlParameter()) As String
        Try
            Dim cmd As New SqlCommand(sql, cn)
            cmd.CommandType = CommandType.Text
            For i As Integer = 0 To parametros.Length - 1
                cmd.Parameters.Add(parametros(i))
            Next
            cn.Open()
            Dim resultado As Integer = cmd.ExecuteNonQuery()
            cn.Close()
            Return "True"
        Catch ex As SqlException
            Dim message As String = "Insertion Error In Query"
            message += ex.Message
            Return message
        Finally
            cn.Close()
        End Try
    End Function

    'Actualizar'
    Public Function Actualizar(ByVal tabla As String, ByVal campos As String, ByVal condicion As String) As Boolean
        cn.Open()
        Dim sql As String = "update " & tabla & " set " & campos & " where " & condicion
        myCommand = New SqlCommand(sql, cn)
        Dim x As Integer = myCommand.ExecuteNonQuery()

        cn.Close()
        If x > 0 Then
            Return True
        Else
            Return False
        End If
    End Function

    'Eliminar
    Public Function Eliminar(ByVal tabla As String, ByVal condicion As String) As Boolean
        cn.Close()
        cn.Open()
        Dim sql As String = "delete FROM " & tabla & "where" & condicion
        myCommand = New SqlCommand(sql, cn)
        Dim x As Integer = myCommand.ExecuteNonQuery()
        cn.Close()
        If x > 0 Then
            Return True
        Else
            Return False
        End If
    End Function

    'Consultas'
    Public Function ObtenerValoresDrop(ByVal queryDrop As String) As List(Of ListItem)
        Dim query As String = queryDrop
        Dim constr As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Using con As New SqlConnection(constr)
            Using cmd As New SqlCommand(query)
                Dim Drops As New List(Of ListItem)()
                cmd.CommandType = CommandType.Text
                cmd.Connection = con
                con.Open()
                Using sdr As SqlDataReader = cmd.ExecuteReader()
                    While sdr.Read()
                        Drops.Add(New ListItem() With {
                          .Value = sdr("Value").ToString(),
                          .Text = sdr("Text").ToString()
                        })
                    End While
                End Using
                con.Close()
                Return Drops
            End Using
        End Using
    End Function

    ' funcion para actener codigos o el ultimo va lor ingresado en un a table'
    Public Function ObtenerCodigo(ByVal tabla As String, ByVal campo As String) As Integer
        Try

            Dim resultado As Integer = 0
            cn.Open()
            myCommand = New SqlCommand("SELECT " & campo & " FROM " & tabla & " WHERE " & campo & " = (SELECT MAX(" & campo & ") from " & tabla & ");", cn)
            dr = myCommand.ExecuteReader
            While dr.Read
                resultado = CInt(dr(0).ToString)
            End While

            dr.Close()
            cn.Close()

            Return CInt(resultado)
        Catch ex As SqlException
            Dim message As String = "Error en la insersión de la consulta"
            message += ex.Message
            Return message
        Finally
            cn.Close()
        End Try

    End Function

End Class