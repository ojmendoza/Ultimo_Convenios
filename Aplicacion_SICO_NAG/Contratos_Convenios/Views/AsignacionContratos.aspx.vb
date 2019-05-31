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
        Dim sql = "SELECT CONVENIOS_CONTRATOS.[cod_cenv_tra],[nombre_documento],[btn],[estado],[fech_inicio],[fech_final],[fecha_firma] FROM CONVENIOS_CONTRATOS inner join BOTONES on (CONVENIOS_CONTRATOS.cod_cenv_tra = BOTONES.cod_cenv_tra)  where [tipo_documento]='Contrato';"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
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

#Region "Notificacion"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function Notificacion() As PropiedadesContratoConvenio()
        Dim sql = "  begin tran " &
                 " declare @final as date; " &
                 " declare @hoy as date; " &
                 " declare @futuro as date; " &
                "  declare @FECH2 as varchar(100);   " &
                 "  declare @idarray table(id int, nombre_documento varchar(max)); " &
               "  declare @tabla2 table(fecha varchar(max), nombre_documento varchar(max)); " &
                  "  declare @count int;  " &
                  "  insert @idarray(id,nombre_documento) select cod_cenv_tra,nombre_documento FROM CONVENIOS_CONTRATOS where tipo_documento ='Contrato'; " &
                  "   set @count=(select COUNT(*) from @idarray); " &
                   "  while(@count > 0) " &
                    "  begin " &
                     "     declare @nombre varchar(max)=(select top(1) nombre_documento from @idarray order by id); " &
                       "   declare @id int =(select top(1) id from @idarray order by id); " &
                        "    set @FECH2 = (select fech_final FROM CONVENIOS_CONTRATOS WHERE cod_cenv_tra=@id and tipo_documento ='Contrato'); " &
                         "     set @final = CONVERT(date,@FECH2,103); " &
                         "     set @hoy = GETDATE(); " &
                          "    set @futuro = DATEADD(MM,6,CONVERT(date,@hoy,103)); " &
                          "    if(@final is not null ) " &
                           "   Begin " &
                           "      if(@final >= @hoy and @final<=@futuro) " &
                           "      begin " &
                          "        insert @tabla2(nombre_documento,fecha) select @nombre,@final;" &
                          "      end " &
                          "   end " &
                         "  delete @idarray where 	id=@id; " &
                         "  SET @count = (select COUNT(*) from @idarray); " &
                      "  end; " &
                    "   select nombre_documento,fecha from @tabla2 ; " &
               " commit tran"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Fech_fin = rdr.Item("fecha").ToString()
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
                    'CStr("<div class='embed-container'><iframe width='560' height='315' src='" & rdr.Item("registro_borrador").ToString() & "' frameborder='0' allowfullscreen></iframe></div> ")

                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "PRIORIDADES"
    <WebMethod()>
    Public Shared Function Actualizar_prioridad(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim updatestring As String

        Try
            updatestring = "begin tran " &
                  "declare @valor varchar(max); " &
                  "declare @document varchar(30); " &
                 " set @valor=(select btn from BOTONES where cod_cenv_tra=@id); " &
                 " set @document=(select estado_documento from CONVENIOS_CONTRATOS where cod_cenv_tra=@id);" &
                  "if (@valor=@valorC) and (@document='P1')" &
                 " begin" &
                 " update BOTONES set etiqueta=@etiqueta,btn=@btn,estado=@estado where cod_cenv_tra=@id;" &
                 " update CONVENIOS_CONTRATOS set estado_documento='P2' where cod_cenv_tra=@id; " &
                 " end" &
                " else " &
                 " begin " &
                "	update BOTONES set etiqueta=@etiqueta,btn=@btn,estado=@estado where cod_cenv_tra=@id;" &
                " update CONVENIOS_CONTRATOS set estado_documento='Doctos subidos' where cod_cenv_tra=@id; " &
                "  end " &
                "  commit tran"

            Dim param As SqlParameter() = New SqlParameter(4) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@valorC", datos.Esta_Doc)
            param(2) = New SqlParameter("@etiqueta", datos.Datos)
            param(3) = New SqlParameter("@btn", datos.Btn)
            param(4) = New SqlParameter("@estado", datos.Estado)
            Return query.insertar(updatestring, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "subir comentarios"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Modificar_borrador(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim insertString As String
        Try
            insertString = "begin tran" +
                " Update CONVENIOS_CONTRATOS set observacion=@oberva where cod_cenv_tra=@id; " +
                " Update BOTONES set btn=@btn where cod_cenv_tra=@id;" +
                " commit tran"


            Dim param As SqlParameter() = New SqlParameter(2) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@oberva", datos.Observacion)
            'param(2) = New SqlParameter("@etiqueta", datos.Datos)
            param(2) = New SqlParameter("@btn", datos.Btn)

            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

End Class
