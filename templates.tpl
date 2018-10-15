<script type="text/html" id="add_modal">
    <div class="modal fade in" id="<%=id%>" data-itemId="<%=obj.itemId%>">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" data-dismiss="modal">&times;</button>
                    <h3 class="modal-title"><%=obj.title%></h3>
                </div>
                <div class="modal-body">
                    <div class="row" style="margin:0;">
                        <div class="col-md-12">
                            <input class="form-control input-sm" placeholder="Add Reason code" name="reason_code" value="<%=obj.value%>" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer clearfix">
                    <button class="btn btn-danger btn-sm pull-right" id="cancel" data-dismiss="modal">Cancel</button>
                    <% if(obj.mode === 'edit') { %>
                        <button class="btn btn-warning btn-sm pull-right" id="delete" style="margin-right: 5px;">Delete from DB</button>
                    <% } %>
                    <button class="btn btn-primary btn-sm pull-right" id="save" style="margin-right: 5px;">Save</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="add_item">
    <div class="item" data-id="<%=obj.id%>">
        <%=obj.disableEdit ? '' : '<i class="fa fa-pencil"></i>'%>&nbsp; <span class="value"><%=obj.text%></span>
    </div>
</script>