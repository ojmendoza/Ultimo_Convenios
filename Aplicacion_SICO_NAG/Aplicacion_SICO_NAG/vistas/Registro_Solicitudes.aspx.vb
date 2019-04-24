
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
'Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Public Class WebForm1
    Inherits System.Web.UI.Page
    Public Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
    Shared myconnection As SqlConnection
    Shared mycommand As SqlCommand
    Dim dr As SqlDataAdapter
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

#Region "guardar instituciones"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Agregarinstitucion(datos As PropiedadesInstituciones) As String
        Dim query As New Conexion
        Dim insertString As String

        Try
            insertString = "INSERT INTO INSTITUCIONES(cod_sace,nom_inst,tip_inst,email_inst,cod_dept,cod_muni,direc_inst,latitud_inst,longitud_inst,esta_inst) 
                            VALUES (@cod_sace,@nom_inst,@tip_inst,@email_inst,@cod_dept,@cod_muni,@direc_inst,@latitud_inst,@longitud_inst,@esta_inst);"
            Dim param As SqlParameter() = New SqlParameter(9) {}
            param(0) = New SqlParameter("@cod_sace", datos.Cod_sace)
            param(1) = New SqlParameter("@nom_inst", datos.Nom_inst)
            param(2) = New SqlParameter("@tip_inst", datos.Tip_inst)
            param(3) = New SqlParameter("@email_inst", datos.Email_inst)
            param(4) = New SqlParameter("@cod_dept", datos.Cod_dept)
            param(5) = New SqlParameter("@cod_muni", datos.Cod_muni)
            param(6) = New SqlParameter("@direc_inst", datos.Direc_inst)
            param(7) = New SqlParameter("@latitud_inst", datos.latitud_inst)
            param(8) = New SqlParameter("@longitud_inst", datos.longitud_inst)
            param(9) = New SqlParameter("@esta_inst", "Activo")

            Return query.insertar(insertString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function

#End Region

#Region "guardar  encargados_uno "
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Agregarencargados_uno(datos_uno As PropiedadesEncargado) As String
        Dim query As New Conexion
        Dim insertString As String
        Dim var As VARIABLES = New VARIABLES()
        var.cod_inst_1 = CInt(query.ObtenerCodigo("INSTITUCIONES", "cod_inst"))
        Try

            insertString = "INSERT INTO ENCARGADO(cod_inst,nom_encar,ocupacion_encar,tel_movil_encar,tel_fijo_encar,email_encar,
                            nom_encar_dos,ocupacion_encar_dos,tel_movil_encar_dos,tel_fijo_encar_dos,email_encar_dos)
                                   VALUES(@cod_inst,@nom_encar,@ocupacion,@tel_movil,@tel_fijo,@email,
                                     @nom_encar_dos,@ocupacion_dos,@tel_movil_dos,@tel_fijo_dos,@email_dos);"
            Dim param As SqlParameter() = New SqlParameter(10) {}
            param(0) = New SqlParameter("@cod_inst", var.cod_inst_1)
            param(1) = New SqlParameter("@nom_encar", datos_uno.Nom_encar)
            param(2) = New SqlParameter("@ocupacion", datos_uno.Ocupacion_encar)
            param(3) = New SqlParameter("@tel_movil", datos_uno.Tel_movil_encar)
            param(4) = New SqlParameter("@tel_fijo", datos_uno.Tel_fijo_encar)
            param(5) = New SqlParameter("@email", datos_uno.Email_encar)
            param(6) = New SqlParameter("@nom_encar_dos", datos_uno.Nom_encar_dos)
            param(7) = New SqlParameter("@ocupacion_dos", datos_uno.Ocupacion_encar_dos)
            param(8) = New SqlParameter("@tel_movil_dos", datos_uno.Tel_movil_encar_dos)
            param(9) = New SqlParameter("@tel_fijo_dos", datos_uno.Tel_fijo_encar_dos)
            param(10) = New SqlParameter("@email_dos", datos_uno.Email_encar_dos)

            Return query.insertar(insertString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function
#End Region

#Region "guardar datos contacto inmediato"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Agregar_contacto(datos_CONT As PropiedadesContacto_IN) As String
        Dim query As New Conexion
        Dim insertString As String
        Dim var As VARIABLES = New VARIABLES()
        var.cod_inst_3 = CInt(query.ObtenerCodigo("INSTITUCIONES", "cod_inst"))
        Try
            insertString = "INSERT INTO CONTACTO_INMEDIATO(cod_inst,nom_cont,tel_movil_cont,tel_fijo_cont,ocu_cont)
                                                            VALUES(@cod_inst,@nom_cont,@tel_movil_cont,@tel_fijo_cont,@ocu_cont);"
            Dim param As SqlParameter() = New SqlParameter(4) {}
            param(0) = New SqlParameter("@cod_inst", var.cod_inst_3)
            param(1) = New SqlParameter("@nom_cont", datos_CONT.nom_cont)
            param(2) = New SqlParameter("@tel_movil_cont", datos_CONT.tel_movil_cont)
            param(3) = New SqlParameter("@tel_fijo_cont", datos_CONT.tel_fijo_cont)
            param(4) = New SqlParameter("@ocu_cont", datos_CONT.ocu_cont)
            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "guardar datos solicitud"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Agregar_Solicitud(datos_SOLI As PropiedadesSolicitud) As String
        Dim query As New Conexion
        Dim insertString As String
        Dim var As VARIABLES = New VARIABLES()
        var.cod_cont = CInt(query.ObtenerCodigo("CONTACTO_INMEDIATO", "cod_cont"))
        Try
            insertString = "INSERT INTO SOLICITUD(cod_cont,fin_solic,est_solic,fech_recib,solic_escaneada)
                                                            VALUES(@cod_cont,@fin_solic,@est_solic,@fech_recib,@solic_escaneada);"
            Dim param As SqlParameter() = New SqlParameter(4) {}
            param(0) = New SqlParameter("@cod_cont", var.cod_cont)
            param(1) = New SqlParameter("@fin_solic", datos_SOLI.fin_solic)
            param(2) = New SqlParameter("@est_solic", datos_SOLI.est_solic)
            param(3) = New SqlParameter("@fech_recib", CStr(datos_SOLI.fech_recib))
            param(4) = New SqlParameter("@solic_escaneada", CStr("<img src='" & datos_SOLI.soli_escan & "' />"))
            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "guardar datos la boratorio"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Agregar_Laboratorio(datos_lab As PropiedadesLab_Computo) As String
        Dim query As New Conexion
        Dim insertString As String
        Dim VAR As VARIABLES = New VARIABLES()
        VAR.cod_inst_3 = CInt(query.ObtenerCodigo("INSTITUCIONES", "cod_inst"))
        Try
            insertString = "INSERT INTO LABORATORIO_COMPUTO(cod_inst,energia_electrica,red_lab,tipo_red,cant_lab,num_pc_buenas,num_pc_malas,docente_inf)
                                                            VALUES(@cod_inst,@energia_electrica,@red_lab,@tipo_red,@cant_lab,@num_pc_buenas,@num_pc_malas,@docente_inf);"
            Dim param As SqlParameter() = New SqlParameter(7) {}
            param(0) = New SqlParameter("@cod_inst", VAR.cod_inst_3)
            param(1) = New SqlParameter("@energia_electrica", datos_lab.energia_electrica)
            param(2) = New SqlParameter("@red_lab", datos_lab.red_lab)
            param(3) = New SqlParameter("@tipo_red", datos_lab.tipo_re)
            param(4) = New SqlParameter("@cant_lab", datos_lab.cant_lab)
            param(5) = New SqlParameter("@num_pc_buenas", datos_lab.num_pc_buenas)
            param(6) = New SqlParameter("@num_pc_malas", datos_lab.num_pc_malas)
            param(7) = New SqlParameter("@docente_inf", datos_lab.docente_inf)
            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Obtener departament"
    'Drop para departamento
    <WebMethod(EnableSession:=True)>
    Public Shared Function ObtenerDepartamentos() As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        consulta = "SELECT IDDept As Value, Nombre  As Text FROM view_Departamentos"

        Try
            Return query.ObtenerValoresDrop(consulta)
        Catch ex As Exception
            Dim errorBD As New List(Of ListItem)()
            errorBD.Add(New ListItem() With {
                           .Value = 1,
                           .Text = ex.Message.ToString()
                           })
            Return errorBD
        End Try
    End Function

#End Region

#Region "Obtener municipio"
    'Drop para municipio
    <WebMethod(EnableSession:=True)>
    Public Shared Function ObtenerMunicipios(ByVal codigo As Integer) As List(Of ListItem)
        Dim query As New Conexion
        Dim consulta As String = ""
        'consulta = "SELECT [IDMunicipio] as Value ,[Nombre]	as Text FROM [view_Municipios] where  [IDDept] ='" & codigo & "';"

        consulta = "SELECT view_Municipios.IDMunicipio As Value, view_Municipios.Nombre As  Text 
                          FROM view_Departamentos " &
            "INNER JOIN view_Municipios ON view_Departamentos.IDDept= view_Municipios.IDDept 
            WHERE (view_Departamentos.IDDept='" & codigo & "')"


        Try

            Return query.ObtenerValoresDrop(consulta)
        Catch ex As Exception
            Dim errorBD As New List(Of ListItem)()
            errorBD.Add(New ListItem() With {
                           .Value = 1,
                           .Text = ex.Message.ToString()
                           })
            Return errorBD
        End Try
    End Function

#End Region

#Region "agregar datos ala tabla"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function agregar_tabla() As Propiedadestabla()
        'Dim cadenaConexion As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT [cod_inst],[cod_sace],[nom_inst],[tip_inst],[email_inst],[view_Departamentos].[Nombre] as Departamento,
       [view_Municipios].[Nombre] as Municipio,[latitud_inst],[longitud_inst],[esta_inst]
      ,[direc_inst],[nom_cont],[tel_movil_cont],[tel_fijo_cont],[ocu_cont],[nom_encar],[ocupacion_encar],[tel_movil_encar]
      ,[tel_fijo_encar],[email_encar],[nom_encar_dos],[ocupacion_encar_dos],[tel_movil_encar_dos],[tel_fijo_encar_dos]
      ,[email_encar_dos],[fin_solic],[est_solic],[fech_recib],[energia_electrica],[red_lab],[tipo_red],[cant_lab],[num_pc_buenas]
      ,[num_pc_malas],[docente_inf],[cod_cont],[cod_encar],[cod_lab],[cod_solic]
       FROM [View_Solicitud] inner join view_Departamentos on View_Solicitud.cod_dept= view_Departamentos.IDDept inner join view_Municipios 
        on View_Solicitud.cod_muni = view_Municipios.IDMunicipio where view_Departamentos.IDDept = view_Municipios.IDDept"
        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    fila.Id = rdr.Item("cod_inst").ToString()
                    fila.Id_cont = rdr.Item("cod_cont").ToString()
                    fila.Id_encar = rdr.Item("cod_encar").ToString()
                    fila.Id_lab = rdr.Item("cod_lab").ToString()
                    fila.Id_soli = rdr.Item("cod_solic").ToString()
                    fila.Código_SACE = rdr.Item("cod_sace").ToString()
                    fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Tipo_Institución = rdr.Item("tip_inst").ToString()
                    fila.Correo_Electrónico = rdr.Item("email_inst").ToString()
                    fila.Departamento = rdr.Item("Departamento").ToString()
                    fila.Municipio = rdr.Item("Municipio").ToString()
                    fila.Dirección_Exacta = rdr.Item("direc_inst").ToString()
                    fila.Latitud = rdr.Item("latitud_inst").ToString()
                    fila.Longitud = rdr.Item("longitud_inst").ToString()
                    fila.Estado = rdr.Item("esta_inst").ToString()
                    fila.Nombre_Contacto = rdr.Item("nom_cont").ToString()
                    fila.Ocupación_Contacto = rdr.Item("ocu_cont").ToString()
                    fila.Tel_fijo = rdr.Item("tel_fijo_cont").ToString()
                    fila.Tel_Móvil = rdr.Item("tel_movil_cont").ToString()
                    fila.Finalidad_Solicitud = rdr.Item("fin_solic").ToString()
                    fila.Estado_Solicitud = rdr.Item("est_solic").ToString()
                    fila.Nombre_Encargado_1 = rdr.Item("nom_encar").ToString()
                    fila.Correo_Electrónico_1 = rdr.Item("email_encar").ToString()
                    fila.ocupacion_1 = rdr.Item("ocupacion_encar").ToString()
                    fila.Tel_fijo_1 = rdr.Item("tel_fijo_encar").ToString()
                    fila.tel_Móvil_1 = rdr.Item("tel_movil_encar").ToString()
                    fila.Nombre_Encargado_2 = rdr.Item("nom_encar_dos").ToString()
                    fila.Correo_Electrónico_2 = rdr.Item("email_encar_dos").ToString()
                    fila.ocupacion_2 = rdr.Item("ocupacion_encar_dos").ToString()
                    fila.Tel_fijo_2 = rdr.Item("tel_fijo_encar_dos").ToString()
                    fila.Tel_Móvil_2 = rdr.Item("tel_movil_encar_dos").ToString()
                    fila.Energía_Eléctrica = rdr.Item("energia_electrica").ToString()
                    fila.Red_Interna = rdr.Item("red_lab").ToString()
                    fila.Cant_Laboratorios = rdr.Item("cant_lab").ToString()
                    fila.Pc_Buenas = rdr.Item("num_pc_buenas").ToString()
                    fila.Pc_Malas = rdr.Item("num_pc_malas").ToString()
                    fila.Tipo_Red = rdr.Item("tipo_red").ToString()
                    fila.Docente = rdr.Item("docente_inf").ToString()

                    filas.Add(fila)
                End While
            End Using
            con.Close()

        End Using
        Return filas.ToArray()
    End Function

#End Region

#Region "Actualizar instituciones"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Actualizarinstitucion(datos As PropiedadesInstituciones) As String
        Dim query As New Conexion
        'Dim res As Integer = 0
        Dim updateString As String

            Try


            updateString = "UPDATE INSTITUCIONES SET cod_sace=@cod_sace,nom_inst=@nom_inst,tip_inst=@tip_inst,email_inst=@email_inst,
                              cod_dept=@cod_dept,cod_muni=@cod_muni,direc_inst=@direc_inst,latitud_inst=@latitud_inst,longitud_inst=@longitud_inst
                               where cod_inst=@cod_inst ;"
            'Dim comando As SqlCommand = New SqlCommand(updateString, query)
            Dim param As SqlParameter() = New SqlParameter(9) {}
            param(0) = New SqlParameter("@cod_inst", datos.Cod_inst)
            param(1) = New SqlParameter("@cod_sace", datos.Cod_sace)
            param(2) = New SqlParameter("@nom_inst", datos.Nom_inst)
            param(3) = New SqlParameter("@tip_inst", datos.Tip_inst)
            param(4) = New SqlParameter("@email_inst", datos.Email_inst)
            param(5) = New SqlParameter("@cod_dept", datos.Cod_dept)
            param(6) = New SqlParameter("@cod_muni", datos.Cod_muni)
            param(7) = New SqlParameter("@direc_inst", datos.Direc_inst)
            param(8) = New SqlParameter("@latitud_inst", datos.latitud_inst)
            param(9) = New SqlParameter("@longitud_inst", datos.longitud_inst)

            Return query.insertar(updateString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function

#End Region

#Region "Actualizar contactos inmediato"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Act_Contacto_Inme(datos_cont As PropiedadesContacto_IN) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = "UPDATE CONTACTO_INMEDIATO set nom_cont=@nom_cont,tel_movil_cont=@tel_movil,
                            tel_fijo_cont=@tel_fijo,ocu_cont=@ocupacion
                             where cod_cont=@cod_cont;"

            Dim param As SqlParameter() = New SqlParameter(4) {}
            param(0) = New SqlParameter("@cod_cont", datos_cont.cod_cont)
            param(1) = New SqlParameter("@nom_cont", datos_cont.nom_cont)
            param(2) = New SqlParameter("@ocupacion", datos_cont.ocu_cont)
            param(3) = New SqlParameter("@tel_fijo", datos_cont.tel_fijo_cont)
            param(4) = New SqlParameter("@tel_movil", datos_cont.tel_movil_cont)

            Return query.insertar(UpdateString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function

#End Region

#Region "actualizar  encargados "
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Actualizar_encargados(datos_encar As PropiedadesEncargado) As String
        Dim query As New Conexion
        Dim UpdateString As String

        Try

            UpdateString = "UPDATE ENCARGADO SET nom_encar=@nom_encar,ocupacion_encar=@ocupacion,
                            tel_movil_encar=@tel_movil,tel_fijo_encar=@tel_fijo,email_encar=@email,
                            nom_encar_dos=@nom_encar_dos,ocupacion_encar_dos=@ocupacion_dos,tel_movil_encar_dos=@tel_movil_dos,
                            tel_fijo_encar_dos=@tel_fijo_dos,email_encar_dos=@email_dos where
                             cod_encar=@cod_encar"

            Dim param As SqlParameter() = New SqlParameter(10) {}
            param(0) = New SqlParameter("@cod_encar", datos_encar.Cod_encar)
            param(1) = New SqlParameter("@nom_encar", datos_encar.Nom_encar)
            param(2) = New SqlParameter("@ocupacion", datos_encar.Ocupacion_encar)
            param(3) = New SqlParameter("@tel_movil", datos_encar.Tel_movil_encar)
            param(4) = New SqlParameter("@tel_fijo", datos_encar.Tel_fijo_encar)
            param(5) = New SqlParameter("@email", datos_encar.Email_encar)
            param(6) = New SqlParameter("@nom_encar_dos", datos_encar.Nom_encar_dos)
            param(7) = New SqlParameter("@ocupacion_dos", datos_encar.Ocupacion_encar_dos)
            param(8) = New SqlParameter("@tel_movil_dos", datos_encar.Tel_movil_encar_dos)
            param(9) = New SqlParameter("@tel_fijo_dos", datos_encar.Tel_fijo_encar_dos)
            param(10) = New SqlParameter("@email_dos", datos_encar.Email_encar_dos)

            Return query.insertar(UpdateString, param)

        Catch ex As Exception
            Return ex.Message

        End Try
    End Function
#End Region

#Region "actualizar datos solicitud"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Actualizar_Solicitud(datos_soli As PropiedadesSolicitud) As String
        Dim query As New Conexion
        Dim updateString As String

        Try
            updateString = "UPDATE SOLICITUD set fin_solic=@fin_solic,est_solic=@est_solic
                            where cod_solic=@cod_solic;"
            Dim param As SqlParameter() = New SqlParameter(3) {}
            param(0) = New SqlParameter("@cod_solic", datos_soli.Cod_solic)
            param(1) = New SqlParameter("@fin_solic", datos_soli.fin_solic)
            'param(2) = New SqlParameter("@est_solic", CStr("<img src='" & datos_soli.est_solic) & "' />")
            'param(3) = New SqlParameter("@solic_escaneada", CStr(datos_soli.soli_escan))
            Return query.insertar(updateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "actualizar datos laboratorio"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Actualizar_Laboratorio(datos_lab As PropiedadesLab_Computo) As String
        Dim query As New Conexion
        Dim updateString As String
        Try
            updateString = "UPDATE LABORATORIO_COMPUTO set energia_electrica=@energia_electrica,red_lab=@red_lab,tipo_red=@tipo_red,
                            cant_lab=@cant_lab,num_pc_buenas=@num_pc_buenas,num_pc_malas=@num_pc_malas,docente_inf=@docente_inf
                            where cod_lab=@cod_lab;"
            Dim param As SqlParameter() = New SqlParameter(7) {}
            param(0) = New SqlParameter("@cod_lab", datos_lab.cod_lab)
            param(1) = New SqlParameter("@energia_electrica", datos_lab.energia_electrica)
            param(2) = New SqlParameter("@red_lab", datos_lab.red_lab)
            param(3) = New SqlParameter("@tipo_red", datos_lab.tipo_re)
            param(4) = New SqlParameter("@cant_lab", datos_lab.cant_lab)
            param(5) = New SqlParameter("@num_pc_buenas", datos_lab.num_pc_buenas)
            param(6) = New SqlParameter("@num_pc_malas", datos_lab.num_pc_malas)
            param(7) = New SqlParameter("@docente_inf", datos_lab.docente_inf)
            Return query.insertar(updateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Mostrar Datos a Modificar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ModificarDatos(ByVal cod_inst As String) As Propiedadestabla()
        'Dim cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString
        Dim sql = "SELECT [cod_inst],[cod_sace],[nom_inst],[tip_inst],[email_inst],view_Departamentos.IDDept AS Value,view_Departamentos.Nombre as Departamento,
        view_Municipios.IDMunicipio as Value1, view_Municipios.Nombre as Municipio,[latitud_inst],[longitud_inst]
      ,[direc_inst],[nom_cont],[tel_movil_cont],[tel_fijo_cont],[ocu_cont],[nom_encar],[ocupacion_encar],[tel_movil_encar]
      ,[tel_fijo_encar],[email_encar],[nom_encar_dos],[ocupacion_encar_dos],[tel_movil_encar_dos],[tel_fijo_encar_dos]
      ,[email_encar_dos],[fin_solic],[est_solic],[fech_recib],[energia_electrica],[red_lab],[tipo_red],[cant_lab],[num_pc_buenas]
      ,[num_pc_malas],[docente_inf],[cod_cont],[cod_encar],[cod_lab],[cod_solic]
       FROM [View_Solicitud] inner join view_Departamentos on View_Solicitud.cod_dept= view_Departamentos.IDDept inner join view_Municipios 
        on View_Solicitud.cod_muni = view_Municipios.IDMunicipio where view_Departamentos.IDDept = view_Municipios.IDDept and View_Solicitud.cod_inst='" & cod_inst & "'"

        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    fila.Id = rdr.Item("cod_inst").ToString()
                    fila.Id_cont = rdr.Item("cod_cont").ToString()
                    fila.Id_encar = rdr.Item("cod_encar").ToString()
                    fila.Id_lab = rdr.Item("cod_lab").ToString()
                    fila.Id_soli = rdr.Item("cod_solic").ToString()
                    fila.Código_SACE = rdr.Item("cod_sace").ToString()
                    fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Tipo_Institución = rdr.Item("tip_inst").ToString()
                    fila.Correo_Electrónico = rdr.Item("email_inst").ToString()
                    fila.CodDEP = rdr.Item("Value").ToString()
                    fila.Departamento = rdr.Item("Departamento").ToString()
                    fila.CodMuni = rdr.Item("Value1").ToString()
                    fila.Municipio = rdr.Item("Municipio").ToString()
                    fila.Dirección_Exacta = rdr.Item("direc_inst").ToString()
                    fila.Latitud = rdr.Item("latitud_inst").ToString()
                    fila.Longitud = rdr.Item("longitud_inst").ToString()
                    fila.Nombre_Contacto = rdr.Item("nom_cont").ToString()
                    fila.Ocupación_Contacto = rdr.Item("ocu_cont").ToString()
                    fila.Tel_fijo = rdr.Item("tel_fijo_cont").ToString()
                    fila.Tel_Móvil = rdr.Item("tel_movil_cont").ToString()
                    fila.Finalidad_Solicitud = rdr.Item("fin_solic").ToString()
                    fila.Estado_Solicitud = rdr.Item("est_solic").ToString()
                    fila.Nombre_Encargado_1 = rdr.Item("nom_encar").ToString()
                    fila.Correo_Electrónico_1 = rdr.Item("email_encar").ToString()
                    fila.ocupacion_1 = rdr.Item("ocupacion_encar").ToString()
                    fila.Tel_fijo_1 = rdr.Item("tel_fijo_encar").ToString()
                    fila.tel_Móvil_1 = rdr.Item("tel_movil_encar").ToString()
                    fila.Nombre_Encargado_2 = rdr.Item("nom_encar_dos").ToString()
                    fila.Correo_Electrónico_2 = rdr.Item("email_encar_dos").ToString()
                    fila.ocupacion_2 = rdr.Item("ocupacion_encar_dos").ToString()
                    fila.Tel_fijo_2 = rdr.Item("tel_fijo_encar_dos").ToString()
                    fila.Tel_Móvil_2 = rdr.Item("tel_movil_encar_dos").ToString()
                    fila.Energía_Eléctrica = rdr.Item("energia_electrica").ToString()
                    fila.Red_Interna = rdr.Item("red_lab").ToString()
                    fila.Cant_Laboratorios = rdr.Item("cant_lab").ToString()
                    fila.Pc_Buenas = rdr.Item("num_pc_buenas").ToString()
                    fila.Pc_Malas = rdr.Item("num_pc_malas").ToString()
                    fila.Tipo_Red = rdr.Item("tipo_red").ToString()
                    fila.Docente = rdr.Item("docente_inf").ToString()

                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Update Estado_Activo "
    <WebMethod()>
    Public Shared Function ActivarEstado(cod_inst As Propiedadestabla) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = " UPDATE INSTITUCIONES " &
                           " SET esta_inst = 'Activo'  " &
                           " WHERE cod_inst = @Id  "
            Dim param As SqlParameter() = New SqlParameter(0) {}
            param(0) = New SqlParameter("@Id", cod_inst.Id)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "Update Estado_Inactivo "
    <WebMethod()>
    Public Shared Function DesactivarEstado(cod_inst As Propiedadestabla) As String
        Dim query As New Conexion
        Dim UpdateString As String
        Try
            UpdateString = " UPDATE INSTITUCIONES " &
                           " SET esta_inst = 'Inactivo' " &
                           " WHERE cod_inst = @Id  "
            Dim param As SqlParameter() = New SqlParameter(0) {}
            param(0) = New SqlParameter("@Id", cod_inst.Id)
            Return query.insertar(UpdateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region " Obtener Datos imagenes de las solicitudes en la Modal"
    <WebMethod()>
    Public Shared Function modal_fotos(ByVal nombre As String) As Propiedadestabla()
        Dim query As New Conexion

        Dim sql = "select [solic_escaneada] FROM [BD_SICONAG].[dbo].[View_Solicitud]  where nom_inst like '%" & nombre & "%'"
        Dim filas As List(Of Propiedadestabla) = New List(Of Propiedadestabla)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New Propiedadestabla()
                    'fila.Nombre_Institución = rdr.Item("nom_inst").ToString()
                    fila.Solic_escan = CStr(rdr.Item("solic_escaneada").ToString())
                    'fila.Solic_escan = query.Base64ToImage(rdr.Item("solic_escaneada"))
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

End Class
