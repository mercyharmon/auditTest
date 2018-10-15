/**
 * Created by shashank2104 on 10/14/18
 */

$(function () {

    var main_container = $('body div.main_container');

    main_container.find('button#add_reason_code').click(function () {
        $('body').append(_.template($('#add_modal').html())({id: "add_reason_code_modal", title: "Add Reason Code"}));

        $('body #add_reason_code_modal').modal().on('shown.bs.modal', function () {
            var inputEl = $(this).find('.modal-body input[name="reason_code"]');

            // focus the input
            inputEl.focus().select();

            $(this).find('.modal-footer button#save').unbind().click(function () {
                var reason_code = inputEl.val(), that = this;
                if(reason_code) {

                    $.ajax({
                        url: 'getNumRows.php',
                        type: 'GET',
                        success: function (num_rows) {
                            var id = +num_rows + 1;
                            // add to DB
                            changeDB('center1', 'part1', reason_code, id, 'insert');

                            main_container.find('#items_list')
                                .append(_.template($('#add_item').html())({id: id, text: reason_code}));
                            that.parents('div.modal').modal('hide');
                        }
                    });
                } else {

                }
            });
        }).on('hidden.bs.modal', function () {
            $(this).remove();
        });
    });

    // adding events on list items (buttons)
    main_container.on('click', 'div#items_list .item', function () {
        $('body').append(_.template($('#add_modal').html())({
            id: "edit_reason_code_modal",
            title: "Edit Reason Code",
            value: $(this).find('span.value').html(),
            itemId: $(this).attr('data-id'),
            mode: 'edit'
        }));

        $('body #edit_reason_code_modal').modal().on('shown.bs.modal', function () {
            $(this).find('.modal-footer button#save').unbind().click(function () {
                var reason_code = $(this).parents('div.modal').find('.modal-body input[name="reason_code"]').val(),
                     id = $(this).parents('div.modal').attr('data-itemId');
                if(reason_code) {

                    // edit DB
                    changeDB('center1', 'part1', reason_code, id, 'update');

                    main_container.find('#items_list').find('.item[data-id="'+id+'"]')
                        .replaceWith(_.template($('#add_item').html())({id: _.uniqueId(), text: reason_code}));
                    $(this).parents('div.modal').modal('hide');
                } else {

                }
            });

            // delete functionality
            $(this).find('.modal-footer button#delete').unbind().click(function () {
                var id = $(this).parents('div.modal').attr('data-itemId'),
                    el = main_container.find('#items_list').find('.item[data-id="'+ id +'"]');

                // call sql delete
                el.remove();
                $(this).parents('div.modal').modal('hide');

                // remove from DB
                changeDB('center1', 'part1', $(this).parents('div.modal').find('.modal-body input[name="reason_code"]').val(), id, 'remove');

            });
        }).on('hidden.bs.modal', function () {
            $(this).remove();
        });
    });


    function changeDB(workCenter, partNumber, reason, repairID, method) {
        $.ajax({
            url: 'index.php',
            type: 'POST',
            data: {data: {Workcenter: workCenter, PartNumber: partNumber, Reason: reason, RepairID: repairID}, method: method},
            success: function (resp) {
                console.log(resp);
            }
        });
    }
});