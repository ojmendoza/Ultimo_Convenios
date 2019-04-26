
Partial Class Default2
    Inherits System.Web.UI.Page
    Dim result As String
    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        result = MsgBox("love and sex", MsgBoxStyle.OkCancel, "eres un puto")
        If result = vbOK Then
            MsgBox("tu te la comes toda")
            Response.Redirect("/Views/Registro_Contratos.aspxspx")
        Else
            Response.Redirect("Default.aspx")
        End If
    End Sub
End Class
